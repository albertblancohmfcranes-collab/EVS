import React from 'react';
import { Check } from 'lucide-react';
import { STEPS, type StepData, type VehicleType } from '../steps';
import { formatBold } from '../utils/formatBold';
import { ActionList } from './ActionList';
import { Alert } from './Alert';
import { ScreenBox } from './ScreenBox';
import { SideViewFold } from './SideViewFold';
import { TopView } from './TopView';

interface StepScreenProps {
  step: StepData;
  vehicleType: VehicleType | null;
  onSelectVehicleType: (type: VehicleType) => void;
  onJumpToStep: (n: number) => void;
  largeText?: boolean;
}

export const StepScreen: React.FC<StepScreenProps> = ({
  step,
  vehicleType,
  onSelectVehicleType,
  onJumpToStep,
  largeText = false,
}) => {
  const isOption2 = vehicleType === '2';

  return (
    <div className="space-y-2.5">
      {/* Progress bar (12 segments) + compact header */}
      <div className="space-y-1.5">
        <div
          className="grid grid-cols-12 gap-1"
          role="progressbar"
          aria-label={`Progreso: paso ${step.n} de 12`}
          aria-valuemin={1}
          aria-valuemax={12}
          aria-valuenow={step.n}
        >
          {STEPS.map((s) => {
            const isDoneOrCurrent = s.n <= step.n;
            const isDimmed = isOption2 && (s.n === 10 || s.n === 11);
            return (
              <button
                key={s.n}
                type="button"
                onClick={() => onJumpToStep(s.n)}
                aria-label={`Ir al paso ${s.n}: ${s.title}`}
                className={`h-2 rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14263F] ${
                  isDimmed
                    ? 'bg-slate-200 opacity-35 dark:bg-slate-700'
                    : isDoneOrCurrent
                    ? 'bg-[#E8710A]'
                    : 'bg-slate-200 dark:bg-slate-700'
                }`}
              />
            );
          })}
        </div>

        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className="text-[11px] font-extrabold tracking-wider text-[#E8710A] tabular-nums">
            PASO {step.n} DE 12
          </span>
          {step.badge && (
            <span className="text-[11px] font-bold text-[#5B6573] dark:text-slate-400">
              · {step.badge}
            </span>
          )}
        </div>

        <h1 className="text-[19px] font-extrabold leading-tight text-[#14263F] dark:text-white sm:text-xl [text-wrap:balance]">
          {step.title}
        </h1>
      </div>

      {/* Screen box */}
      <ScreenBox lines={step.screen} largeText={largeText} />

      {/* Crane schematic */}
      {step.diagram === 'fold' ? (
        <SideViewFold />
      ) : step.diagram !== null ? (
        <TopView diagram={step.diagram} stepKey={step.n} />
      ) : null}

      {/* Actions */}
      <ActionList actions={step.actions} largeText={largeText} />

      {/* Vehicle type selector buttons on Step 1 */}
      {step.n === 1 && step.options && (
        <section aria-label="Elegir tipo de vehículo" className="space-y-1.5">
          {step.options.map((opt) => {
            const selected = vehicleType === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                aria-pressed={selected}
                onClick={() => onSelectVehicleType(opt.key)}
                className={`flex min-h-[44px] w-full items-center gap-2.5 rounded-xl border-2 px-3 py-1.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8710A] ${
                  selected
                    ? 'border-[#E8710A] bg-[#FFF3DC] dark:border-[#E8710A] dark:bg-[#3A2708]/70'
                    : 'border-slate-200 bg-[#F2F4F7] hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/80 dark:hover:border-slate-600'
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-sm font-extrabold tabular-nums ${
                    selected
                      ? 'bg-[#E8710A] text-white'
                      : 'bg-[#14263F] text-white dark:bg-slate-700'
                  }`}
                >
                  {opt.key}
                </span>
                <span
                  className={`flex-1 font-semibold leading-tight text-[#14263F] dark:text-slate-100 ${
                    largeText ? 'text-[15px]' : 'text-[13.5px]'
                  }`}
                >
                  {opt.text}
                </span>
                {selected && (
                  <Check
                    className="h-4 w-4 shrink-0 text-[#E8710A]"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </section>
      )}

      {/* Optional note */}
      {step.note && (
        <p className="rounded-xl border border-slate-200 bg-[#F2F4F7] px-3 py-2 text-xs leading-snug text-[#5B6573] dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300">
          {formatBold(step.note)}
        </p>
      )}

      {/* Optional branch note (Step 9) */}
      {step.branch && (
        <div className="rounded-xl border border-slate-300 bg-[#F2F4F7] px-3 py-2 text-xs leading-snug text-[#14263F] dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100">
          {formatBold(step.branch)}
        </div>
      )}

      {/* Alerts */}
      {step.alerts && step.alerts.length > 0 && (
        <div className="space-y-2">
          {step.alerts.map((alert, idx) => (
            <Alert
              key={idx}
              type={alert.type}
              label={alert.label}
              text={alert.text}
              largeText={largeText}
            />
          ))}
        </div>
      )}
    </div>
  );
};
