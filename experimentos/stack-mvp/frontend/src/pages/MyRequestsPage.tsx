import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  getAllRequests,
  replyToWorkshopQuestion,
  approveQuoteVersion,
  type QuoteRequestRecord,
  type RequestStatus,
} from '../lib/requestsStore';

const STATUS_META: Record<
  RequestStatus,
  { label: string; badgeClass: string; nextAction: string }
> = {
  PENDING_QUOTE: {
    label: 'PENDING_QUOTE · En revisión',
    badgeClass: 'chip-3d-amber',
    nextAction: 'El taller está evaluando geometría, orientación de capa y tiempo de máquina.',
  },
  NEEDS_INFO: {
    label: 'NEEDS_INFO · Aclaración pendiente',
    badgeClass: 'chip-3d-orange',
    nextAction: 'El taller necesita confirmar un dato técnico para emitir tu cotización.',
  },
  QUOTED: {
    label: 'QUOTED · Cotización lista',
    badgeClass: 'chip-3d-orange',
    nextAction: 'Revisa el monto y parámetros propuestos y confirma si deseas aprobar la fabricación.',
  },
  APPROVED: {
    label: 'APPROVED · Aprobada para impresión',
    badgeClass: 'chip-3d',
    nextAction: 'Cotización aceptada. Tu pieza está programada en la cola de impresión FDM.',
  },
};

