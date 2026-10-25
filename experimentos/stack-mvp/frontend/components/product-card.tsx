import Link from "next/link";
import ProductImage from "./product-image";
import { getCatalogDescription } from "../lib/catalog-presentation";
import type { CatalogProduct } from "../lib/api";
type ProductCardProps = { product: CatalogProduct };
export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <figure className="product-media"><ProductImage visual={product.visual} alt={product.name + ", imagen conceptual de una pieza impresa en 3D"} className="product-photo" /><span className="image-note">Concepto</span></figure>
      <div className="product-info">
        <div className="product-meta"><span>{product.family}</span><span>FDM · referencia</span></div>
        <h3>{product.name}</h3><p>{getCatalogDescription(product)}</p>
        <Link className="product-link" href={"/solicitud?producto=" + encodeURIComponent(product.id)}><span>Consultar esta pieza</span><span className="product-arrow" aria-hidden="true">↗</span></Link>
      </div>
    </article>
  );
}
