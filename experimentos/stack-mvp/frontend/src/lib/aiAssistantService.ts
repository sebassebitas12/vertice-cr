import {
  CATALOG_PRODUCTS,
  type CatalogProduct,
  type MaterialCode,
} from '../data/catalog';

export interface StructuredAiResponse {
  recommendedMaterial: MaterialCode;
  recommendedEnvironment: string;
  categoryLabel: string;
  infillAndWalls: string;
  rationale: string;
  matchedProducts: {
    product: CatalogProduct;
    matchReason: string;
  }[];
  missingInfoQuestions: string[];
  source: 'n8n-webhook' | 'local-engine';
}

export async function analyzeRequirementWithAi(
  description: string
): Promise<StructuredAiResponse> {
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL as string | undefined;

  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.recommendedMaterial) {
          return {
            ...data,
            source: 'n8n-webhook',
          };
        }
      }
    } catch {
      // Si el webhook n8n no está activo, continuamos con el motor determinista local sin destruir el borrador
    }
  }

  // Simulación breve de red para feedback visual claro
  await new Promise((resolve) => setTimeout(resolve, 380));

  const text = description.toLowerCase();

  let recommendedMaterial: MaterialCode = 'PETG';
  let recommendedEnvironment = 'Interior / Taller';
  let categoryLabel = 'Soporte Mecánico / Taller';
  let infillAndWalls = '35% Gyroid · 4 perímetros (0.20 mm)';
  let rationale =
    'Para piezas funcionales con esfuerzo mecánico cotidiano, tracción o montaje con tornillos, PETG ofrece la mejor cohesión interlaminar sin fragilidad.';

  if (
    text.includes('sol') ||
    text.includes('exterior') ||
    text.includes('lluvia') ||
    text.includes('intemperie') ||
    text.includes('uv') ||
    text.includes('portón') ||
    text.includes('porton') ||
    text.includes('techo') ||
    text.includes('jardín')
  ) {
    recommendedMaterial = 'ASA';
    recommendedEnvironment = 'Exterior / Intemperie UV';
    categoryLabel = 'Exposición Solar UV & Intemperie';
    infillAndWalls = '40% Gyroid · 4 perímetros (Cámara cerrada)';
    rationale =
      'Detectamos uso al aire libre o radiación solar. El PLA se deforma al sol; ASA mantiene su estabilidad dimensional y resistencia mecánica frente a rayos UV y lluvia.';
  } else if (
    text.includes('flexible') ||
    text.includes('goma') ||
    text.includes('vibracion') ||
    text.includes('vibración') ||
    text.includes('tope') ||
    text.includes('sello') ||
    text.includes('empaque') ||
    text.includes('amortigua')
  ) {
    recommendedMaterial = 'TPU';
    recommendedEnvironment = 'Impacto / Vibración';
    categoryLabel = 'Amortiguación & Sello Elástico';
    infillAndWalls = '25% Infill elástico · 3 perímetros (TPU 95A)';
    rationale =
      'Para absorber vibraciones, sellar uniones o evitar rayaduras por impacto, el elastómero TPU 95A proporciona deformación controlada con memoria elástica.';
  } else if (
    text.includes('motor') ||
    text.includes('calor') ||
    text.includes('térmic') ||
    text.includes('termic') ||
    text.includes('auto') ||
    text.includes('carro') ||
    text.includes('vehículo')
  ) {
    recommendedMaterial = 'ABS';
    recommendedEnvironment = 'Alta temperatura / Motor';
    categoryLabel = 'Resistencia Térmica Estructural';
    infillAndWalls = '35% Gyroid · 4 perímetros';
    rationale =
      'En cabinas de vehículos o cerca de fuentes de calor y motores, ABS conserva su rigidez por encima de la temperatura donde el PLA colapsaría.';
  } else if (
    text.includes('escritorio') ||
    text.includes('oficina') ||
    text.includes('letrero') ||
    text.includes('placa') ||
    text.includes('decora')
  ) {
    recommendedMaterial = 'PLA';
    recommendedEnvironment = 'Interior / Taller';
    categoryLabel = 'Organización de Interior & Detalle';
    infillAndWalls = '25% Gyroid · 3 perímetros (0.16 mm)';
    rationale =
      'En interiores sin estrés térmico ni impacto severo, PLA ofrece la mayor definición de aristas y acabado superficial.';
  }

  // Búsqueda de coincidencias reales en el catálogo de Vértice CR
  const matchedProducts: { product: CatalogProduct; matchReason: string }[] = [];

  for (const prod of CATALOG_PRODUCTS) {
    const score =
      (text.includes('cable') && prod.id === 'clip-cables-klamma' ? 3 : 0) +
      ((text.includes('prensa') || text.includes('mesa')) &&
      prod.id === 'clip-cables-klamma'
        ? 3
        : 0) +
      ((text.includes('audifono') ||
        text.includes('audífono') ||
        text.includes('diadema') ||
        text.includes('headset')) &&
      prod.id === 'soporte-audifonos'
        ? 3
        : 0) +
      ((text.includes('pared') ||
        text.includes('control') ||
        text.includes('mando') ||
        text.includes('modular') ||
        text.includes('herramienta')) &&
      prod.id === 'organizador-modular'
        ? 3
        : 0) +
      ((text.includes('llave') || text.includes('bolsillo')) &&
      prod.id === 'organizador-llaves'
        ? 3
        : 0) +
      ((text.includes('placa') || text.includes('nombre') || text.includes('qr')) &&
      prod.id === 'placa-escritorio'
        ? 3
        : 0) +
      ((text.includes('maceta') || text.includes('planta') || text.includes('contenedor')) &&
      prod.id === 'maceta-geometrica'
        ? 3
        : 0) +
      (prod.materials.includes(recommendedMaterial) ? 1 : 0);

    if (score >= 2) {
      matchedProducts.push({
        product: prod,
        matchReason: `Compatible con ${recommendedMaterial} y validado en planta (${prod.perimeters}).`,
      });
    }
  }

  // Si no hubo coincidencia directa por palabra clave, sugerir los 2 más afines al material
  if (matchedProducts.length === 0) {
    const fallback = CATALOG_PRODUCTS.filter((p) =>
      p.materials.includes(recommendedMaterial)
    ).slice(0, 2);
    for (const prod of fallback) {
      matchedProducts.push({
        product: prod,
        matchReason: `Diseño de referencia en catálogo compatible con ${recommendedMaterial}.`,
      });
    }
  }

  // Detectar incógnitas que no deben inventarse
  const missingInfoQuestions: string[] = [];
  const hasDimensions = /\d+\s*(mm|cm|pulg|m\b)/.test(text);
  if (!hasDimensions) {
    missingInfoQuestions.push(
      '¿Conoces las medidas aproximadas (en mm o cm) del espacio o tornillo donde encajará la pieza?'
    );
  }
  if (!text.includes('peso') && !text.includes('kg') && !text.includes('carga')) {
    missingInfoQuestions.push(
      '¿Cuánto peso aproximado o qué tipo de fuerza debe soportar la pieza instalada?'
    );
  }

  return {
    recommendedMaterial,
    recommendedEnvironment,
    categoryLabel,
    infillAndWalls,
    rationale,
    matchedProducts: matchedProducts.slice(0, 2),
    missingInfoQuestions,
    source: 'local-engine',
  };
}

