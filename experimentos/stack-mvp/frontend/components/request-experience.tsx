"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductImage from "./product-image";
import RequestForm from "./request-form";
import { getCatalogClient } from "../lib/api";
import { getCatalogDescription } from "../lib/catalog-presentation";
import type { CatalogProduct } from "../lib/api";

export default function RequestExperience() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("producto") || "";
  const [catalog, setCatalog] = useState<CatalogProduct[] | null>(null);

  useEffect(() => {
    let active = true;
    getCatalogClient()
      .then((items) => { if (active) setCatalog(items); })
      .catch(() => { if (active) setCatalog([]); });
    return () => { active = false; };
  }, []);

  const product = productId ? catalog?.find((item) => item.id === productId) || null : null;
  const loading = Boolean(productId) && catalog === null;
  const imageVisual = product?.visual ?? "bracket";
  const imageAlt = product
    ? product.name + ", imagen conceptual de una pieza impresa en 3D"
    : "Imagen conceptual de objetos impresos en 3D para una solicitud personalizada";

  return (
    <div className="request-layout">
      <section className="request-panel" aria-labelledby="request-title">
        <p className="eyebrow">Solicitud al taller</p>
        <h1 className="request-title" id="request-title">Cuéntanos qué<br /><em>necesitas.</em></h1>
        <p className="request-intro">No necesitas saber términos técnicos. Explica el uso y la cantidad; el taller revisará la información antes de cotizar.</p>
        <RequestForm productId={productId || undefined} />
      </section>
      <aside className="request-aside" aria-label="Resumen de la solicitud">
        <figure className="request-visual">
          <ProductImage visual={imageVisual} alt={imageAlt} className="request-photo" priority />
          <figcaption><span>{product ? "Referencia seleccionada" : "Solicitud personalizada"}</span><span>Imagen conceptual</span></figcaption>
        </figure>
        <div className="request-summary">
          <p className="summary-kicker">{loading ? "Cargando referencia" : product ? product.family : "Sin pieza seleccionada"}</p>
          <h2>{product ? product.name : "Empezamos por el uso"}</h2>
          <p>{product ? getCatalogDescription(product) : "Describe lo que quieres resolver. Si tienes una referencia, podrás incluirla en la descripción."}</p>
          <dl className="summary-list">
            <div><dt>Revisión</dt><dd>Antes de cotizar</dd></div>
            <div><dt>Precio</dt><dd>Por definir</dd></div>
            <div><dt>Prueba local</dt><dd>Guardado temporal</dd></div>
          </dl>
        </div>
      </aside>
    </div>
  );
}

