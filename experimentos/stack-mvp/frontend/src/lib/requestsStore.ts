import type { MaterialCode } from '../data/catalog';

export type RequestStatus = 'PENDING_QUOTE' | 'NEEDS_INFO' | 'QUOTED' | 'APPROVED';

export interface QuoteVersion {
  version: number;
  amountCRC: number;
  estimatedPrintHours: number;
  layerHeight: string;
  perimeters: string;
  workshopNotes: string;
  validUntil: string;
  createdAt: string;
}

export interface RequestEvent {
  id: string;
  date: string;
  actor: 'Cliente' | 'Taller Vértice' | 'Asistente IA (n8n)';
  title: string;
  detail: string;
}

export interface QuoteRequestRecord {
  id: string;
  code: string;
  idempotencyKey: string;
  mode: 'catalogo' | 'medida';
  catalogProductId?: string;
  catalogProductTitle?: string;
  description: string;
  material: MaterialCode;
  materialOrigin: 'Cliente' | 'IA aceptada';
  environment: string;
  colorId: string;
  colorName: string;
  quantity: number;
  clientName: string;
  clientEmail: string;
  status: RequestStatus;
  workshopQuestion?: string;
  currentQuote?: QuoteVersion;
  history: RequestEvent[];
  createdAt: string;
  updatedAt: string;
}

const REQUESTS_STORAGE_KEY = 'vertice_cr_requests_v1';

const SUPABASE_URL =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) ??
  'https://srknevopdhujjchwwkbv.supabase.co';
const SUPABASE_KEY =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ??
  'sb_publishable_Lx0Crlkg2S84VMVcDTKM0A_UsGt2WIA';

async function syncRecordToSupabase(record: QuoteRequestRecord, isNew: boolean) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return;
  try {
    const row = {
      id: record.id,
      code: record.code,
      idempotency_key: record.idempotencyKey,
      mode: record.mode,
      catalog_product_id: record.catalogProductId ?? null,
      catalog_product_title: record.catalogProductTitle ?? null,
      description: record.description,
      material: record.material,
      material_origin: record.materialOrigin,
      environment: record.environment,
      color_id: record.colorId,
      color_name: record.colorName,
      quantity: record.quantity,
      client_name: record.clientName,
      client_email: record.clientEmail,
      status: record.status,
      workshop_question: record.workshopQuestion ?? null,
      current_quote: record.currentQuote ?? null,
      history: record.history,
      created_at: record.createdAt,
      updated_at: record.updatedAt,
    };

    const url = isNew
      ? `${SUPABASE_URL}/rest/v1/quote_requests`
      : `${SUPABASE_URL}/rest/v1/quote_requests?id=eq.${encodeURIComponent(record.id)}`;

    await fetch(url, {
      method: isNew ? 'POST' : 'PATCH',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(row),
    });
  } catch {
    // Fallback local si no hay red
  }
}

