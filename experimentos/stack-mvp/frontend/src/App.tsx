import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ToolsPage } from './pages/ToolsPage';
import { RequestPage } from './pages/RequestPage';
import { MyRequestsPage } from './pages/MyRequestsPage';
import { WorkshopPage } from './pages/WorkshopPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[#161618] text-[#f5f5f7] selection:bg-[#ff6a1f] selection:text-[#110a05] flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalogo" element={<CatalogPage />} />
            <Route path="/catalogo/:id" element={<ProductDetailPage />} />
            <Route path="/herramientas" element={<ToolsPage />} />
            <Route path="/solicitar" element={<RequestPage />} />
            <Route path="/mis-solicitudes" element={<MyRequestsPage />} />
            <Route path="/taller" element={<WorkshopPage />} />
          </Routes>
        </main>

        <footer className="py-10 border-t border-white/[0.06] bg-[#141417]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img
                src="/brand/vertice-logo-3d.png"
                alt="Vértice CR"
                className="h-7 w-auto object-contain"
              />
              <span className="text-xs text-zinc-400">
                Manufactura aditiva FDM bajo pedido · Costa Rica
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-xs font-bold text-zinc-400">
              <Link to="/" className="hover:text-white transition-colors">
                Nosotros
              </Link>
              <Link to="/catalogo" className="hover:text-white transition-colors">
                Diseños
              </Link>
              <Link to="/herramientas" className="hover:text-white transition-colors">
                Herramientas
              </Link>
              <Link to="/mis-solicitudes" className="hover:text-white transition-colors">
                Mis solicitudes
              </Link>
              <Link to="/taller" className="hover:text-white transition-colors">
                Bandeja del Taller
              </Link>
              <Link to="/solicitar" className="text-[#ff6a1f] hover:underline">
                Cotizar con IA →
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
