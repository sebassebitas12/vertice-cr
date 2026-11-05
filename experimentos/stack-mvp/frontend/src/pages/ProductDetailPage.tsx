import { useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import {
  CATALOG_PRODUCTS,
  FDM_MATERIALS,
  APPROVED_FILAMENT_COLORS,
  type MaterialCode,
} from '../data/catalog';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const fromCatalogQuery = (location.state as { fromCatalogQuery?: string } | null)
    ?.fromCatalogQuery;
  const backToCatalogUrl = fromCatalogQuery ? `/catalogo?${fromCatalogQuery}` : '/catalogo';

  const product = CATALOG_PRODUCTS.find((item) => item.id === id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialCode>(
    product?.materials[0] ?? 'PETG'
  );
  const [selectedColorId, setSelectedColorId] = useState<string>(
    product?.approvedColors[0] ?? 'negro-carbon'
  );
  const [quantity, setQuantity] = useState<number>(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#161618] pt-20 pb-24">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold text-[#f5f5f7] mb-3">Diseño no encontrado</h1>
          <p className="text-sm text-zinc-400 mb-8">
            El modelo que buscas no existe o cambió de código en el catálogo.
          </p>
          <Link to={backToCatalogUrl} className="btn-3d-orange rounded-full px-6 py-3 text-sm font-bold">
            Volver a Diseños →
          </Link>
        </div>
      </div>
    );
  }

  const currentImage = product.images[activeImageIndex] ?? product.images[0];
  const materialDetails = FDM_MATERIALS[selectedMaterial];
  const availableColorOptions = APPROVED_FILAMENT_COLORS.filter((c) =>
    product.approvedColors.includes(c.id)
  );
  const activeColor =
    availableColorOptions.find((c) => c.id === selectedColorId) ?? availableColorOptions[0];

  const requestSearchParams = new URLSearchParams({
    pieza: product.id,
    material: selectedMaterial,
    color: activeColor?.id ?? 'negro-carbon',
    cantidad: String(quantity),
  });

  return (
    <div className="min-h-screen bg-[#161618] pt-10 pb-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* RUTA DE NAVEGACIÓN */}
        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-8">
          <Link to="/" className="hover:text-white transition-colors">
            Nosotros
          </Link>
          <span>/</span>
          <Link to={backToCatalogUrl} className="hover:text-white transition-colors">
            Diseños
          </Link>
          <span>/</span>
          <span className="text-[#ff6a1f] font-bold">
            #{product.code} {product.name}
          </span>
        </div>

        {/* LAYOUT DE DETALLE DE PIEZA: GALERÍA A LA IZQUIERDA + ESPECIFICACIONES EN ESPACIO ABIERTO A LA DERECHA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* COLUMNA IZQUIERDA: GALERÍA DE VISTAS */}
          <div className="lg:col-span-7">
            <div className="card-3d rounded-2xl overflow-hidden mb-4">
              <div className="aspect-[4/3] w-full bg-[#111114] overflow-hidden">
                <img
                  src={currentImage}
                  alt={`${product.name} vista ${activeImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((imgUrl, idx) => (
                  <button
                    key={imgUrl}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`card-3d rounded-xl overflow-hidden aspect-[4/3] cursor-pointer transition-transform ${
                      activeImageIndex === idx
                        ? 'ring-2 ring-[#ff6a1f] -translate-y-0.5'
                        : 'opacity-65 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${product.name} miniatura ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* ESPECIFICACIONES DE LAMINADO DE PLANTA */}
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/[0.08] pt-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  ALTURA DE CAPA
                </span>
                <p className="mt-1 text-base font-bold text-white">{product.layerHeight}</p>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  PAREDES FDM
                </span>
                <p className="mt-1 text-base font-bold text-white">{product.perimeters}</p>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  RELLENO INTERNO
                </span>
                <p className="mt-1 text-base font-bold text-white">{product.infillPattern}</p>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: INFORMACIÓN EN ESPACIO ABIERTO */}
          <div className="lg:col-span-5">
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="chip-3d-orange">#{product.code} · FDM</span>
              <span className="chip-3d">{product.category}</span>
              <span className="chip-3d">BAJO PEDIDO</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              {product.name}
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* LISTA DE CASOS DE USO */}
            <div className="border-l-2 border-[#ff6a1f] pl-4 py-1 mb-7 space-y-1.5">
              <p className="text-xs uppercase tracking-widest text-[#ff6a1f] font-bold">
                Especificaciones de uso
              </p>
              {product.useCases.map((useCase) => (
                <p key={useCase} className="text-sm text-zinc-200 leading-relaxed">
                  • {useCase}
                </p>
              ))}
            </div>

            {/* 1. SELECTOR INTERACTIVO DE POLÍMERO */}
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-300 mb-2.5">
                1. Polímero recomendado:
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {product.materials.map((mat) => (
                  <button
                    key={mat}
                    type="button"
                    onClick={() => setSelectedMaterial(mat)}
                    className={`px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all ${
                      selectedMaterial === mat
                        ? 'btn-3d-orange'
                        : 'bg-[#232329] text-white hover:bg-[#2a2a31]'
                    }`}
                  >
                    {mat}
                  </button>
                ))}
              </div>

              <div className="well-3d p-3.5">
                <p className="text-xs font-bold text-white mb-0.5">
                  {selectedMaterial} · {materialDetails.name}
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {materialDetails.ideal} — {materialDetails.strength}
                </p>
              </div>
            </div>

            {/* 2. SELECTOR DE COLOR DE FILAMENTO APROBADO + CANTIDAD */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mb-7">
              <div className="sm:col-span-8">
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-300 mb-2.5">
                  2. Color de filamento ({activeColor?.name}):
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableColorOptions.map((col) => {
                    const isSelected = col.id === activeColor?.id;
                    return (
                      <button
                        key={col.id}
                        type="button"
                        onClick={() => setSelectedColorId(col.id)}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition ${
                          isSelected
                            ? 'bg-[#2d2d35] text-white ring-2 ring-[#ff6a1f]'
                            : 'bg-[#1e1e23] text-zinc-400 hover:text-white'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{ backgroundColor: col.hex }}
                        />
                        <span>{col.name.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-300 mb-2.5">
                  3. Cantidad:
                </label>
                <input
                  type="number"
                  min={1}
                  max={500}
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, Math.min(500, Number(e.target.value) || 1)))
                  }
                  className="well-3d w-full px-3.5 py-2 text-sm font-bold"
                />
              </div>
            </div>

            {/* MODALIDAD DE FABRICACIÓN BAJO PEDIDO */}
            <div className="pt-5 border-t border-white/[0.08] mb-7 space-y-2 text-xs text-zinc-400">
              <div className="flex items-start gap-2.5">
                <span className="text-[#ff6a1f] font-bold">✓</span>
                <span>Fabricación bajo pedido (no asumimos stock inmediato).</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[#ff6a1f] font-bold">✓</span>
                <span>
                  Cotización verificada por el taller (<strong className="text-white">PENDING_QUOTE</strong>).
                </span>
              </div>
            </div>

            {/* BOTONES DE ACCIÓN */}
            <div className="flex flex-wrap gap-3">
              <Link
                to={`/solicitar?${requestSearchParams.toString()}`}
                className="btn-3d-orange rounded-full px-6 py-3.5 text-xs font-bold flex-1 text-center"
              >
                Solicitar {quantity} en {selectedMaterial} ({activeColor?.name.split(' ')[0]}) →
              </Link>
              <Link to={backToCatalogUrl} className="btn-3d-graphite text-xs">
                Volver a diseños
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
