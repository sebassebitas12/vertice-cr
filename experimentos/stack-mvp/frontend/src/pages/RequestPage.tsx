import { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import {
  CATALOG_PRODUCTS,
  FDM_MATERIALS,
  APPROVED_FILAMENT_COLORS,
  type MaterialCode,
} from '../data/catalog';
import {
  createInitialDraft,
  loadDraftFromStorage,
  saveDraftToStorage,
  clearDraftFromStorage,
  type RequestDraftState,
} from '../lib/requestDraftStore';
import {
  analyzeRequirementWithAi,
  type StructuredAiResponse,
} from '../lib/aiAssistantService';
import { createQuoteRequest, type QuoteRequestRecord } from '../lib/requestsStore';

export function RequestPage() {
  const [searchParams] = useSearchParams();
  const urlPieza = searchParams.get('pieza');
  const urlMaterial = searchParams.get('material') as MaterialCode | null;
  const urlColor = searchParams.get('color');
  const urlCantidad = searchParams.get('cantidad');

  const [draft, setDraft] = useState<RequestDraftState>(() => {
    const matched = CATALOG_PRODUCTS.find((p) => p.id === urlPieza);
    // Si viene con query params desde la ficha de producto, inicializar con esos valores
    if (urlPieza || urlMaterial || urlColor || urlCantidad) {
      return createInitialDraft({
        pieza: urlPieza,
        material: urlMaterial && urlMaterial in FDM_MATERIALS ? urlMaterial : matched?.materials[0] ?? 'PETG',
        color: urlColor ?? matched?.approvedColors[0] ?? 'negro-carbon',
        cantidad: urlCantidad ? Number(urlCantidad) : 1,
        defaultDescription: matched
          ? `Necesito fabricar el diseño #${matched.code} (${matched.name}). ${matched.useCases[0] ?? ''}`
          : '',
      });
    }
    return loadDraftFromStorage() ?? createInitialDraft();
  });

  const [aiResult, setAiResult] = useState<StructuredAiResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [createdRecord, setCreatedRecord] = useState<QuoteRequestRecord | null>(null);
  const idempotencyRef = useRef<string>(`idem-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`);

  // Guardar borrador automáticamente ante cambios
  useEffect(() => {
    if (!createdRecord) {
      saveDraftToStorage(draft);
    }
  }, [draft, createdRecord]);

  const selectedCatalogProduct = CATALOG_PRODUCTS.find(
    (p) => p.id === draft.selectedProductId
  );

  const handleSelectCatalogProduct = (productId: string) => {
    const prod = CATALOG_PRODUCTS.find((p) => p.id === productId);
    if (!prod) return;
    setDraft((prev) => ({
      ...prev,
      mode: 'catalogo',
      selectedProductId: prod.id,
      description:
        prev.description.trim().length > 0 && !prev.description.startsWith('Necesito fabricar el diseño #')
          ? prev.description
          : `Necesito fabricar el diseño #${prod.code} (${prod.name}). ${prod.useCases[0] ?? ''}`,
      material: prev.material.userEdited
        ? prev.material
        : {
            value: prod.materials[0],
            origin: 'Cliente',
            userEdited: false,
          },
      colorId: prod.approvedColors.includes(prev.colorId)
        ? prev.colorId
        : prod.approvedColors[0] ?? 'negro-carbon',
    }));
  };

  const handleAnalyzeWithAi = async () => {
    if (!draft.description.trim()) return;
    setIsAnalyzing(true);
    const res = await analyzeRequirementWithAi(draft.description);
    setAiResult(res);

    // Si el cliente ya editó manualmente el polímero y la IA sugiere otro distinto, registrar conflicto en vez de pisarlo
    setDraft((prev) => {
      const nextMat = { ...prev.material };
      if (
        prev.material.userEdited &&
        prev.material.value !== res.recommendedMaterial
      ) {
        nextMat.pendingSuggestion = res.recommendedMaterial;
      }

      const nextEnv = { ...prev.environment };
      if (
        prev.environment.userEdited &&
        prev.environment.value !== res.recommendedEnvironment
      ) {
        nextEnv.pendingSuggestion = res.recommendedEnvironment;
      }

      return {
        ...prev,
        material: nextMat,
        environment: nextEnv,
      };
    });

    setIsAnalyzing(false);
  };

  const handleApplyAiSuggestion = () => {
    if (!aiResult) return;
    setDraft((prev) => ({
      ...prev,
      material: {
        value: aiResult.recommendedMaterial,
        origin: 'IA aceptada',
        userEdited: false,
        previousValue: prev.material.value,
        pendingSuggestion: undefined,
      },
      environment: {
        value: aiResult.recommendedEnvironment,
        origin: 'IA aceptada',
        userEdited: false,
        previousValue: prev.environment.value,
        pendingSuggestion: undefined,
      },
    }));
  };

  const handleUndoAiSuggestion = () => {
    setDraft((prev) => ({
      ...prev,
      material: prev.material.previousValue
        ? {
            value: prev.material.previousValue,
            origin: 'Cliente',
            userEdited: true,
            previousValue: undefined,
            pendingSuggestion: undefined,
          }
        : prev.material,
      environment: prev.environment.previousValue
        ? {
            value: prev.environment.previousValue,
            origin: 'Cliente',
            userEdited: true,
            previousValue: undefined,
            pendingSuggestion: undefined,
          }
        : prev.environment,
    }));
  };

  const handleResetDraft = () => {
    clearDraftFromStorage();
    setAiResult(null);
    setDraft(createInitialDraft());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const colorObj =
      APPROVED_FILAMENT_COLORS.find((c) => c.id === draft.colorId) ??
      APPROVED_FILAMENT_COLORS[0];

    const record = createQuoteRequest({
      idempotencyKey: idempotencyRef.current,
      mode: draft.mode,
      catalogProductId:
        draft.mode === 'catalogo' ? selectedCatalogProduct?.id : undefined,
      catalogProductTitle:
        draft.mode === 'catalogo' && selectedCatalogProduct
          ? `#${selectedCatalogProduct.code} ${selectedCatalogProduct.name}`
          : undefined,
      description: draft.description,
      material: draft.material.value,
      materialOrigin: draft.material.origin,
      environment: draft.environment.value,
      colorId: colorObj.id,
      colorName: colorObj.name,
      quantity: draft.quantity,
      clientName: draft.clientName,
      clientEmail: draft.clientEmail,
    });

    clearDraftFromStorage();
    setCreatedRecord(record);
  };

  const activeColorObj =
    APPROVED_FILAMENT_COLORS.find((c) => c.id === draft.colorId) ??
    APPROVED_FILAMENT_COLORS[0];

  return (
    <div className="min-h-screen bg-[#161618] pt-10 pb-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* ENCABEZADO EN ESPACIO ABIERTO */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-0.5 bg-[#ff6a1f]" />
              <span className="text-sm font-semibold text-zinc-200">
                Asistente técnico Vértice
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-3">
              Cotizar pieza <span className="text-[#ff6a1f]">bajo pedido</span>
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 max-w-[680px] leading-relaxed">
              Elige un modelo probado del catálogo o describe una pieza funcional a medida. Nuestro asistente sugiere el polímero sin sobrescribir tus ediciones manuales y registra tu expediente como{' '}
              <strong className="text-white">PENDING_QUOTE</strong>.
            </p>
          </div>

          {!createdRecord && (
            <div className="flex items-center gap-3 text-xs text-zinc-400 self-start lg:self-end">
              <span>Borrador guardado automáticamente</span>
              <button
                type="button"
                onClick={handleResetDraft}
                className="text-zinc-300 underline hover:text-white cursor-pointer"
              >
                Limpiar borrador
              </button>
            </div>
          )}
        </div>

        {createdRecord ? (
          <div className="card-3d rounded-2xl p-8 sm:p-10 max-w-[760px]">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <span className="chip-3d-orange">ESTADO: {createdRecord.status}</span>
              <span className="chip-3d">Expediente #{createdRecord.code}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Solicitud registrada en el expediente del taller
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed mb-6">
              Guardamos tu solicitud por{' '}
              <strong className="text-white">
                {createdRecord.quantity} unidad{createdRecord.quantity > 1 ? 'es' : ''}
              </strong>{' '}
              en <strong className="text-white">{createdRecord.material}</strong> (
              {createdRecord.colorName}). El taller revisará las medidas y emitirá tu cotización formal en colones (<strong className="text-white">₡</strong>).
            </p>
            <div className="well-3d p-4 mb-6 text-xs text-zinc-400 space-y-1.5">
              {createdRecord.catalogProductTitle && (
                <p>
                  <strong className="text-white">Modelo base:</strong>{' '}
                  {createdRecord.catalogProductTitle}
                </p>
              )}
              <p>
                <strong className="text-white">Descripción:</strong>{' '}
                {createdRecord.description}
              </p>
              <p>
                <strong className="text-white">Polímero seleccionado:</strong>{' '}
                {createdRecord.material} (Origen: {createdRecord.materialOrigin})
              </p>
              <p>
                <strong className="text-white">Precio actual:</strong> Pendiente de cotización técnica (nunca ₡0).
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to={`/mis-solicitudes?id=${createdRecord.id}`}
                className="btn-3d-orange rounded-full px-6 py-3 text-xs font-bold"
              >
                Ver mi expediente en Mis solicitudes →
              </Link>
              <Link to="/taller" className="btn-3d-graphite text-xs">
                Abrir vista del Taller (Cotizar demo)
              </Link>
              <button
                type="button"
                onClick={() => {
                  idempotencyRef.current = `idem-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
                  setCreatedRecord(null);
                  setDraft(createInitialDraft());
                }}
                className="btn-3d-graphite text-xs cursor-pointer"
              >
                Nueva solicitud
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* COLUMNA IZQUIERDA: FORMULARIO PRINCIPAL */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
              {/* SELECTOR DE PUNTO DE PARTIDA */}
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2.5">
                  Punto de partida
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setDraft((prev) => ({ ...prev, mode: 'catalogo' }))
                    }
                    className={`p-4 rounded-2xl text-left transition cursor-pointer ${
                      draft.mode === 'catalogo'
                        ? 'bg-[#282830] border-l-4 border-[#ff6a1f] shadow-md'
                        : 'bg-[#1e1e22] border-l-4 border-transparent hover:bg-[#242429]'
                    }`}
                  >
                    <p className="text-sm font-bold text-white">
                      1 · Basado en diseño del catálogo
                    </p>
                    <p className="text-xs text-zinc-400 mt-1">
                      Elige uno de nuestros modelos (#A-01 a #C-02) y adáptalo a tu medida.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setDraft((prev) => ({ ...prev, mode: 'medida' }))
                    }
                    className={`p-4 rounded-2xl text-left transition cursor-pointer ${
                      draft.mode === 'medida'
                        ? 'bg-[#282830] border-l-4 border-[#ff6a1f] shadow-md'
                        : 'bg-[#1e1e22] border-l-4 border-transparent hover:bg-[#242429]'
                    }`}
                  >
                    <p className="text-sm font-bold text-white">
                      2 · Pieza funcional nueva a medida
                    </p>
                    <p className="text-xs text-zinc-400 mt-1">
                      Describe desde cero un soporte, repuesto o carcasa para tu proyecto.
                    </p>
                  </button>
                </div>
              </div>

              {/* SI ES MODO CATÁLOGO: SELECTOR DE PIEZA BASE */}
              {draft.mode === 'catalogo' && (
                <div className="card-3d rounded-2xl p-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                    Diseño del catálogo seleccionado
                  </label>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {selectedCatalogProduct && (
                      <img
                        src={selectedCatalogProduct.images[0]}
                        alt={selectedCatalogProduct.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 bg-[#111114]"
                      />
                    )}
                    <div className="flex-1">
                      <select
                        value={draft.selectedProductId}
                        onChange={(e) => handleSelectCatalogProduct(e.target.value)}
                        className="well-3d w-full px-3.5 py-2.5 text-sm font-bold border border-white/[0.08]"
                      >
                        {CATALOG_PRODUCTS.map((p) => (
                          <option
                            key={p.id}
                            value={p.id}
                            className="bg-[#161618] text-white"
                          >
                            #{p.code} — {p.name} ({p.category})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* 1. DESCRIPCIÓN */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-white">
                    1. Describe tu pieza, medidas o necesidad funcional
                  </label>
                  <span className="text-[11px] text-zinc-400">Origen: Cliente</span>
                </div>
                <textarea
                  rows={4}
                  required
                  value={draft.description}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="Ej: Necesito un soporte para fijar una cámara o sensor en un portón exterior expuesto al sol y la lluvia..."
                  className="well-3d w-full p-4 text-sm leading-relaxed border border-white/[0.08]"
                />
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleAnalyzeWithAi}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#222228] border border-[#ff6a1f]/30 hover:border-[#ff6a1f] text-xs font-bold text-white transition-all cursor-pointer shadow-sm hover:bg-[#282830]"
                  >
                    <Sparkles aria-hidden="true" className="w-3.5 h-3.5 text-[#ff6a1f]" />
                    {isAnalyzing
                      ? 'Consultando catálogo y polímeros...'
                      : 'Analizar uso y buscar coincidencias con el asistente técnico Vértice'}
                  </button>
                  <span className="text-xs text-zinc-400">
                    Prueba con "sol exterior", "prensa cable mesa" o "vibración"
                  </span>
                </div>
              </div>

              {/* AVISO DE CONFLICTO SI EL CLIENTE EDITÓ MANUALMENTE Y LA IA SUGIERE OTRO VALOR */}
              {draft.material.pendingSuggestion && (
                <div className="card-3d rounded-2xl p-4 border-l-2 border-[#ff6a1f] flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-zinc-300">
                    Elegiste manualmente <strong className="text-white">{draft.material.value}</strong>, pero el asistente sugiere{' '}
                    <strong className="text-[#ff6a1f]">
                      {draft.material.pendingSuggestion}
                    </strong>{' '}
                    por las condiciones descritas. No cambiamos tu selección sin permiso.
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleApplyAiSuggestion}
                      className="btn-3d-orange rounded-full px-3.5 py-1.5 text-xs font-bold cursor-pointer"
                    >
                      Cambiar a {draft.material.pendingSuggestion}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setDraft((prev) => ({
                          ...prev,
                          material: { ...prev.material, pendingSuggestion: undefined },
                        }))
                      }
                      className="btn-3d-graphite text-xs px-3 py-1.5 cursor-pointer"
                    >
                      Mantener {draft.material.value}
                    </button>
                  </div>
                </div>
              )}

              {/* 2. POLÍMERO Y ENTORNO */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-white">
                      2. Polímero FDM
                    </label>
                    <span
                      className={`text-[11px] font-bold ${
                        draft.material.origin === 'IA aceptada'
                          ? 'text-[#ff6a1f]'
                          : 'text-zinc-400'
                      }`}
                    >
                      Origen: {draft.material.origin}
                    </span>
                  </div>
                  <select
                    value={draft.material.value}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        material: {
                          value: e.target.value as MaterialCode,
                          origin: 'Cliente',
                          userEdited: true,
                          previousValue: prev.material.value,
                          pendingSuggestion: undefined,
                        },
                      }))
                    }
                    className="well-3d w-full px-4 py-3 text-sm border border-white/[0.08]"
                  >
                    {(Object.keys(FDM_MATERIALS) as MaterialCode[]).map((code) => (
                      <option key={code} value={code} className="bg-[#161618] text-white">
                        {code} — {FDM_MATERIALS[code].name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-white">
                      3. Entorno de trabajo
                    </label>
                    <span
                      className={`text-[11px] font-bold ${
                        draft.environment.origin === 'IA aceptada'
                          ? 'text-[#ff6a1f]'
                          : 'text-zinc-400'
                      }`}
                    >
                      Origen: {draft.environment.origin}
                    </span>
                  </div>
                  <select
                    value={draft.environment.value}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        environment: {
                          value: e.target.value,
                          origin: 'Cliente',
                          userEdited: true,
                          previousValue: prev.environment.value,
                          pendingSuggestion: undefined,
                        },
                      }))
                    }
                    className="well-3d w-full px-4 py-3 text-sm border border-white/[0.08]"
                  >
                    <option value="Interior / Taller" className="bg-[#161618]">
                      Interior / Taller mecánico
                    </option>
                    <option value="Exterior / Intemperie UV" className="bg-[#161618]">
                      Exterior / Exposición solar UV
                    </option>
                    <option value="Alta temperatura / Motor" className="bg-[#161618]">
                      Cercanía a calor o motor
                    </option>
                    <option value="Impacto / Vibración" className="bg-[#161618]">
                      Amortiguación y vibración
                    </option>
                  </select>
                </div>
              </div>

              {/* 4. COLOR DE FILAMENTO Y CANTIDAD */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
                <div className="sm:col-span-8">
                  <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                    4. Color aprobado en taller ({activeColorObj.name})
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {APPROVED_FILAMENT_COLORS.map((col) => {
                      const isSelected = col.id === draft.colorId;
                      return (
                        <button
                          key={col.id}
                          type="button"
                          onClick={() =>
                            setDraft((prev) => ({ ...prev, colorId: col.id }))
                          }
                          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold cursor-pointer transition ${
                            isSelected
                              ? 'bg-[#2d2d35] text-white ring-2 ring-[#ff6a1f]'
                              : 'bg-[#1e1e23] text-zinc-400 hover:text-white'
                          }`}
                        >
                          <span
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{ backgroundColor: col.hex }}
                          />
                          <span>{col.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                    5. Cantidad
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={500}
                    required
                    value={draft.quantity}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        quantity: Math.max(1, Number(e.target.value) || 1),
                      }))
                    }
                    className="well-3d w-full px-4 py-3 text-sm font-bold"
                  />
                </div>
              </div>

              {/* 6. DATOS DE CONTACTO */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                    Tu nombre o empresa
                  </label>
                  <input
                    type="text"
                    required
                    value={draft.clientName}
                    onChange={(e) =>
                      setDraft((prev) => ({ ...prev, clientName: e.target.value }))
                    }
                    placeholder="Sebastián / Taller"
                    className="well-3d w-full px-4 py-3 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                    Correo de contacto
                  </label>
                  <input
                    type="email"
                    required
                    value={draft.clientEmail}
                    onChange={(e) =>
                      setDraft((prev) => ({ ...prev, clientEmail: e.target.value }))
                    }
                    placeholder="cliente@correo.cr"
                    className="well-3d w-full px-4 py-3 text-sm"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-3d-orange rounded-full px-7 py-3.5 text-sm font-bold w-full sm:w-auto cursor-pointer"
                >
                  Confirmar y enviar al taller (PENDING_QUOTE) →
                </button>
              </div>
            </form>

            {/* COLUMNA DERECHA: PANEL DEL ASISTENTE IA Y COINCIDENCIAS DE CATÁLOGO */}
            <div className="lg:col-span-5 space-y-5">
              <div className="card-3d rounded-2xl p-6 sm:p-7">
                <div className="flex items-center justify-between gap-2 mb-5">
                  <span className="chip-3d-amber">SUGERENCIA DEL ASISTENTE</span>
                  <span className="chip-3d-orange">PENDING_QUOTE</span>
                </div>

                {aiResult ? (
                  <>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {aiResult.categoryLabel}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                      Polímero recomendado:{' '}
                      <strong className="text-[#ff6a1f]">
                        {aiResult.recommendedMaterial}
                      </strong>{' '}
                      ({aiResult.infillAndWalls}). {aiResult.rationale}
                    </p>

                    <div className="well-3d p-4 flex flex-wrap items-center justify-between gap-3 mb-5">
                      <span className="text-xs text-zinc-300">
                        ¿Aplicar {aiResult.recommendedMaterial} y entorno al formulario?
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleApplyAiSuggestion}
                          className="btn-3d-orange rounded-full text-xs font-bold px-4 py-2 cursor-pointer"
                        >
                          Aplicar
                        </button>
                        {draft.material.previousValue && (
                          <button
                            type="button"
                            onClick={handleUndoAiSuggestion}
                            className="btn-3d-graphite text-xs px-4 py-2 cursor-pointer"
                          >
                            Deshacer
                          </button>
                        )}
                      </div>
                    </div>

                    {/* PREGUNTAS SUGERIDAS CUANDO FALTAN MEDIDAS (NUNCA INVENTAR) */}
                    {aiResult.missingInfoQuestions.length > 0 && (
                      <div className="border-l-2 border-[#ff6a1f] pl-3.5 py-1 mb-5">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-[#ff6a1f] mb-1">
                          Datos opcionales que ayudan a cotizar más rápido:
                        </p>
                        {aiResult.missingInfoQuestions.map((q) => (
                          <p key={q} className="text-xs text-zinc-400 leading-relaxed">
                            • {q}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* COINCIDENCIAS EN EL CATÁLOGO REAL */}
                    {aiResult.matchedProducts.length > 0 && (
                      <div className="pt-4 border-t border-white/[0.07]">
                        <p className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-3">
                          Diseños del catálogo relacionados:
                        </p>
                        <div className="space-y-2.5">
                          {aiResult.matchedProducts.map(({ product, matchReason }) => (
                            <div
                              key={product.id}
                              className="well-3d p-3 flex items-center justify-between gap-3"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <img
                                  src={product.images[0]}
                                  alt={product.name}
                                  className="w-11 h-11 rounded-lg object-cover shrink-0"
                                />
                                <div className="min-w-0">
                                  <p className="text-xs font-bold text-white truncate">
                                    #{product.code} {product.name}
                                  </p>
                                  <p className="text-[11px] text-zinc-400 truncate">
                                    {matchReason}
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleSelectCatalogProduct(product.id)}
                                className="px-3 py-1.5 rounded-full text-[11px] font-bold bg-[#1e1e23] text-[#ff6a1f] hover:bg-[#2a2a32] shrink-0 cursor-pointer"
                              >
                                Usar base
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Asistente de pre-evaluación FDM
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-5">
                      Escribe tu necesidad a la izquierda y presiona{' '}
                      <strong className="text-white">
                        Analizar uso y buscar coincidencias con IA
                      </strong>
                      . El asistente buscará piezas compatibles en el catálogo y te propondrá el polímero ideal sin borrar tus cambios manuales.
                    </p>
                    <div className="well-3d p-4 text-xs text-zinc-400">
                      Ninguna sugerencia modifica tu formulario sin confirmación ni promete precios automáticos sin revisión del taller.
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
