import React from 'react';

interface DirectionsDiagramProps {
  largeText?: boolean;
}

export const DirectionsDiagram: React.FC<DirectionsDiagramProps> = ({ largeText = false }) => {
  return (
    <div className="space-y-3">
      <div>
        <h1 className="text-xl font-extrabold text-[#14263F] dark:text-white">
          Direcciones de la grúa
        </h1>
        <p className={`mt-0.5 text-[#5B6573] dark:text-slate-300 ${largeText ? 'text-base' : 'text-sm'}`}>
          Vista desde arriba. El vehículo avanza hacia arriba.
        </p>
      </div>

      <div
        className="rounded-xl border border-slate-200 bg-[#F2F4F7] p-2.5 dark:border-slate-700 dark:bg-slate-800/80"
        role="img"
        aria-label="Esquema de direcciones: Y1 hacia delante sobre la cabina, Y2 hacia atrás, XL lado izquierdo, XR lado derecho"
      >
        <svg viewBox="-145 -135 290 285" className="mx-auto h-[255px] w-full">
          <rect x={-36} y={-60} width={8} height={22} rx={2} fill="#333B47" />
          <rect x={28} y={-60} width={8} height={22} rx={2} fill="#333B47" />
          <rect x={-36} y={50} width={8} height={22} rx={2} fill="#333B47" />
          <rect x={28} y={50} width={8} height={22} rx={2} fill="#333B47" />

          <rect
            x={-28}
            y={-30}
            width={56}
            height={110}
            rx={4}
            fill="#C9D1DB"
            stroke="#14263F"
            strokeWidth={1.6}
          />

          <rect x={-28} y={-70} width={56} height={40} rx={6} fill="#14263F" />
          <rect x={-20} y={-65} width={40} height={7} rx={2} fill="#7FA6D6" />
          <text
            x={0}
            y={-41}
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="10"
            fontWeight="700"
            letterSpacing="0.8"
          >
            CABINA
          </text>

          <line
            x1={0}
            y1={-34}
            x2={0}
            y2={-102}
            stroke="#E8710A"
            strokeWidth={3.5}
            strokeLinecap="round"
          />
          <polygon points="0,-112 -6,-99 6,-99" fill="#E8710A" />
          <text x={0} y={-119} textAnchor="middle" fill="#E8710A" fontSize="13" fontWeight="800">
            Y1 delante
          </text>

          <line
            x1={0}
            y1={-2}
            x2={0}
            y2={112}
            stroke="#E8710A"
            strokeWidth={3.5}
            strokeLinecap="round"
          />
          <polygon points="0,122 -6,109 6,109" fill="#E8710A" />
          <text x={0} y={139} textAnchor="middle" fill="#E8710A" fontSize="13" fontWeight="800">
            Y2 detrás
          </text>

          <line
            x1={-18}
            y1={-18}
            x2={-86}
            y2={-18}
            stroke="#1F6FD1"
            strokeWidth={3.5}
            strokeLinecap="round"
          />
          <polygon points="-96,-18 -83,-24 -83,-12" fill="#1F6FD1" />
          <text x={-118} y={-21} textAnchor="middle" fill="#1F6FD1" fontSize="14" fontWeight="800">
            XL
          </text>
          <text x={-118} y={-6} textAnchor="middle" fill="#5B6573" fontSize="10.5" fontWeight="600">
            lado izq.
          </text>

          <line
            x1={18}
            y1={-18}
            x2={86}
            y2={-18}
            stroke="#1F6FD1"
            strokeWidth={3.5}
            strokeLinecap="round"
          />
          <polygon points="96,-18 83,-24 83,-12" fill="#1F6FD1" />
          <text x={118} y={-21} textAnchor="middle" fill="#1F6FD1" fontSize="14" fontWeight="800">
            XR
          </text>
          <text x={118} y={-6} textAnchor="middle" fill="#5B6573" fontSize="10.5" fontWeight="600">
            lado dcho.
          </text>

          <circle cx={0} cy={-18} r={19} fill="#E8710A" stroke="#FFFFFF" strokeWidth={2.2} />
          <text x={0} y={-14.5} textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="800">
            GRÚA
          </text>
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded-xl border border-slate-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-800/70">
          <div className="text-xs font-extrabold text-[#E8710A]">Y1</div>
          <div className="mt-0.5 text-xs font-medium text-[#14263F] dark:text-slate-100">
            Delante
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-800/70">
          <div className="text-xs font-extrabold text-[#E8710A]">Y2</div>
          <div className="mt-0.5 text-xs font-medium text-[#14263F] dark:text-slate-100">
            Detrás
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-800/70">
          <div className="text-xs font-extrabold text-[#1F6FD1]">XL / XR</div>
          <div className="mt-0.5 text-xs font-medium text-[#14263F] dark:text-slate-100">
            Laterales
          </div>
        </div>
      </div>
    </div>
  );
};
