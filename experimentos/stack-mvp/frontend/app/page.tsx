import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import CatalogExperience from "../components/catalog-experience";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";
import { getCatalog } from "../lib/api";
async function CatalogSection() {
  const result = await getCatalog();
  return (
    <section className="catalog-section" id="piezas" aria-labelledby="catalog-title">
      <div className="section-heading">
        <div><p className="eyebrow">Referencias para explorar</p><h2 id="catalog-title">Piezas que parten<br />de una necesidad.</h2></div>
        <p>Busca una idea cercana o explora las referencias FDM. Cada solicitud se revisa antes de cotizar.</p>
      </div>
      <CatalogExperience initialProducts={result.data} initialError={result.error} />
    </section>
  );
}
export default function Home() {
  return (
    <div className="site-frame">
      <SiteHeader />
      <main className="page-main">
        <section className="hero" aria-labelledby="home-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" />Impresión FDM · Vértice</p>
            <h1 id="home-title">¿Qué pieza<br /><em>te hace falta?</em></h1>
            <p className="hero-lede">Explora referencias de piezas impresas en 3D o cuéntanos qué necesitas resolver. Revisamos cada solicitud antes de preparar una cotización.</p>
            <div className="hero-actions">
              <a className="button-primary" href="#piezas"><span>Explorar referencias</span><span className="button-arrow" aria-hidden="true">↗</span></a>
              <Link className="text-link" href="/solicitud">Pedir revisión <span aria-hidden="true">→</span></Link>
            </div>
            <p className="hero-footnote"><span className="status-dot" />Referencias conceptuales · fabricación bajo consulta</p>
          </div>
          <figure className="hero-figure">
            <div className="hero-photo">
              <Image src="/images/concept-hero.png" alt="Escena conceptual de piezas impresas en 3D para organizar cables y objetos de escritorio" fill priority sizes="(max-width: 760px) 100vw, 55vw" className="hero-photo-image" />
              <span className="image-note">Concepto</span>
            </div>
            <figcaption><span>Organización para el espacio de trabajo</span><span>Referencia visual</span></figcaption>
          </figure>
        </section>
        <section className="process-band" id="proceso" aria-labelledby="process-title">
          <div className="process-intro"><p className="process-kicker">Así empieza</p><h2 id="process-title">De la idea<br />a la revisión.</h2></div>
          <div className="process-steps">
            <article className="process-step"><span className="step-mark" aria-hidden="true">01</span><div><h3>Explora</h3><p>Mira una referencia o empieza desde cero.</p></div></article>
            <article className="process-step"><span className="step-mark" aria-hidden="true">02</span><div><h3>Describe</h3><p>Cuéntanos para qué la necesitas y cuántas.</p></div></article>
            <article className="process-step"><span className="step-mark" aria-hidden="true">03</span><div><h3>Revisamos</h3><p>Confirmamos si podemos cotizarla.</p></div></article>
          </div>
        </section>
        <Suspense fallback={<section className="connection-state">Cargando las referencias del catálogo…</section>}><CatalogSection /></Suspense>
        <section className="custom-band" aria-labelledby="custom-title">
          <div><p className="custom-kicker">¿No encuentras una referencia?</p><h2 id="custom-title">Cuéntanos qué<br /><em>quieres resolver.</em></h2></div>
          <Link className="custom-link" href="/solicitud"><span>Iniciar solicitud</span><span aria-hidden="true">↗</span></Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
