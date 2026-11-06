import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FDM_MATERIALS, type MaterialCode } from '../data/catalog';

const ENVIRONMENT_CASES: {
  id: string;
  label: string;
  recommended: MaterialCode;
  explanation: string;
  parameters: string;
}[] = [
  {
    id: 'exterior-uv',
    label: 'Exterior al sol y lluvia',
    recommended: 'ASA',
    explanation:
      'El PLA se deforma con el calor solar y se degrada con rayos UV. ASA mantiene estabilidad dimensional y color a la intemperie.',
    parameters: '4 perímetros · 35% Gyroid · Cámara cerrada',
  },
  {
    id: 'mecanico-taller',
    label: 'Esfuerzo mecánico y humedad',
    recommended: 'PETG',
    explanation:
      'Excelente cohesión entre capas e impermeabilidad sin fragilidad ante impactos moderados en taller.',
    parameters: '3-4 perímetros · 30% Gyroid · 0.20 mm',
  },
  {
    id: 'impacto-vibracion',
    label: 'Amortiguación y vibración',
    recommended: 'TPU',
    explanation:
      'Elastómero flexible que absorbe impactos, protege superficies delicadas y sella uniones contra polvo.',
    parameters: '3 perímetros · 20-25% Infill elástico',
  },
  {
    id: 'temperatura-motor',
    label: 'Cercanía a motores o calor',
    recommended: 'ABS',
    explanation:
      'Alta temperatura de transición vítrea para carcasas técnicas o soportes expuestos a fuentes de calor.',
    parameters: '4 perímetros · 35% Infill · Recinto térmico',
  },
  {
    id: 'escritorio-interior',
    label: 'Organización interior y prototipos',
    recommended: 'PLA',
    explanation:
      'Máxima definición dimensional en bordes, aristas limpias y rigidez para uso en oficina o estudio.',
    parameters: '3 perímetros · 20% Grid/Gyroid · 0.20 mm',
  },
];

export function ToolsPage() {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(ENVIRONMENT_CASES[0].id);
  const currentCase =
    ENVIRONMENT_CASES.find((c) => c.id === selectedCaseId) ?? ENVIRONMENT_CASES[0];

  return (
    <div className="min-h-screen bg-[#161618] pt-10 pb-24">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* ENCABEZADO EN ESPACIO ABIERTO */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-7 h-[2px] bg-[#ff6a1f]" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#d4d4d8]">
              Herramientas de ingeniería · Vértice CR
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#f5f5f7] tracking-tight mb-4">
            Selector técnico de <span className="text-[#ff6a1f]">polímeros FDM</span>
          </h1>
          <p className="text-sm sm:text-base text-[#9e9ea8] max-w-[680px] leading-relaxed">
            Elegir el filamento equivocado hace que una pieza falle en semanas. Usa esta herramienta para comparar el comportamiento real de nuestros 5 polímeros de línea antes de cotizar.
          </p>
        </div>

        {/* SIMULADOR INTERACTIVO DE CONDICIÓN DE USO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          <div className="lg:col-span-5">
            <h2 className="text-xl font-bold text-[#f5f5f7] mb-2">
              1. ¿Dónde va a trabajar tu pieza?
            </h2>
            <p className="text-xs sm:text-sm text-[#9e9ea8] mb-5">
              Selecciona la condición principal para ver qué material recomendamos en el taller:
            </p>
            <div className="flex flex-col gap-2.5">
              {ENVIRONMENT_CASES.map((env) => (
                <button
                  key={env.id}
                  type="button"
                  onClick={() => setSelectedCaseId(env.id)}
                  className={`text-left px-5 py-3.5 rounded-2xl text-sm font-bold transition-all cursor-pointer flex items-center justify-between ${
                    selectedCaseId === env.id
                      ? 'bg-[#282830] border-l-4 border-[#ff6a1f] text-white'
                      : 'bg-[#1e1e22] border-l-4 border-transparent hover:bg-[#242429] text-zinc-300'
                  }`}
                >
                  <span>{env.label}</span>
                  <span
                    className={`text-xs font-extrabold ${
                      selectedCaseId === env.id ? 'text-[#ff6a1f]' : ''
                    }`}
                  >
                    {env.recommended}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="card-3d p-7 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="chip-3d-orange">RECOMENDACIÓN DE PLANTA</span>
                <span className="chip-3d">{currentCase.parameters}</span>
              </div>

              <h3 className="text-3xl font-bold text-[#f5f5f7] mb-2">
                {currentCase.recommended} — {FDM_MATERIALS[currentCase.recommended].name}
              </h3>

              <p className="text-sm sm:text-base text-[#9e9ea8] leading-relaxed mb-6">
                {currentCase.explanation}
              </p>

              <div className="flex flex-wrap gap-3 pt-4 border-t border-white/[0.06]">
                <Link
                  to={`/solicitar?material=${currentCase.recommended}`}
                  className="btn-3d-orange text-xs"
                >
                  Cotizar con este polímero →
                </Link>
                <Link to="/catalogo" className="btn-3d-graphite text-xs">
                  Ver diseños compatibles
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* MATRIZ COMPLETA DE LOS 5 MATERIALES AUTORIZADOS */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#f5f5f7] mb-6">
            Matriz comparativa de filamentos en taller
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {(Object.keys(FDM_MATERIALS) as MaterialCode[]).map((code) => {
              const info = FDM_MATERIALS[code];
              const isHighlighted = currentCase.recommended === code;
              return (
                <div
                  key={code}
                  className={`card-3d p-6 flex flex-col justify-between transition-transform ${
                    isHighlighted ? 'ring-2 ring-[#ff6a1f] -translate-y-1' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-extrabold text-[#ff6a1f]">{code}</span>
                      {isHighlighted && (
                        <span className="chip-3d-orange text-[10px]">IDEAL</span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-[#f5f5f7] mb-2">{info.name}</h3>
                    <p className="text-xs text-[#9e9ea8] leading-relaxed mb-4">
                      {info.ideal}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/[0.06]">
                    <p className="text-[11px] font-bold text-[#d4d4d8]">{info.strength}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

