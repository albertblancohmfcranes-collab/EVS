import React from 'react';
import { CheckCircle2, ListChecks, RotateCcw } from 'lucide-react';
import { FINISH_ACTIONS, FINISH_MAX_STABLE_LOAD_NOTE } from '../steps';
import { ActionList } from './ActionList';
import { Alert } from './Alert';

interface FinishScreenProps {
  endedViaOption2: boolean;
  onOpenParams: () => void;
  onRestart: () => void;
  largeText?: boolean;
}

export const FinishScreen: React.FC<FinishScreenProps> = ({
  endedViaOption2,
  onOpenParams,
  onRestart,
  largeText = false,
}) => {
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-[#14263F]/15 bg-[#14263F] p-3 text-white dark:border-slate-700 dark:bg-slate-800">
        <div className="flex items-start gap-2.5">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#6CFF9A]" aria-hidden="true" />
          <div>
            <p className="text-sm font-extrabold leading-snug">
              {endedViaOption2
                ? 'Procedimiento terminado: el CGW 5355 vuelve al menú 1.6.3'
                : 'Procedimiento terminado'}
            </p>
            {endedViaOption2 && (
              <p className="mt-0.5 text-xs text-slate-200">
                Opción 2 (Back, Long Vehicle): sin pasos 10, 11 ni 12.
              </p>
            )}
          </div>
        </div>
      </div>

      <h1 className="text-xl font-extrabold text-[#14263F] dark:text-white">
        Cuando termines
      </h1>

      <ActionList actions={FINISH_ACTIONS} heading="ACCIONES FINALES" largeText={largeText} />

      <Alert
        type={FINISH_MAX_STABLE_LOAD_NOTE.type}
        label={FINISH_MAX_STABLE_LOAD_NOTE.label}
        text={FINISH_MAX_STABLE_LOAD_NOTE.text}
        largeText={largeText}
      />

      <div className="grid grid-cols-2 gap-2 pt-1">
        <button
          type="button"
          onClick={onOpenParams}
          className="flex min-h-[46px] items-center justify-center gap-1.5 rounded-xl bg-[#14263F] px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-[#1e3759] dark:bg-[#E8710A] dark:hover:bg-[#cf6307]"
        >
          <ListChecks className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Ver parámetros</span>
        </button>

        <button
          type="button"
          onClick={onRestart}
          className="flex min-h-[46px] items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-[#14263F] transition-colors hover:bg-[#F2F4F7] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
        >
          <RotateCcw className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Empezar de nuevo</span>
        </button>
      </div>
    </div>
  );
};
