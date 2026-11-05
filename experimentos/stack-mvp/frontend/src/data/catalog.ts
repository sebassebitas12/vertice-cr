export type MaterialCode = 'ASA' | 'PETG' | 'PLA' | 'ABS' | 'TPU';

export interface FilamentColorOption {
  id: string;
  name: string;
  hex: string;
}

export const APPROVED_FILAMENT_COLORS: FilamentColorOption[] = [
  { id: 'negro-carbon', name: 'Negro Carbón Mate', hex: '#1c1c21' },
  { id: 'naranja-taller', name: 'Naranja Vértice', hex: '#ff6a1f' },
  { id: 'gris-titanio', name: 'Gris Titanio', hex: '#71717a' },
  { id: 'blanco-polar', name: 'Blanco Polar', hex: '#f4f4f5' },
  { id: 'arena-tecnica', name: 'Arena Técnica', hex: '#d6c7b2' },
];

export const FDM_MATERIALS: Record<
  MaterialCode,
  { name: string; ideal: string; strength: string }
> = {
  ASA: {
    name: 'Acrilonitrilo Estireno Acrilato',
    ideal: 'Intemperie, exposición solar UV directa y calor exterior.',
    strength: 'Alta resistencia UV y térmica',
  },
  PETG: {
    name: 'Polietileno Tereftalato Glicol',
    ideal: 'Esfuerzo mecánico diario, humedad, prensas y soportes de taller.',
    strength: 'Tenacidad mecánica e impermeabilidad',
  },
  PLA: {
    name: 'Ácido Poliláctico Técnico',
    ideal: 'Organización de escritorio en interiores, rigidez y detalle visual.',
    strength: 'Máxima precisión dimensional',
  },
  ABS: {
    name: 'Acrilonitrilo Butadieno Estireno',
    ideal: 'Carcasas técnicas cercanas a motores o fuentes de calor.',
    strength: 'Estabilidad térmica estructural',
  },
  TPU: {
    name: 'Poliuretano Termoplástico 95A',
    ideal: 'Amortiguación de vibraciones, topes flexibles y sellos contra impacto.',
    strength: 'Elasticidad y absorción de choque',
  },
};

