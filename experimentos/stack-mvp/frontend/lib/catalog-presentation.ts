
import type { CatalogProduct } from "./api";
export function getCatalogDescription(product: Pick<CatalogProduct, "description">) {
  return product.description.trim();
}
