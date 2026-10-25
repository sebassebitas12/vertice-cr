import Link from "next/link";
export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link className="footer-word" href="/">vértice<span>.</span></Link>
          <p>Impresión FDM para ideas que necesitan tomar forma.</p>
        </div>
        <div className="footer-links"><Link href="/#piezas">Ver referencias</Link><Link href="/solicitud">Iniciar solicitud</Link></div>
        <p className="footer-note">Las imágenes y referencias de esta prueba son conceptuales. Cada solicitud requiere revisión; no se muestran precios ni existencias confirmadas.</p>
      </div>
      <div className="footer-baseline"><span>VÉRTICE · FABRICACIÓN FDM</span><span>Prueba de experiencia</span></div>
    </footer>
  );
}
