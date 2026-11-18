import React from 'react';
import { STEPS, type VehicleType } from '../steps';

interface OverviewProps {
  currentStep: number;
  vehicleType: VehicleType | null;
  onSelectStep: (stepNumber: number) => void;
  largeText?: boolean;
}

export const Overview: React.FC<OverviewProps> = ({
  currentStep,
  vehicleType,
  onSelectStep,
  largeText = false,
}) => {
  return (
    <div className="space-y-2.5">
      <div>
        <h1 className="text-xl font-extrabold text-[#14263F] dark:text-white">
          Resumen de los 12 pasos
        </h1>
        {vehicleType === '2' && (
          <p className="mt-0.5 text-xs font-semibold text-[#9A4700] dark:text-[#FFB36B]">
            Opción 2 (Back, Long Vehicle): termina tras el paso 9.
          </p>
        )}
      </div>

      <ol className="grid grid-cols-2 gap-2">
        {STEPS.map((step) => {
          const isOnly13 = step.n === 10 || step.n === 11;
          const isDimmed = vehicleType === '2' && isOnly13;
          const isCurrent = step.n === currentStep;

          return (
            <li key={step.n}>
              <button
                type="button"
                onClick={() => onSelectStep(step.n)}
                className={`flex min-h-[60px] w-full items-start gap-2 rounded-xl border p-2.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8710A] ${
                  isCurrent
                    ? 'border-[#E8710A] bg-[#FFF3DC]/70 dark:border-[#E8710A] dark:bg-[#3A2708]/50'
                    : 'border-slate-200 bg-[#F2F4F7] hover:bg-slate-200/70 dark:border-slate-700 dark:bg-slate-800/80 dark:hover:bg-slate-800'
                } ${isDimmed ? 'opacity-45' : ''}`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-extrabold tabular-nums ${
                    isCurrent
                      ? 'bg-[#E8710A] text-white'
                      : 'bg-[#14263F] text-white dark:bg-slate-700'
                  }`}
                >
                  {step.n}
                </span>

                <div className="min-w-0 flex-1">
                  <div
                    className={`font-bold leading-tight text-[#14263F] dark:text-slate-100 ${
                      largeText ? 'text-[13px]' : 'text-xs'
                    }`}
                  >
                    {step.title}
                  </div>
                  {isOnly13 && (
                    <div className="mt-0.5 text-[10px] font-bold text-[#5B6573] dark:text-slate-400">
                      solo 1 y 3
                    </div>
                  )}
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
