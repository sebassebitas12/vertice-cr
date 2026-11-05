import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getAllRequests,
  workshopAskClarification,
  workshopEmitQuote,
  type QuoteRequestRecord,
  type RequestStatus,
} from '../lib/requestsStore';

export function WorkshopPage() {
  const [requests, setRequests] = useState<QuoteRequestRecord[]>(() => getAllRequests());
  const [filterStatus, setFilterStatus] = useState<RequestStatus | 'ALL'>('ALL');
  const [selectedId, setSelectedId] = useState<string>(requests[0]?.id ?? '');

  const filtered = requests.filter(
    (r) => filterStatus === 'ALL' || r.status === filterStatus
  );
  const activeReq =
    filtered.find((r) => r.id === selectedId) ?? filtered[0] ?? null;

  // Formulario de cotización del taller
  const [amountCRC, setAmountCRC] = useState<number>(9500);
  const [printHours, setPrintHours] = useState<number>(3.5);
  const [layerHeight, setLayerHeight] = useState<string>('0.20 mm');
  const [perimeters, setPerimeters] = useState<string>('4 perímetros · 35% Gyroid');
  const [workshopNotes, setWorkshopNotes] = useState<string>(
    'Geometría verificada en laminador. Orientación optimizada para esfuerzo mecánico.'
  );

  // Formulario de solicitud de aclaración
  const [questionText, setQuestionText] = useState<string>('');

  const handleEmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeReq) return;
    workshopEmitQuote(activeReq.id, {
      amountCRC,
      estimatedPrintHours: printHours,
      layerHeight,
      perimeters,
      workshopNotes,
    });
    setRequests(getAllRequests());
  };

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeReq || !questionText.trim()) return;
    workshopAskClarification(activeReq.id, questionText.trim());
    setQuestionText('');
    setRequests(getAllRequests());
  };

  const pendingCount = requests.filter((r) => r.status === 'PENDING_QUOTE').length;
  const needsInfoCount = requests.filter((r) => r.status === 'NEEDS_INFO').length;

  return (
    <div className="min-h-screen bg-[#161618] pt-10 pb-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* ENCABEZADO OPERATIVO DEL TALLER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-0.5 bg-[#ff6a1f]" />
              <span className="text-sm font-semibold text-zinc-200">
                Bandeja operativa del taller · Vértice CR
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-3">
              Revisión técnica y <span className="text-[#ff6a1f]">cotización FDM</span>
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 max-w-[660px] leading-relaxed">
              Revisa las solicitudes entrantes, pide aclaraciones de medidas cuando falten datos o emite una cotización versionada en colones (<strong className="text-white">₡</strong>) para que el cliente la apruebe en su expediente.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-end">
            <Link to="/mis-solicitudes" className="btn-3d-graphite text-xs">
              ← Ver como Cliente (Mis solicitudes)
            </Link>
          </div>
        </div>

        {/* MÉTRICAS REALES CALCULADAS DE LOS REGISTROS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="card-3d rounded-2xl p-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              PENDIENTES (PENDING_QUOTE)
            </span>
            <p className="text-2xl font-bold text-[#ff6a1f] mt-1">{pendingCount}</p>
          </div>
          <div className="card-3d rounded-2xl p-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              ESPERANDO ACLARACIÓN
            </span>
            <p className="text-2xl font-bold text-white mt-1">{needsInfoCount}</p>
          </div>
          <div className="card-3d rounded-2xl p-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              COTIZADAS (QUOTED)
            </span>
            <p className="text-2xl font-bold text-white mt-1">
              {requests.filter((r) => r.status === 'QUOTED').length}
            </p>
          </div>
          <div className="card-3d rounded-2xl p-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              APROBADAS (APPROVED)
            </span>
            <p className="text-2xl font-bold text-white mt-1">
              {requests.filter((r) => r.status === 'APPROVED').length}
            </p>
          </div>
        </div>

        {/* FILTROS RÁPIDOS */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(
            [
              { id: 'ALL', label: 'Todas' },
              { id: 'PENDING_QUOTE', label: 'Pendientes de cotizar' },
              { id: 'NEEDS_INFO', label: 'Con aclaración pendiente' },
              { id: 'QUOTED', label: 'Cotizadas' },
              { id: 'APPROVED', label: 'Aprobadas' },
            ] as const
          ).map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilterStatus(f.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition ${
                filterStatus === f.id
                  ? 'btn-3d-orange'
                  : 'bg-[#1e1e23] text-zinc-400 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* COLUMNA IZQUIERDA: BANDEJA DE ENTRADA */}
          <div className="lg:col-span-5 space-y-3">
            {filtered.map((req) => {
              const isSelected = activeReq?.id === req.id;
              return (
                <button
                  key={req.id}
                  type="button"
                  onClick={() => setSelectedId(req.id)}
                  className={`w-full text-left p-5 rounded-2xl transition cursor-pointer ${
                    isSelected
                      ? 'bg-[#242224] ring-2 ring-[#ff6a1f]'
                      : 'bg-[#1e1e22] hover:bg-[#242429]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-sm font-bold text-white">
                      #{req.code} · {req.clientName}
                    </span>
                    <span className="chip-3d">{req.status}</span>
                  </div>
                  <p className="text-xs font-bold text-[#ff6a1f] mb-1">
                    {req.quantity}x {req.material} ({req.colorName.split(' ')[0]})
                  </p>
                  <p className="text-xs text-zinc-400 line-clamp-2">{req.description}</p>
                </button>
              );
            })}
          </div>

          {/* COLUMNA DERECHA: ACCIÓN DEL TALLER SOBRE EL EXPEDIENTE */}
          {activeReq && (
            <div className="lg:col-span-7 space-y-7">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="chip-3d-orange">EXPEDIENTE #{activeReq.code}</span>
                  <span className="chip-3d">Estado: {activeReq.status}</span>
                  <span className="chip-3d">{activeReq.clientEmail}</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {activeReq.catalogProductTitle ?? 'Pieza funcional personalizada'}
                </h2>
                <p className="text-sm text-zinc-300 whitespace-pre-line leading-relaxed">
                  {activeReq.description}
                </p>
              </div>

              {/* FORMULARIO 1: EMITIR O ACTUALIZAR COTIZACIÓN FORMAL VERSIONADA */}
              <form
                onSubmit={handleEmitQuote}
                className="card-3d rounded-2xl p-6 sm:p-7 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">
                    1. Preparar y compartir cotización (Versión #v
                    {(activeReq.currentQuote?.version ?? 0) + 1})
                  </h3>
                  <span className="chip-3d-amber">Pasa a QUOTED</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                      Monto total en Colones (₡)
                    </label>
                    <input
                      type="number"
                      min={1000}
                      step={500}
                      required
                      value={amountCRC}
                      onChange={(e) => setAmountCRC(Number(e.target.value))}
                      className="well-3d w-full px-3.5 py-2.5 text-sm font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                      Horas estimadas de impresión
                    </label>
                    <input
                      type="number"
                      min={0.5}
                      step={0.5}
                      required
                      value={printHours}
                      onChange={(e) => setPrintHours(Number(e.target.value))}
                      className="well-3d w-full px-3.5 py-2.5 text-sm font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                      Altura de capa validada
                    </label>
                    <input
                      type="text"
                      required
                      value={layerHeight}
                      onChange={(e) => setLayerHeight(e.target.value)}
                      className="well-3d w-full px-3.5 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                      Perímetros y relleno (Infill)
                    </label>
                    <input
                      type="text"
                      required
                      value={perimeters}
                      onChange={(e) => setPerimeters(e.target.value)}
                      className="well-3d w-full px-3.5 py-2.5 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                    Notas técnicas del taller para el cliente
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={workshopNotes}
                    onChange={(e) => setWorkshopNotes(e.target.value)}
                    className="well-3d w-full p-3.5 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-3d-orange rounded-full px-6 py-3 text-xs font-bold cursor-pointer"
                >
                  Emitir cotización oficial #v
                  {(activeReq.currentQuote?.version ?? 0) + 1} (₡
                  {amountCRC.toLocaleString('es-CR')}) →
                </button>
              </form>

              {/* FORMULARIO 2: PEDIR ACLARACIÓN AL CLIENTE */}
              <form
                onSubmit={handleAskQuestion}
                className="card-3d rounded-2xl p-6 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">
                    2. ¿Faltan medidas o tolerancias? Pedir aclaración
                  </h3>
                  <span className="chip-3d">Pasa a NEEDS_INFO</span>
                </div>
                <textarea
                  rows={2}
                  required
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="Ej: ¿Podrías indicarme el diámetro del tubo donde va montado el soporte?"
                  className="well-3d w-full p-3.5 text-sm"
                />
                <button
                  type="submit"
                  className="btn-3d-graphite text-xs cursor-pointer"
                >
                  Enviar pregunta al expediente del cliente
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

