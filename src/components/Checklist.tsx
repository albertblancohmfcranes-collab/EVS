import React from 'react';
import { Check } from 'lucide-react';
import { CHECKLIST_ITEMS, CHECKLIST_STOP_ALERT } from '../steps';
import { Alert } from './Alert';

interface ChecklistProps {
  checked: boolean[];
  onToggle: (index: number) => void;
  largeText?: boolean;
}

export const Checklist: React.FC<ChecklistProps> = ({
  checked,
  onToggle,
  largeText = false,
}) => {
  return (
    <div className="space-y-2.5">
      <h1 className="text-xl font-extrabold text-[#14263F] dark:text-white">
        Antes de empezar
      </h1>

      <div className="space-y-2" role="group" aria-label="Lista de comprobación previa">
        {CHECKLIST_ITEMS.map((item, index) => {
          const isChecked = !!checked[index];
          return (
            <button
              key={index}
              type="button"
              role="checkbox"
              aria-checked={isChecked}
              onClick={() => onToggle(index)}
              className={`flex min-h-[46px] w-full items-center gap-3 rounded-xl border px-3 py-2 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8710A] ${
                isChecked
                  ? 'border-[#E8710A] bg-[#FFF3DC]/60 dark:border-[#E8710A] dark:bg-[#3A2708]/50'
                  : 'border-slate-200 bg-[#F2F4F7] hover:bg-slate-200/70 dark:border-slate-700 dark:bg-slate-800/80 dark:hover:bg-slate-800'
              }`}
            >
              <span
                aria-hidden="true"
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                  isChecked
                    ? 'border-[#E8710A] bg-[#E8710A] text-white'
                    : 'border-[#5B6573] bg-white dark:border-slate-500 dark:bg-slate-900'
                }`}
              >
                {isChecked && <Check className="h-4 w-4 stroke-[3]" />}
              </span>
              <span
                className={`leading-snug text-[#14263F] dark:text-slate-100 ${
                  largeText ? 'text-base' : 'text-[14px]'
                }`}
              >
                {item}
              </span>
            </button>
          );
        })}
      </div>

      <Alert
        type={CHECKLIST_STOP_ALERT.type}
        text={CHECKLIST_STOP_ALERT.text}
        largeText={largeText}
      />

      <div className="grid grid-cols-2 gap-2">
        <section className="rounded-xl border border-slate-200 bg-[#F2F4F7] p-2.5 dark:border-slate-700 dark:bg-slate-800/80">
          <h2 className="text-xs font-bold text-[#14263F] dark:text-white">
            Versión de software
          </h2>
          <p className="mt-1 text-xs leading-snug text-[#14263F] dark:text-slate-200">
            Desde v81.81 hay EVS Classic y EVS 2021. Con esta guía se pone sola en <strong>EVS Classic</strong>.
          </p>
        </section>

        <section className="rounded-xl border border-slate-200 bg-[#F2F4F7] p-2.5 dark:border-slate-700 dark:bg-slate-800/80">
          <h2 className="text-xs font-bold text-[#14263F] dark:text-white">
            Velocidad de giro
          </h2>
          <p className="mt-1 text-xs leading-snug text-[#14263F] dark:text-slate-200">
            Durante la guía gira a velocidad baja (<strong>HDL</strong>) para evitar oscilaciones.
          </p>
        </section>
      </div>
    </div>
  );
};
