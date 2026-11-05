import type { MaterialCode } from '../data/catalog';

export type FieldOrigin = 'Cliente' | 'IA aceptada';

export interface TrackedField<T> {
  value: T;
  origin: FieldOrigin;
  userEdited: boolean;
  previousValue?: T;
  pendingSuggestion?: T;
}

export interface RequestDraftState {
  mode: 'catalogo' | 'medida';
  selectedProductId: string;
  description: string;
  material: TrackedField<MaterialCode>;
  environment: TrackedField<string>;
  colorId: string;
  quantity: number;
  clientName: string;
  clientEmail: string;
  updatedAt: string;
}

const DRAFT_STORAGE_KEY = 'vertice_cr_request_draft_v1';

export function createInitialDraft(params?: {
  pieza?: string | null;
  material?: MaterialCode | null;
  color?: string | null;
  cantidad?: number | null;
  defaultDescription?: string;
}): RequestDraftState {
  const hasPieza = Boolean(params?.pieza);
  return {
    mode: hasPieza ? 'catalogo' : 'medida',
    selectedProductId: params?.pieza ?? 'organizador-modular',
    description: params?.defaultDescription ?? '',
    material: {
      value: params?.material ?? 'PETG',
      origin: 'Cliente',
      userEdited: Boolean(params?.material),
    },
    environment: {
      value: 'Interior / Taller',
      origin: 'Cliente',
      userEdited: false,
    },
    colorId: params?.color ?? 'negro-carbon',
    quantity: params?.cantidad && params.cantidad > 0 ? params.cantidad : 1,
    clientName: '',
    clientEmail: '',
    updatedAt: new Date().toISOString(),
  };
}

export function loadDraftFromStorage(): RequestDraftState | null {
  try {
    const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as RequestDraftState;
    if (!parsed || typeof parsed.description !== 'string' || !parsed.material?.value) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function saveDraftToStorage(draft: RequestDraftState): void {
  try {
    const payload: RequestDraftState = {
      ...draft,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore storage quota errors
  }
}

export function clearDraftFromStorage(): void {
  try {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
  } catch {
    // Ignore
  }
}

