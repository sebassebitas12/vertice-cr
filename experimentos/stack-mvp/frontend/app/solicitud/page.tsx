import Link from "next/link";
import { Suspense } from "react";
import RequestExperience from "../../components/request-experience";
import SiteFooter from "../../components/site-footer";
import SiteHeader from "../../components/site-header";

export default function RequestPage() {
  return (
    <div className="site-frame">
      <SiteHeader />
      <main className="page-main request-page">
        <Link className="request-back" href="/#piezas"><span aria-hidden="true">←</span> Volver a las referencias</Link>
        <Suspense fallback={<div className="connection-state">Preparando el formulario de solicitud…</div>}>
          <RequestExperience />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