const SEED_REQUESTS: QuoteRequestRecord[] = [
  {
    id: 'req-seed-1042',
    code: 'VRT-1042',
    idempotencyKey: 'seed-1042',
    mode: 'catalogo',
    catalogProductId: 'clip-cables-klamma',
    catalogProductTitle: '#B-01 Prensa y Guía de Cables Klamma',
    description:
      'Necesito 2 prensas Klamma adaptadas para un tablero de madera de guanacaste de 42 mm de espesor.',
    material: 'PETG',
    materialOrigin: 'IA aceptada',
    environment: 'Interior / Taller',
    colorId: 'naranja-taller',
    colorName: 'Naranja Vértice',
    quantity: 2,
    clientName: 'Sebastián (Demo)',
    clientEmail: 'sebastian@vertice.cr',
    status: 'QUOTED',
    currentQuote: {
      version: 1,
      amountCRC: 11500,
      estimatedPrintHours: 4.5,
      layerHeight: '0.16 mm',
      perimeters: '5 perímetros en husillo roscado',
      workshopNotes:
        'Se ajustó la apertura del arco en C a 48 mm libres y se reforzó la rosca trapezoidal con 5 perímetros en PETG.',
      validUntil: '2026-11-18',
      createdAt: '2026-11-04 16:40',
    },
    history: [
      {
        id: 'ev-1',
        date: '2026-11-04 14:15',
        actor: 'Cliente',
        title: 'Solicitud creada (PENDING_QUOTE)',
        detail: 'Basada en #B-01 Prensa Klamma con apertura especial de 42 mm.',
      },
      {
        id: 'ev-2',
        date: '2026-11-04 14:16',
        actor: 'Asistente IA (n8n)',
        title: 'Polímero sugerido y aceptado: PETG',
        detail: 'Recomendado por elasticidad mecánica en tornillo de sujeción.',
      },
      {
        id: 'ev-3',
        date: '2026-11-04 16:40',
        actor: 'Taller Vértice',
        title: 'Cotización formal emitida (#v1)',
        detail: 'Oferta por 2 unidades en PETG Naranja Vértice: ₡11,500.',
      },
    ],
    createdAt: '2026-11-04 14:15',
    updatedAt: '2026-11-04 16:40',
  },
  {
    id: 'req-seed-1038',
    code: 'VRT-1038',
    idempotencyKey: 'seed-1038',
    mode: 'medida',
    description:
      'Soporte exterior para cámara de seguridad en portón metálico expuesto al sol toda la mañana.',
    material: 'ASA',
    materialOrigin: 'IA aceptada',
    environment: 'Exterior / Intemperie UV',
    colorId: 'negro-carbon',
    colorName: 'Negro Carbón Mate',
    quantity: 1,
    clientName: 'Taller Mecánico Río Segundo',
    clientEmail: 'contacto@tallerdemo.cr',
    status: 'NEEDS_INFO',
    workshopQuestion:
      'Para preparar la cotización exacta en ASA: ¿qué distancia hay entre los 3 agujeros de la base de tu cámara (en mm) y de qué ancho es el tubo cuadrado del portón?',
    history: [
      {
        id: 'ev-10',
        date: '2026-11-03 19:20',
        actor: 'Cliente',
        title: 'Solicitud a medida registrada (PENDING_QUOTE)',
        detail: 'Soporte exterior sometido a radiación UV.',
      },
      {
        id: 'ev-11',
        date: '2026-11-04 09:10',
        actor: 'Taller Vértice',
        title: 'Solicitud de aclaración de medidas (NEEDS_INFO)',
        detail: 'Se consultó patrón de tornillos de la cámara y perfil del portón.',
      },
    ],
    createdAt: '2026-11-03 19:20',
    updatedAt: '2026-11-04 09:10',
  },
];

function formatNow(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
}

export function getAllRequests(): QuoteRequestRecord[] {
  try {
    const raw = localStorage.getItem(REQUESTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(SEED_REQUESTS));
      return SEED_REQUESTS;
    }
    const parsed = JSON.parse(raw) as QuoteRequestRecord[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : SEED_REQUESTS;
  } catch {
    return SEED_REQUESTS;
  }
}

function saveAllRequests(records: QuoteRequestRecord[]): void {
  try {
    localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(records));
  } catch {
    // Ignore
  }
}

export function createQuoteRequest(input: {
  idempotencyKey: string;
  mode: 'catalogo' | 'medida';
  catalogProductId?: string;
  catalogProductTitle?: string;
  description: string;
  material: MaterialCode;
  materialOrigin: 'Cliente' | 'IA aceptada';
  environment: string;
  colorId: string;
  colorName: string;
  quantity: number;
  clientName: string;
  clientEmail: string;
}): QuoteRequestRecord {
  const existing = getAllRequests();

  // Prevención de duplicados por idempotencyKey
  const duplicate = existing.find((r) => r.idempotencyKey === input.idempotencyKey);
  if (duplicate) return duplicate;

  const now = formatNow();
  const randomNum = Math.floor(1050 + Math.random() * 8900);
  const code = `VRT-${randomNum}`;

  const history: RequestEvent[] = [
    {
      id: `ev-${Date.now()}-1`,
      date: now,
      actor: 'Cliente',
      title: 'Solicitud confirmada (PENDING_QUOTE)',
      detail: `${input.quantity} unidad(es) en ${input.material} (${input.colorName}). Pendiente de revisión técnica del taller.`,
    },
  ];

  if (input.materialOrigin === 'IA aceptada') {
    history.push({
      id: `ev-${Date.now()}-2`,
      date: now,
      actor: 'Asistente IA (n8n)',
      title: `Sugerencia de polímero aceptada (${input.material})`,
      detail: `Entorno declarado: ${input.environment}.`,
    });
  }

  const newRecord: QuoteRequestRecord = {
    id: `req-${Date.now()}`,
    code,
    idempotencyKey: input.idempotencyKey,
    mode: input.mode,
    catalogProductId: input.catalogProductId,
    catalogProductTitle: input.catalogProductTitle,
    description: input.description,
    material: input.material,
    materialOrigin: input.materialOrigin,
    environment: input.environment,
    colorId: input.colorId,
    colorName: input.colorName,
    quantity: input.quantity,
    clientName: input.clientName,
    clientEmail: input.clientEmail,
    status: 'PENDING_QUOTE',
    history,
    createdAt: now,
    updatedAt: now,
  };

  const next = [newRecord, ...existing];
  saveAllRequests(next);
  void syncRecordToSupabase(newRecord, true);
  return newRecord;
}