export function MyRequestsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [requests, setRequests] = useState<QuoteRequestRecord[]>(() => getAllRequests());
  const selectedIdParam = searchParams.get('id');

  const activeRequest =
    requests.find((r) => r.id === selectedIdParam) ?? requests[0] ?? null;

  const [clarificationText, setClarificationText] = useState('');

  const handleSelectRequest = (id: string) => {
    setSearchParams({ id }, { replace: true });
  };

  const handleSendClarification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeRequest || !clarificationText.trim()) return;
    replyToWorkshopQuestion(activeRequest.id, clarificationText.trim());
    setClarificationText('');
    setRequests(getAllRequests());
  };

  const handleApproveQuote = () => {
    if (!activeRequest?.currentQuote) return;
    approveQuoteVersion(activeRequest.id, activeRequest.currentQuote.version);
    setRequests(getAllRequests());
  };

  return (
    <div className="min-h-screen bg-[#161618] pt-10 pb-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* ENCABEZADO EN ESPACIO ABIERTO */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-0.5 bg-[#ff6a1f]" />
              <span className="text-sm font-semibold text-zinc-200">
                Expediente del cliente · Vértice CR
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-3">
              Mis <span className="text-[#ff6a1f]">solicitudes y cotizaciones</span>
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 max-w-[650px] leading-relaxed">
              Consulta el estado real de cada pieza, responde preguntas técnicas del taller y revisa las versiones de cotización antes de autorizar la impresión.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-end">
            <Link
              to="/solicitar"
              className="btn-3d-orange rounded-full px-5 py-2.5 text-xs font-bold"
            >
              + Nueva solicitud
            </Link>
          </div>
        </div>

        {requests.length === 0 ? (
          <div className="card-3d rounded-2xl p-10 text-center">
            <p className="text-lg font-bold text-white mb-2">
              Aún no tienes solicitudes registradas
            </p>
            <p className="text-sm text-zinc-400 mb-6">
              Explora nuestro catálogo o describe una pieza personalizada con ayuda del asistente.
            </p>
            <Link
              to="/solicitar"
              className="btn-3d-orange rounded-full px-6 py-3 text-xs font-bold"
            >
              Crear mi primera solicitud →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* COLUMNA IZQUIERDA (LISTA DE SOLICITUDES) */}
            <div className="lg:col-span-5 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Solicitudes activas ({requests.length})
              </p>
              {requests.map((req) => {
                const isSelected = activeRequest?.id === req.id;
                const meta = STATUS_META[req.status];
                return (
                  <button
                    key={req.id}
                    type="button"
                    onClick={() => handleSelectRequest(req.id)}
                    className={`w-full text-left p-5 rounded-2xl transition cursor-pointer ${
                      isSelected
                        ? 'bg-[#24242b] border-l-4 border-[#ff6a1f] shadow-lg'
                        : 'bg-[#1e1e22] border-l-4 border-transparent hover:bg-[#242429]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-sm font-bold text-white">#{req.code}</span>
                      <span className={meta.badgeClass}>{req.status}</span>
                    </div>
                    <p className="text-xs font-bold text-zinc-200 truncate mb-1">
                      {req.catalogProductTitle ?? 'Pieza funcional a medida'}
                    </p>
                    <p className="text-xs text-zinc-400 line-clamp-2 mb-3">
                      {req.description}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-white/[0.06]">
                      <span>
                        {req.quantity} u. · {req.material} ({req.colorName.split(' ')[0]})
                      </span>
                      <span>Actualizado: {req.updatedAt}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* COLUMNA DERECHA (DETALLE DEL EXPEDIENTE EN ESPACIO ABIERTO + OFERTA) */}
            {activeRequest && (
              <div className="lg:col-span-7 space-y-7">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-3">
                    <span className={STATUS_META[activeRequest.status].badgeClass}>
                      {STATUS_META[activeRequest.status].label}
                    </span>
                    <span className="chip-3d">Referencia #{activeRequest.code}</span>
                    <span className="chip-3d">
                      {activeRequest.material} · Origen: {activeRequest.materialOrigin}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {activeRequest.catalogProductTitle ?? 'Solicitud de pieza funcional a medida'}
                  </h2>

                  <p className="text-sm text-[#ff6a1f] font-semibold mb-4">
                    Siguiente paso: {STATUS_META[activeRequest.status].nextAction}
                  </p>

                  <p className="text-sm sm:text-base text-zinc-300 whitespace-pre-line leading-relaxed">
                    {activeRequest.description}
                  </p>
                </div>

                {/* RESUMEN TÉCNICO EN FILA ABIERTA */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-y border-white/[0.08] py-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                      POLÍMERO FDM
                    </span>
                    <p className="text-sm font-bold text-white mt-0.5">
                      {activeRequest.material}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                      COLOR ELEGIDO
                    </span>
                    <p className="text-sm font-bold text-white mt-0.5">
                      {activeRequest.colorName}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                      CANTIDAD
                    </span>
                    <p className="text-sm font-bold text-white mt-0.5">
                      {activeRequest.quantity} unidad(es)
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                      ENTORNO
                    </span>
                    <p className="text-sm font-bold text-white mt-0.5">
                      {activeRequest.environment}
                    </p>
                  </div>
                </div>

                {/* SI EL TALLER PIDIÓ ACLARACIÓN (NEEDS_INFO) */}
                {activeRequest.status === 'NEEDS_INFO' && activeRequest.workshopQuestion && (
                  <form
                    onSubmit={handleSendClarification}
                    className="card-3d rounded-2xl p-6 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="chip-3d-orange">PREGUNTA DEL TALLER</span>
                      <span className="text-xs text-zinc-400">Requiere tu respuesta</span>
                    </div>
                    <p className="text-sm text-white leading-relaxed">
                      &ldquo;{activeRequest.workshopQuestion}&rdquo;
                    </p>
                    <textarea
                      rows={3}
                      required
                      value={clarificationText}
                      onChange={(e) => setClarificationText(e.target.value)}
                      placeholder="Escribe aquí las medidas o detalles solicitados por el taller..."
                      className="well-3d w-full p-3.5 text-sm border border-white/[0.08]"
                    />
                    <button
                      type="submit"
                      className="btn-3d-orange rounded-full px-5 py-2.5 text-xs font-bold cursor-pointer"
                    >
                      Enviar respuesta al taller →
                    </button>
                  </form>
                )}

                {/* SI HAY COTIZACIÓN VIGENTE (QUOTED o APPROVED) */}
                {activeRequest.currentQuote && (
                  <div className="card-3d rounded-2xl p-6 sm:p-7 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="chip-3d-orange">
                        COTIZACIÓN OFICIAL · VERSIÓN #v{activeRequest.currentQuote.version}
                      </span>
                      <span className="text-xs text-zinc-400">
                        Vigencia: {activeRequest.currentQuote.validUntil}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-baseline justify-between gap-4 pt-1">
                      <div>
                        <span className="text-xs text-zinc-400 block">
                          Monto total verificado por el taller
                        </span>
                        <span className="text-3xl font-extrabold text-white">
                          ₡{activeRequest.currentQuote.amountCRC.toLocaleString('es-CR')}
                        </span>
                      </div>
                      <div className="text-right text-xs text-zinc-300">
                        <p>
                          Tiempo estimado de máquina:{' '}
                          <strong>{activeRequest.currentQuote.estimatedPrintHours} h</strong>
                        </p>
                        <p>
                          Laminado: {activeRequest.currentQuote.layerHeight} ·{' '}
                          {activeRequest.currentQuote.perimeters}
                        </p>
                      </div>
                    </div>

                    <div className="well-3d p-4 text-xs text-zinc-300 leading-relaxed">
                      <strong className="text-white block mb-1">
                        Notas técnicas de Vértice CR:
                      </strong>
                      {activeRequest.currentQuote.workshopNotes}
                    </div>

                    {activeRequest.status === 'QUOTED' ? (
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <button
                          type="button"
                          onClick={handleApproveQuote}
                          className="btn-3d-orange rounded-full px-6 py-3 text-xs font-bold cursor-pointer"
                        >
                          Aceptar cotización #v{activeRequest.currentQuote.version} (₡
                          {activeRequest.currentQuote.amountCRC.toLocaleString('es-CR')}) →
                        </button>
                      </div>
                    ) : (
                      <p className="text-xs font-bold text-[#ff6a1f]">
                        ✓ Cotización #v{activeRequest.currentQuote.version} aceptada por el cliente.
                      </p>
                    )}
                  </div>
                )}

                {/* HISTORIAL DE ACTIVIDAD DEL EXPEDIENTE */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                    Historial del expediente
                  </h3>
                  <div className="space-y-3 border-l border-white/10 pl-4">
                    {activeRequest.history.map((ev) => (
                      <div key={ev.id} className="text-xs">
                        <div className="flex items-center gap-2 text-zinc-400">
                          <span className="font-bold text-zinc-200">{ev.actor}</span>
                          <span>·</span>
                          <span>{ev.date}</span>
                        </div>
                        <p className="font-bold text-white mt-0.5">{ev.title}</p>
                        <p className="text-zinc-400 mt-0.5">{ev.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

