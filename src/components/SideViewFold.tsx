import React from 'react';

export const SideViewFold: React.FC = () => {
  return (
    <div
      className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-[#F2F4F7] p-2.5 dark:border-slate-700 dark:bg-slate-800/80"
      role="img"
      aria-label="Vista de perfil: grúa plegada en posición de transporte sobre el chasis"
    >
      <div className="flex-1">
        <div className="text-center text-[11px] font-bold text-[#14263F] dark:text-slate-200">
          Posición de transporte (vista de perfil)
        </div>
        <svg viewBox="10 34 220 74" className="mx-auto h-[74px] w-full">
          <line
            x1={16}
            y1={98}
            x2={224}
            y2={98}
            stroke="#94A3B8"
            strokeWidth={2}
            strokeLinecap="round"
          />
          <rect
            x={28}
            y={77}
            width={186}
            height={11}
            rx={2}
            fill="#C9D1DB"
            stroke="#14263F"
            strokeWidth={1.2}
          />
          <rect x={28} y={48} width={38} height={29} rx={4} fill="#14263F" />
          <rect x={33} y={54} width={18} height={11} rx={2} fill="#7FA6D6" />
          <circle cx={48} cy={90} r={8} fill="#333B47" stroke="#FFFFFF" strokeWidth={1.2} />
          <circle cx={166} cy={90} r={8} fill="#333B47" stroke="#FFFFFF" strokeWidth={1.2} />
          <circle cx={188} cy={90} r={8} fill="#333B47" stroke="#FFFFFF" strokeWidth={1.2} />
          <line
            x1={80}
            y1={77}
            x2={80}
            y2={58}
            stroke="#E8710A"
            strokeWidth={7}
            strokeLinecap="round"
          />
          <line
            x1={108}
            y1={72}
            x2={84}
            y2={76}
            stroke="#F3C79B"
            strokeWidth={5}
            strokeLinecap="round"
          />
          <polyline
            points="80,44 80,58 160,64 108,72"
            fill="none"
            stroke="#E8710A"
            strokeWidth={6}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx={80} cy={58} r={4.5} fill="#E8710A" stroke="#FFFFFF" strokeWidth={1.4} />
        </svg>
      </div>

      <div className="w-[38%] shrink-0">
        <ul className="space-y-1.5 text-xs font-bold leading-snug text-[#14263F] dark:text-slate-100">
          <li className="flex items-center gap-1.5">
            <span
              className="inline-block h-1.5 w-4 shrink-0 rounded-full bg-[#E8710A]"
              aria-hidden="true"
            />
            <span>Grúa plegada</span>
          </li>
          <li className="flex items-center gap-1.5">
            <span
              className="inline-block h-1.5 w-4 shrink-0 rounded-full bg-[#F3C79B]"
              aria-hidden="true"
            />
            <span>O en vertical</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