export function replyToWorkshopQuestion(
  requestId: string,
  clientAnswer: string
): QuoteRequestRecord | null {
  const records = getAllRequests();
  const idx = records.findIndex((r) => r.id === requestId);
  if (idx === -1) return null;

  const now = formatNow();
  const target = records[idx];
  const updated: QuoteRequestRecord = {
    ...target,
    description: `${target.description}\n\n[Aclaración del cliente]: ${clientAnswer}`,
    status: 'PENDING_QUOTE',
    workshopQuestion: undefined,
    updatedAt: now,
    history: [
      ...target.history,
      {
        id: `ev-${Date.now()}`,
        date: now,
        actor: 'Cliente',
        title: 'Aclaración enviada al taller',
        detail: clientAnswer,
      },
    ],
  };

  records[idx] = updated;
  saveAllRequests(records);
  void syncRecordToSupabase(updated, false);
  return updated;
}

export function approveQuoteVersion(
  requestId: string,
  version: number
): QuoteRequestRecord | null {
  const records = getAllRequests();
  const idx = records.findIndex((r) => r.id === requestId);
  if (idx === -1) return null;

  const target = records[idx];
  if (!target.currentQuote || target.currentQuote.version !== version) {
    return null;
  }

  const now = formatNow();
  const updated: QuoteRequestRecord = {
    ...target,
    status: 'APPROVED',
    updatedAt: now,
    history: [
      ...target.history,
      {
        id: `ev-${Date.now()}`,
        date: now,
        actor: 'Cliente',
        title: `Cotización #v${version} aceptada (₡${target.currentQuote.amountCRC.toLocaleString('es-CR')})`,
        detail: 'El cliente aprobó las condiciones técnicas y el monto para pasar a cola de impresión.',
      },
    ],
  };

  records[idx] = updated;
  saveAllRequests(records);
  void syncRecordToSupabase(updated, false);
  return updated;
}

export function workshopAskClarification(
  requestId: string,
  question: string
): QuoteRequestRecord | null {
  const records = getAllRequests();
  const idx = records.findIndex((r) => r.id === requestId);
  if (idx === -1) return null;

  const now = formatNow();
  const target = records[idx];
  const updated: QuoteRequestRecord = {
    ...target,
    status: 'NEEDS_INFO',
    workshopQuestion: question,
    updatedAt: now,
    history: [
      ...target.history,
      {
        id: `ev-${Date.now()}`,
        date: now,
        actor: 'Taller Vértice',
        title: 'Solicitud de aclaración técnica (NEEDS_INFO)',
        detail: question,
      },
    ],
  };

  records[idx] = updated;
  saveAllRequests(records);
  void syncRecordToSupabase(updated, false);
  return updated;
}

export function workshopEmitQuote(
  requestId: string,
  quoteInput: {
    amountCRC: number;
    estimatedPrintHours: number;
    layerHeight: string;
    perimeters: string;
    workshopNotes: string;
  }
): QuoteRequestRecord | null {
  const records = getAllRequests();
  const idx = records.findIndex((r) => r.id === requestId);
  if (idx === -1) return null;

  const now = formatNow();
  const target = records[idx];
  const nextVersion = (target.currentQuote?.version ?? 0) + 1;

  const newQuote: QuoteVersion = {
    version: nextVersion,
    amountCRC: Math.max(1000, quoteInput.amountCRC),
    estimatedPrintHours: quoteInput.estimatedPrintHours,
    layerHeight: quoteInput.layerHeight,
    perimeters: quoteInput.perimeters,
    workshopNotes: quoteInput.workshopNotes,
    validUntil: '14 días naturales',
    createdAt: now,
  };

  const updated: QuoteRequestRecord = {
    ...target,
    status: 'QUOTED',
    workshopQuestion: undefined,
    currentQuote: newQuote,
    updatedAt: now,
    history: [
      ...target.history,
      {
        id: `ev-${Date.now()}`,
        date: now,
        actor: 'Taller Vértice',
        title: `Cotización formal emitida (#v${nextVersion})`,
        detail: `Monto: ₡${newQuote.amountCRC.toLocaleString('es-CR')} · ${newQuote.estimatedPrintHours}h de impresión (${newQuote.layerHeight}, ${newQuote.perimeters}).`,
      },
    ],
  };

  records[idx] = updated;
  saveAllRequests(records);
  void syncRecordToSupabase(updated, false);
  return updated;
}

