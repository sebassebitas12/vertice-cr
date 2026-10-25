import Link from "next/link";
import ThemeToggle from "./theme-toggle";
export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="Vértice, inicio">
          <span className="brand-copy"><strong>vértice<span>.</span></strong><small>FABRICACIÓN FDM</small></span>
        </Link>
        <nav className="main-nav" aria-label="Navegación principal">
          <Link href="/#piezas">Piezas</Link><Link href="/#proceso">Cómo funciona</Link>
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <Link className="header-cta" href="/solicitud"><span className="nav-long">Iniciar solicitud</span><span className="nav-short">Pedir</span><span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </header>
  );
}
