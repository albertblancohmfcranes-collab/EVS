import React from 'react';
import { SAVED_PARAMS } from '../steps';

interface ParamsScreenProps {
  largeText?: boolean;
}

export const ParamsScreen: React.FC<ParamsScreenProps> = ({ largeText = false }) => {
  return (
    <div className="space-y-3">
      <div>
        <h1 className="text-xl font-extrabold text-[#14263F] dark:text-white">
          Parámetros que se guardan
        </h1>
        <p className="mt-0.5 text-xs text-[#5B6573] dark:text-slate-300">
          Valores registrados en la unidad RCL.
        </p>
      </div>

      <div className="space-y-2">
        {SAVED_PARAMS.map((param) => (
          <article
            key={param.name}
            className="rounded-xl border border-slate-200 bg-[#F2F4F7] px-3 py-2 dark:border-slate-700 dark:bg-slate-800/80"
          >
            <div className="flex flex-wrap items-center justify-between gap-1.5">
              <h2 className="text-sm font-bold text-[#14263F] dark:text-white">
                {param.name}
              </h2>
              <span className="rounded bg-[#0E1A14] px-2 py-0.5 font-mono text-[11px] font-bold text-[#6CFF9A] tabular-nums">
                {param.route}
              </span>
            </div>
            <p
              className={`mt-1 leading-snug text-[#14263F] dark:text-slate-200 ${
                largeText ? 'text-sm' : 'text-xs'
              }`}
            >
              {param.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
};
