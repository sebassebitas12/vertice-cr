import { NavLink, Link } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/catalogo', label: 'Diseños' },
  { to: '/', label: 'Nosotros', end: true },
  { to: '/herramientas', label: 'Herramientas' },
  { to: '/solicitar', label: 'Cotizar con asistente' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#141417]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3.5 lg:px-8">
        {/* Logo libre a la izquierda */}
        <Link to="/" className="inline-flex items-center select-none">
          <img
            src="/brand/vertice-logo-3d.png"
            alt="Vértice CR"
            className="h-9 w-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.75)]"
          />
        </Link>

        {/* Píldora central — Cada botón navega a una página distinta */}
        <nav className="nav-pill-3d flex items-center gap-1 rounded-full p-1.5">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive
                  ? 'btn-3d-orange rounded-full px-4 py-1.5 text-xs font-bold tracking-wide'
                  : 'nav-link-3d rounded-full px-4 py-1.5 text-xs font-bold text-zinc-300 hover:text-white'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Acciones libres a la derecha */}
        <div className="flex items-center gap-4">
          <NavLink
            to="/mis-solicitudes"
            className={({ isActive }) =>
              `nav-link-3d hidden text-xs font-bold sm:inline ${
                isActive ? 'text-[#ff6a1f]' : 'text-zinc-300 hover:text-white'
              }`
            }
          >
            Mis solicitudes
          </NavLink>
          <NavLink
            to="/taller"
            className={({ isActive }) =>
              `nav-link-3d hidden text-xs font-bold md:inline ${
                isActive ? 'text-[#ff6a1f]' : 'text-zinc-400 hover:text-white'
              }`
            }
          >
            Taller
          </NavLink>
          <Link
            to="/solicitar"
            className="btn-3d-orange rounded-full px-4 py-2 text-xs font-bold tracking-wide"
          >
            Pedir pieza
          </Link>
        </div>
      </div>
    </header>
  );
}
