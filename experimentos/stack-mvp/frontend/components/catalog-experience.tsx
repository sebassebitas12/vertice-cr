"use client";
import { useMemo, useState } from "react";
import ProductCard from "./product-card";
import { getCatalogDescription } from "../lib/catalog-presentation";
import type { CatalogProduct } from "../lib/api";
type CatalogExperienceProps = { initialProducts: CatalogProduct[]; initialError: string | null };
export default function CatalogExperience({ initialProducts, initialError }: CatalogExperienceProps) {
  const [query, setQuery] = useState("");
  const [activeFamily, setActiveFamily] = useState("Todas");
  const families = useMemo(() => ["Todas", ...new Set(initialProducts.map((product) => product.family))], [initialProducts]);
  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("es");
    return initialProducts.filter((product) => {
      const matchesFamily = activeFamily === "Todas" || product.family === activeFamily;
      const searchable = [product.name, product.family, getCatalogDescription(product)].join(" ").toLocaleLowerCase("es");
      return matchesFamily && (!normalized || searchable.includes(normalized));
    });
  }, [activeFamily, initialProducts, query]);
  if (initialError) {
    return <div className="connection-state" role="status">No se pudo conectar con la API demo. Iníciala en otra terminal y recarga esta página.<br /><code>npm run dev</code> dentro de <code>experimentos/stack-mvp/api</code>.</div>;
  }
  return (
    <>
      <div className="catalog-tools">
        <label className="search-wrap" htmlFor="catalog-search"><span className="search-icon" aria-hidden="true">⌕</span>
          <input id="catalog-search" type="search" placeholder="Buscar piezas por nombre o uso" value={query} onChange={(event) => setQuery(event.target.value)} />
        </label>
        <span className="catalog-count" aria-live="polite">{filteredProducts.length} {filteredProducts.length === 1 ? "referencia" : "referencias"}</span>
      </div>
      <div className="catalog-filters" role="group" aria-label="Filtrar referencias por familia">
        {families.map((family) => <button key={family} type="button" className="filter-chip" aria-pressed={activeFamily === family} onClick={() => setActiveFamily(family)}>{family}</button>)}
      </div>
      <div className="catalog-results-line"><span>Referencias de la demo</span><strong>{filteredProducts.length} {filteredProducts.length === 1 ? "pieza" : "piezas"}</strong></div>
      {filteredProducts.length ? <div className="catalog-grid">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        : <div className="empty-state" role="status">No hay referencias que coincidan con esa búsqueda.</div>}
      <p className="catalog-notice"><span aria-hidden="true">✳</span><span>Las fichas e imágenes son conceptuales. Este prototipo no confirma precio, existencia ni fabricación.</span></p>
    </>
  );
}
