export type CatalogProduct = {
  id: string; name: string; family: string; material: string; description: string; visual: string;
};

export type DemoRequest = {
  id: string; productId?: string; description: string; useCase: string; quantity: number;
  preferredMaterial?: string; status: "PENDING_QUOTE"; price: null; createdAt: string;
};

type CatalogResponse = { ok: boolean; data: CatalogProduct[] };
type RequestResponse = { ok: boolean; data?: DemoRequest; error?: string };

const serverApiUrl = process.env.VERTICE_API_URL || "http://localhost:4000";
const browserApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function getCatalog(): Promise<{ data: CatalogProduct[]; error: string | null }> {
  try {
    const response = await fetch(serverApiUrl + "/api/catalog", { cache: "no-store" });
    if (!response.ok) throw new Error("La API demo respondió con error.");
    const body = (await response.json()) as CatalogResponse;
    return { data: body.data, error: null };
  } catch {
    return { data: [], error: "API_DEMO_OFFLINE" };
  }
}

export async function getCatalogClient(): Promise<CatalogProduct[]> {
  const response = await fetch(browserApiUrl + "/api/catalog");
  if (!response.ok) throw new Error("No se pudo cargar la referencia de la pieza.");
  const body = (await response.json()) as CatalogResponse;
  return body.data;
}

export async function createRequest(
  values: { productId?: string; description: string; useCase: string; quantity: number; preferredMaterial?: string },
  idempotencyKey: string,
): Promise<DemoRequest> {
  let response: Response;
  try {
    response = await fetch(browserApiUrl + "/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Idempotency-Key": idempotencyKey },
      body: JSON.stringify(values),
    });
  } catch {
    throw new Error("No hay conexión con la API demo. Revisa que esté iniciada e inténtalo otra vez.");
  }
  const body = (await response.json()) as RequestResponse;
  if (!response.ok || !body.data) throw new Error(body.error || "La API demo no aceptó la solicitud.");
  return body.data;
}
