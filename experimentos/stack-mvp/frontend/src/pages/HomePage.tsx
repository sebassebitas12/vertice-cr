import { Link } from 'react-router-dom';
import Ps3HeroWave from '../components/Ps3HeroWave';
import ExplodedStlViewer from '../components/ExplodedStlViewer';
import { CATALOG_PRODUCTS } from '../data/catalog';

const FEATURED_THREE = CATALOG_PRODUCTS.filter((p) => p.featured).slice(0, 3);

const MATERIALS_ROW = [
  { code: 'ASA', sub: 'EXTERIOR & UV', color: '#ff6a1f' },
  { code: 'PETG', sub: 'ESFUERZO MECÁNICO', color: '#38bdf8' },
  { code: 'PLA', sub: 'DETALLE & RIGIDEZ', color: '#a3e635' },
  { code: 'ABS', sub: 'ALTA TEMPERATURA', color: '#f59e0b' },
  { code: 'TPU', sub: 'ELÁSTICO & IMPACTO', color: '#c084fc' },
];

export default function HomePage() {
  return (
    <main className="bg-[#161618] text-[#f5f4f1]">
      {/* =================================================================
          1. HERO (Exclusivo con Onda 3 PS3 XMB)
          ================================================================= */}
      <section className="relative overflow-hidden pb-24 pt-16 md:pb-28 md:pt-24">
        <Ps3HeroWave />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#161618]" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-0.5 w-8 bg-[#ff6a1f]" />
              <span className="text-sm font-semibold text-zinc-200">
                Fabricación FDM bajo pedido · Costa Rica
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-[1.06] tracking-tight text-white sm:text-6xl">
              Piezas diseñadas para <span className="text-[#ff6a1f]">cumplir una función real.</span>
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
              Cada modelo de nuestra planta pasa por pruebas de ajuste, selección de polímero y orientación de capa antes de fabricarse. Elige un diseño probado o describe tu necesidad para que nuestro asistente en{' '}
              <span className="font-semibold text-[#ff6a1f]">n8n</span> prepare tu solicitud.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/catalogo"
                className="btn-3d-orange rounded-full px-7 py-3.5 text-sm font-bold tracking-wide"
              >
                Explorar diseños →
              </Link>
              <Link
                to="/solicitar"
                className="btn-3d-dark rounded-full px-7 py-3.5 text-sm font-bold tracking-wide"
              >
                Cotizar pieza con IA <span className="text-[#ff6a1f]">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          2. LAS 3 TARJETAS QUE LLEVAN AL PRODUCTO (Inspiración directa: "This round" de N3D)
          ================================================================= */}
      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-0.5 w-8 bg-[#ff6a1f]" />
            <span className="text-sm font-semibold text-zinc-200">Destacados en planta</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Piezas de línea, <span className="text-[#ff6a1f]">listas para producir</span>
          </h2>

          <div className="flex flex-wrap items-end justify-between gap-4">
            <p className="max-w-2xl text-base leading-relaxed text-zinc-400">
              Los modelos más solicitados para organización de taller y setup. Se fabrican bajo pedido en el polímero adecuado para tu espacio.{' '}
              <strong className="text-zinc-100">3 de {CATALOG_PRODUCTS.length} modelos</strong> destacados aquí.{' '}
              <Link to="/solicitar" className="font-semibold text-[#ff6a1f] hover:underline">
                ¿Necesitas modificar una medida?
              </Link>
            </p>

            <Link
              to="/catalogo"
              className="text-sm font-bold text-[#ff6a1f] transition hover:underline"
            >
              Ver todos los diseños
            </Link>
          </div>
        </div>

        {/* Las 3 tarjetas verticales que llevan cada una a la página del producto (/catalogo/:id) */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {FEATURED_THREE.map((product) => (
            <Link
              key={product.id}
              to={`/catalogo/${product.id}`}
              className="group flex flex-col overflow-hidden rounded-2xl bg-[#1e1e22] transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#121215]">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#ff6a1f] transition-colors">
                    {product.code} - {product.name}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-400">
                    {product.shortQuote}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =================================================================
          3. DESPIECE 3D CON ARCHIVOS .STL REALES (Inspiración directa: "Behind the files" de N3D)
          ================================================================= */}
      <section className="relative">
        <div data-stl-track="true" className="relative md:h-[240vh]">
          <div className="py-16 md:sticky md:top-0 md:flex md:h-[100svh] md:items-center md:py-0">
            <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
              <div className="grid items-center gap-10 md:grid-cols-[1.22fr_1fr] md:gap-12 2xl:gap-16">
                
                {/* Visor Three.js amplio sin recortes */}
                <div className="mx-auto w-full">
                  <ExplodedStlViewer />
                </div>

                {/* Historia libre sobre el fondo plano (Cero tarjetas) */}
                <div className="space-y-7">
                  <div className="flex items-center gap-3">
                    <div className="h-0.5 w-8 bg-[#ff6a1f]" />
                    <span className="text-sm font-semibold text-zinc-200">
                      Detrás de cada impresión
                    </span>
                  </div>

                  <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                    Hacer una forma es fácil.{' '}
                    <span className="text-[#ff6a1f]">Que trabaje sin fallar es el arte.</span>
                  </h2>

                  <p className="text-base leading-relaxed text-zinc-400">
                    Las piezas que sostienen carga, roscas o fricción diaria son la parte difícil. Antes de imprimir cualquier solicitud, definimos cuántos perímetros lleva la pared, en qué orientación trabajan las capas y qué polímero entre{' '}
                    <span className="font-semibold text-[#ff6a1f]">ASA, PETG, PLA, ABS y TPU</span>{' '}
                    responde mejor al esfuerzo real. Nuestro asistente en{' '}
                    <span className="font-semibold text-[#ff6a1f]">n8n</span> te guía paso a paso antes de que el taller revise tu cotización.
                  </p>

                  <blockquote className="border-l-2 border-[#ff6a1f] pl-5">
                    <p className="text-base font-medium leading-relaxed text-zinc-100">
                      &ldquo;Probamos las tolerancias y el material en planta para que tú no tengas que adivinar parámetros técnicos. Ese es todo el propósito de Vértice.&rdquo;
                    </p>
                    <footer className="mt-3 flex items-center gap-3">
                      <img
                        src="/brand/vertice-logo-flat.png"
                        alt="Vértice"
                        className="h-5 w-auto object-contain"
                      />
                      <span className="text-sm text-zinc-400">
                        <strong className="text-zinc-200">Vértice CR</strong>, ingeniería FDM bajo pedido
                      </span>
                    </footer>
                  </blockquote>

                  <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-5">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                        EN CATÁLOGO
                      </div>
                      <div className="mt-1 text-xl font-bold text-white">
                        {CATALOG_PRODUCTS.length} modelos
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                        POLÍMEROS EN PLANTA
                      </div>
                      <div className="mt-1 text-xl font-bold text-white">5 materiales</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                        COTIZACIÓN TÉCNICA
                      </div>
                      <div className="mt-1 text-xl font-bold text-white">Bajo revisión</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          4. CON QUÉ IMPRIMIMOS (Inspiración directa: "Who we print with" de N3D)
          ================================================================= */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-0.5 w-8 bg-[#ff6a1f]" />
            <span className="text-sm font-semibold text-zinc-200">Nuestros materiales</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Con qué <span className="text-[#ff6a1f]">imprimimos en planta</span>
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
          {MATERIALS_ROW.map((m) => (
            <Link
              key={m.code}
              to="/herramientas"
              className="flex h-28 flex-col items-center justify-center rounded-2xl bg-[#1e1e22] p-4 transition hover:bg-[#25252b] hover:-translate-y-0.5"
            >
              <span
                className="text-2xl font-bold tracking-wider"
                style={{ color: m.color }}
              >
                {m.code}
              </span>
              <span className="mt-1 text-[11px] font-bold tracking-widest text-zinc-400">
                {m.sub}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <p className="text-sm leading-relaxed text-zinc-400">
            <strong className="text-white">Selección verificada.</strong> Nuestro flujo con{' '}
            <span className="font-semibold text-[#ff6a1f]">n8n</span> relaciona el entorno real de tu pieza (exposición solar, humedad, impacto o tracción) con los 5 polímeros FDM que trabajamos en planta.
          </p>
          <p className="text-sm leading-relaxed text-zinc-400">
            <strong className="text-white">Laminado a medida.</strong> Cada solicitud se prepara ajustando altura de capa (<span className="font-semibold text-[#ff6a1f]">0.12 mm a 0.28 mm</span>) y patrón de relleno interno antes de emitir la cotización.
          </p>
        </div>
      </section>

      {/* =================================================================
          5. HERRAMIENTAS QUE IMPORTAN (Inspiración directa: "Tools that matter" de N3D)
          ================================================================= */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="max-w-3xl space-y-5">
          <div className="flex items-center gap-3">
            <div className="h-0.5 w-8 bg-[#ff6a1f]" />
            <span className="text-sm font-semibold text-zinc-200">
              Herramientas que importan
            </span>
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">
            Cada parte del sitio está aquí para{' '}
            <span className="text-[#ff6a1f]">resolver tu solicitud sin fricción</span>
          </h2>

          <p className="text-base leading-relaxed text-zinc-400">
            Cuando alguien necesita un repuesto o soporte funcional, el problema casi nunca es la impresora: es no saber cómo especificarlo. Conectamos el catálogo, el asistente de IA y el expediente del taller para que pases de una idea a una solicitud clara en minutos.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            to="/solicitar"
            className="flex flex-col justify-between rounded-2xl bg-[#1e1e22] p-6 transition hover:bg-[#242429] hover:-translate-y-0.5"
          >
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Asistente n8n</h3>
                <span className="rounded-md bg-white/[0.07] px-2 py-0.5 text-[11px] font-semibold text-zinc-300">
                  IA en vivo
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Describe tu problema en lenguaje normal y deja que el asistente proponga el polímero y complete el borrador sin pisar tus ediciones.
              </p>
            </div>
          </Link>

          <Link
            to="/catalogo"
            className="flex flex-col justify-between rounded-2xl bg-[#1e1e22] p-6 transition hover:bg-[#242429] hover:-translate-y-0.5"
          >
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Catálogo FDM</h3>
                <span className="rounded-md bg-white/[0.07] px-2 py-0.5 text-[11px] font-semibold text-zinc-300">
                  Bajo pedido
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Explora soportes, prensas roscadas y organizadores probados en planta, con fotos reales y materiales recomendados por pieza.
              </p>
            </div>
          </Link>

          <Link
            to="/herramientas"
            className="flex flex-col justify-between rounded-2xl bg-[#1e1e22] p-6 transition hover:bg-[#242429] hover:-translate-y-0.5"
          >
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Matriz de Polímeros</h3>
                <span className="rounded-md bg-white/[0.07] px-2 py-0.5 text-[11px] font-semibold text-zinc-300">
                  Técnico
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Compara cuándo elegir ASA frente a PETG, PLA, ABS o TPU según sol, temperatura, impacto o flexibilidad requerida.
              </p>
            </div>
          </Link>

          <Link
            to="/solicitar"
            className="flex flex-col justify-between rounded-2xl bg-[#1e1e22] p-6 transition hover:bg-[#242429] hover:-translate-y-0.5"
          >
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Expediente Taller</h3>
                <span className="rounded-md bg-white/[0.07] px-2 py-0.5 text-[11px] font-semibold text-zinc-300">
                  Supabase
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Cada solicitud se registra como PENDING_QUOTE para que el taller valide medidas y responda con una cotización real.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* =================================================================
          6. MODALIDADES DE PEDIDO (Inspiración directa: "Collect, or collect and sell" de N3D)
          ================================================================= */}
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-12 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-0.5 w-8 bg-[#ff6a1f]" />
              <span className="text-sm font-semibold text-zinc-200">Cómo pedir en Vértice</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Elige del catálogo, o <span className="text-[#ff6a1f]">pide a tu medida</span>
            </h2>
            <p className="text-base leading-relaxed text-zinc-400">
              No inventamos precios automáticos sin revisar la pieza. Selecciona la modalidad que mejor calce con tu necesidad y el taller te acompaña.
            </p>
          </div>

          <Link
            to="/solicitar"
            className="btn-3d-orange rounded-full px-6 py-2.5 text-xs font-bold"
          >
            Iniciar solicitud →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Columna 1 */}
          <div className="flex flex-col justify-between rounded-2xl bg-[#1e1e22] p-7">
            <div>
              <h3 className="text-xl font-bold text-white">Pieza de Catálogo</h3>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">Serie A–C</span>
                <span className="text-sm text-zinc-400">/ bajo pedido</span>
              </div>
              <p className="mt-3 text-sm text-zinc-400">
                Diseños ya validados en planta listos para fabricar en el material que elijas.
              </p>

              <div className="my-6 h-[1px] bg-white/10" />

              <ul className="space-y-3 text-sm text-zinc-300">
                <li className="flex items-start gap-2.5">
                  <span className="font-bold text-[#ff6a1f]">✓</span>
                  <span>Modelos probados de organización y taller</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-bold text-[#ff6a1f]">✓</span>
                  <span>Elección entre PLA, PETG, ASA, ABS o TPU</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-bold text-[#ff6a1f]">✓</span>
                  <span>Confirmación directa de color y cantidad</span>
                </li>
              </ul>
            </div>

            <Link
              to="/catalogo"
              className="btn-3d-dark mt-8 w-full rounded-full py-3 text-center text-xs font-bold"
            >
              Ver diseños del catálogo
            </Link>
          </div>

          {/* Columna 2 (Destacada) */}
          <div className="flex flex-col justify-between rounded-2xl bg-[#232122] p-7">
            <div>
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-xl font-bold text-white">Adaptación Asistida</h3>
                <span className="badge-3d-warm rounded-full px-3 py-1 text-xs font-bold">
                  Más usado
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">IA + Taller</span>
                <span className="text-sm text-zinc-400">/ medida ajustada</span>
              </div>
              <p className="mt-3 text-sm text-zinc-300">
                Para cuando un modelo del catálogo te sirve pero necesitas adaptarlo al grosor de tu mesa o equipo.
              </p>

              <div className="my-6 h-[1px] bg-white/10" />

              <ul className="space-y-3 text-sm text-zinc-200">
                <li className="flex items-start gap-2.5">
                  <span className="font-bold text-[#ff6a1f]">✓</span>
                  <span>Autocompletado de polímero sugerido por n8n</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-bold text-[#ff6a1f]">✓</span>
                  <span>Edición libre y opción de deshacer sugerencias IA</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-bold text-[#ff6a1f]">✓</span>
                  <span>Revisión de holguras y resistencia por el taller</span>
                </li>
              </ul>
            </div>

            <Link
              to="/solicitar"
              className="btn-3d-orange mt-8 w-full rounded-full py-3 text-center text-xs font-bold"
            >
              Abrir asistente de solicitud →
            </Link>
          </div>

          {/* Columna 3 */}
          <div className="flex flex-col justify-between rounded-2xl bg-[#1e1e22] p-7">
            <div>
              <h3 className="text-xl font-bold text-white">Pieza Funcional Nueva</h3>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">A Medida</span>
                <span className="text-sm text-zinc-400">/ PENDING_QUOTE</span>
              </div>
              <p className="mt-3 text-sm text-zinc-400">
                Para repuestos, abrazaderas o prototipos específicos de tu negocio o proyecto.
              </p>

              <div className="my-6 h-[1px] bg-white/10" />

              <ul className="space-y-3 text-sm text-zinc-300">
                <li className="flex items-start gap-2.5">
                  <span className="font-bold text-[#ff6a1f]">✓</span>
                  <span>Evaluación de esfuerzo térmico, UV o mecánico</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-bold text-[#ff6a1f]">✓</span>
                  <span>Definición de perímetros e infill antes de laminar</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-bold text-[#ff6a1f]">✓</span>
                  <span>Seguimiento transparente en el expediente del taller</span>
                </li>
              </ul>
            </div>

            <Link
              to="/solicitar"
              className="btn-3d-dark mt-8 w-full rounded-full py-3 text-center text-xs font-bold"
            >
              Describir mi proyecto
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

