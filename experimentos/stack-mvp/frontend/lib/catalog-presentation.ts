import type { CatalogProduct } from "./api";

const conceptDescriptions: Record<string, string> = {
  bracket: "Un soporte angular pensado como referencia para proyectos de montaje y fijación.",
  cable: "Una guía de perfil bajo para conducir cables sobre una mesa o estación de trabajo.",
  spacer: "Un separador escalonado para explorar ajustes entre piezas y componentes.",
};

export function getCatalogDescription(product: Pick<CatalogProduct, "description" | "visual">) {
  const description = product.description.trim();
  if (description.toLocaleLowerCase("es").startsWith("modelo de muestra")) {
    return conceptDescriptions[product.visual] ?? "Una referencia conceptual para iniciar una consulta.";
  }
  return description;
}