export interface CatalogProduct {
  id: string;
  code: string;
  name: string;
  category: 'Taller & Setup' | 'Organización' | 'Soportes';
  layerHeight: string;
  perimeters: string;
  infillPattern: string;
  materials: MaterialCode[];
  approvedColors: string[];
  shortQuote: string;
  description: string;
  useCases: string[];
  images: string[];
  featured?: boolean;
}

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: 'organizador-modular',
    code: 'A-01',
    name: 'Organizador Modular de Pared & Controles',
    category: 'Taller & Setup',
    layerHeight: '0.20 mm',
    perimeters: '4 perímetros estructurales',
    infillPattern: '35% Gyroid',
    materials: ['PETG', 'ASA', 'PLA'],
    approvedColors: ['negro-carbon', 'naranja-taller', 'gris-titanio', 'blanco-polar'],
    shortQuote:
      '#A-01 Modular — "Panel perforado con tuercas impresas y soportes intercambiables para mandos, audífonos y herramientas de escritorio."',
    description:
      'Sistema de paneles modulares fabricado bajo pedido en FDM. Cada gancho, bandeja y soporte de control se fija mediante roscas impresas de paso ancho diseñadas para resistir el peso diario sin aflojarse.',
    useCases: [
      'Soportar hasta 2 controles y 1 diadema pesada en un mismo módulo.',
      'Reconfigurar la posición de los ganchos sin volver a perforar.',
      'Recomendado en PETG para interior o ASA si recibe calor cercano.',
    ],
    images: [
      '/images/products/organizador-modular/01.webp',
      '/images/products/organizador-modular/02.webp',
      '/images/products/organizador-modular/03.webp',
      '/images/products/organizador-modular/04.webp',
    ],
    featured: true,
  },
  {
    id: 'soporte-audifonos',
    code: 'A-02',
    name: 'Soporte de Escritorio para Audífonos',
    category: 'Soportes',
    layerHeight: '0.20 mm',
    perimeters: '4 perímetros en columna',
    infillPattern: '30% Gyroid',
    materials: ['PETG', 'PLA', 'ASA'],
    approvedColors: ['negro-carbon', 'gris-titanio', 'naranja-taller', 'blanco-polar'],
    shortQuote:
      '#A-02 Soporte — "Arco de radio amplio que distribuye la presión sobre la diadema sin deformar la espuma con el paso de los meses."',
    description:
      'Base estable con centro de gravedad bajo y cuna superior curvada. Se imprime con perímetros reforzados en el cuello vertical para evitar flexión lateral.',
    useCases: [
      'Audífonos de estudio o gaming de diadema ancha.',
      'Superficie mate con líneas de capa uniformes de 0.20 mm.',
      'Opción de base personalizada según el ancho de tu escritorio.',
    ],
    images: [
      '/images/products/soporte-audifonos/01.webp',
      '/images/products/soporte-audifonos/02.webp',
      '/images/products/soporte-audifonos/03.webp',
      '/images/products/soporte-audifonos/04.webp',
    ],
    featured: true,
  },
  {
    id: 'clip-cables-klamma',
    code: 'B-01',
    name: 'Prensa y Guía de Cables Klamma',
    category: 'Organización',
    layerHeight: '0.16 mm',
    perimeters: '5 perímetros en rosca',
    infillPattern: '40% Gyroid',
    materials: ['PETG', 'ASA', 'TPU'],
    approvedColors: ['negro-carbon', 'naranja-taller', 'gris-titanio'],
    shortQuote:
      '#B-01 Klamma — "Prensa mecánica con tornillo roscado impreso en 3D que se ajusta al grosor exacto de tu mesa sin usar adhesivos."',
    description:
      'Mecanismo de sujeción por tornillo FDM con canales separados para cables de carga y periféricos. Al usar rosca impresa de perfil trapezoidal, permite apretar y mover la guía cuantas veces quieras.',
    useCases: [
      'Bordes de escritorio donde los clips pegados con cinta se caen.',
      'Tornillo impreso con perímetros extra para soportar el torque manual.',
      'Disponible en PETG por su elasticidad mecánica sin fractura.',
    ],
    images: [
      '/images/products/clip-cables-klamma/01.webp',
      '/images/products/clip-cables-klamma/02.webp',
      '/images/products/clip-cables-klamma/03.webp',
    ],
    featured: true,
  },
  {
    id: 'organizador-llaves',
    code: 'B-02',
    name: 'Organizador Compacto de Llaves',
    category: 'Organización',
    layerHeight: '0.16 mm',
    perimeters: '4 perímetros',
    infillPattern: '45% Gyroid',
    materials: ['PETG', 'ABS', 'ASA'],
    approvedColors: ['negro-carbon', 'naranja-taller', 'gris-titanio', 'arena-tecnica'],
    shortQuote:
      '#B-02 Bolsillo — "Carcasa tipo navaja que mantiene las llaves alineadas y evita que rayen el teléfono o hagan ruido al caminar."',
    description:
      'Chasis compacto de dos tapas con separadores internos. Se recomienda en PETG o ABS/ASA para resistir caídas, roces constantes y calor dentro del vehículo.',
    useCases: [
      'Agrupar llaves estándar en un bloque compacto de bolsillo.',
      'Alta resistencia al desgaste por fricción diaria.',
    ],
    images: [
      '/images/products/organizador-llaves/01.webp',
      '/images/products/organizador-llaves/02.webp',
    ],
  },
  {
    id: 'placa-escritorio',
    code: 'C-01',
    name: 'Placa Técnica de Escritorio a Medida',
    category: 'Taller & Setup',
    layerHeight: '0.16 mm',
    perimeters: '3 perímetros',
    infillPattern: '25% Grid',
    materials: ['PLA', 'PETG', 'ASA'],
    approvedColors: ['negro-carbon', 'naranja-taller', 'blanco-polar', 'gris-titanio'],
    shortQuote:
      '#C-01 Identidad — "Letrero en relieve multicapa con cambio de filamento real, sin pintura superficial que se despinte."',
    description:
      'Pieza fabricada mediante cambio de color por altura de capa o inserción de bloques encajables. Ideal para estaciones de trabajo, oficinas de diseño o señalética interna.',
    useCases: [
      'Rótulos de escritorio, códigos QR físicos o señalética de taller.',
      'Contraste limpio entre base carbón y relieve en color sólido.',
    ],
    images: [
      '/images/products/placa-escritorio/01.webp',
      '/images/products/placa-escritorio/02.webp',
      '/images/products/placa-escritorio/03.webp',
      '/images/products/placa-escritorio/04.webp',
    ],
  },
  {
    id: 'maceta-geometrica',
    code: 'C-02',
    name: 'Contenedor Geométrico Facetado',
    category: 'Organización',
    layerHeight: '0.20 mm',
    perimeters: '4 perímetros impermeables',
    infillPattern: '25% Gyroid',
    materials: ['PETG', 'ASA', 'PLA'],
    approvedColors: ['negro-carbon', 'arena-tecnica', 'blanco-polar', 'gris-titanio'],
    shortQuote:
      '#C-02 Facetas — "Paredes gruesas impermeables impresas en PETG o ASA para resistir humedad y riego sin filtraciones."',
    description:
      'Geometría de caras angulares diseñada para imprimirse sin soportes internos y con base de drenaje opcional.',
    useCases: [
      'Plantas de escritorio en interior (PLA/PETG) o balcón al sol (ASA).',
      'También utilizable como cubilete de herramientas en el taller.',
    ],
    images: ['/images/products/maceta-geometrica/01.webp'],
  },
];
