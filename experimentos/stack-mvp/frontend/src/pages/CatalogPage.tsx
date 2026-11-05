import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CATALOG_PRODUCTS, FDM_MATERIALS, type MaterialCode } from '../data/catalog';

const CATEGORIES = ['Todas', 'Taller & Setup', 'Organización', 'Soportes'] as const;

export function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('q') ?? '';
  const selectedCategory = searchParams.get('categoria') ?? 'Todas';
  const selectedMaterial = (searchParams.get('material') ?? 'Todos') as MaterialCode | 'Todos';

  const updateFilter = (key: 'q' | 'categoria' | 'material', value: string) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === 'Todas' || value === 'Todos') {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next, { replace: true });
  };

  const resetFilters = () => {
    setSearchParams({}, { replace: true });
  };

  const filteredItems = useMemo(() => {
    return CATALOG_PRODUCTS.filter((item) => {
      const matchesCategory = selectedCategory === 'Todas' || item.category === selectedCategory;
      const matchesMaterial =
        selectedMaterial === 'Todos' || item.materials.includes(selectedMaterial);
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.shortQuote.toLowerCase().includes(q);
      return matchesCategory && matchesMaterial && matchesSearch;
    });
  }, [search, selectedCategory, selectedMaterial]);

  const currentQueryString = searchParams.toString();

  return (
    <div className="min-h-screen bg-[#161618] pt-10 pb-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* ENCABEZADO EN ESPACIO ABIERTO */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-0.5 bg-[#ff6a1f]" />
              <span className="text-sm font-semibold text-zinc-200">
                Catálogo bajo pedido · Vértice CR
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#f5f5f7] tracking-tight mb-3">
              Diseños <span className="text-[#ff6a1f]">funcionales FDM</span>
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 max-w-[650px] leading-relaxed">
              Cada pieza se imprime bajo pedido en nuestro taller según el uso mecánico o ambiental que necesites. Los filtros se guardan en la URL para que puedas compartirlos o volver sin perder tu selección.
            </p>
          </div>

          <Link to="/solicitar" className="btn-3d-graphite text-xs shrink-0 self-start lg:self-end">
            ¿Necesitas una pieza a medida? Solicitar con IA →
          </Link>
        </div>

        {/* BARRA DE BÚSQUEDA Y FILTROS SINCRONIZADOS EN URL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center mb-10">
          <div className="lg:col-span-5">
            <input
              type="text"
              value={search}
              onChange={(e) => updateFilter('q', e.target.value)}
              placeholder="Buscar por nombre, código (#A-01) o aplicación..."
              className="well-3d w-full px-4 py-3 text-sm"
            />
          </div>

          <div className="lg:col-span-4 flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => updateFilter('categoria', cat)}
                className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'btn-3d-orange'
                    : 'bg-[#222228] text-zinc-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="lg:col-span-3 flex flex-wrap gap-1.5 lg:justify-end">
            <button
              type="button"
              onClick={() => updateFilter('material', 'Todos')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer ${
                selectedMaterial === 'Todos'
                  ? 'bg-[#2a2a30] text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Todos
            </button>
            {(Object.keys(FDM_MATERIALS) as MaterialCode[]).map((mat) => (
              <button
                key={mat}
                type="button"
                onClick={() => updateFilter('material', mat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer ${
                  selectedMaterial === mat
                    ? 'btn-3d-orange'
                    : 'bg-[#222228] text-zinc-400 hover:text-white'
                }`}
              >
                {mat}
              </button>
            ))}
          </div>
        </div>

        {/* GRILLA DE DISEÑOS */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-lg font-bold text-[#f5f5f7] mb-2">
              No encontramos diseños con ese filtro
            </p>
            <p className="text-sm text-zinc-400 mb-6">
              Prueba cambiando el polímero seleccionado o descríbenos tu pieza personalizada.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="btn-3d-orange rounded-full px-5 py-2.5 text-xs font-bold cursor-pointer"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Link
                key={item.id}
                to={`/catalogo/${item.id}`}
                state={{ fromCatalogQuery: currentQueryString }}
                className="group flex flex-col overflow-hidden rounded-2xl bg-[#1e1e22] transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="aspect-[4/3] w-full bg-[#111114] overflow-hidden relative">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="chip-3d">{item.category}</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white mb-2 group-hover:text-[#ff6a1f] transition-colors">
                      {item.code} - {item.name}
                    </h2>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-5">
                      {item.shortQuote}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                    <div className="flex flex-wrap gap-1.5">
                      {item.materials.map((mat) => (
                        <span key={mat} className="chip-3d">
                          {mat}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-[#ff6a1f]">
                      Ver pieza →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
