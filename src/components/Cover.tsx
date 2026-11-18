import React from 'react';
import { ArrowRight, Play, RotateCcw, Share2 } from 'lucide-react';
import { USEFUL_KEYS, type VehicleType } from '../steps';
import { PWAInstallButton } from './PWAInstallButton';

interface CoverProps {
  hasSavedProgress: boolean;
  savedStep: number;
  vehicleType: VehicleType | null;
  largeText: boolean;
  onContinue: () => void;
  onStartFresh: () => void;
  onOpenChecklist: () => void;
  onOpenOverview: () => void;
  onShare: () => void;
  supportsWebShare: boolean;
  whatsappShareUrl: string;
  shareFeedback: string | null;
}

const VEHICLE_LABELS: Record<VehicleType, string> = {
  '1': '1 · Front, Long',
  '2': '2 · Back, Long',
  '3': '3 · Short',
};

export const Cover: React.FC<CoverProps> = ({
  hasSavedProgress,
  savedStep,
  vehicleType,
  largeText,
  onContinue,
  onStartFresh,
  onOpenChecklist,
  onOpenOverview,
  onShare,
  supportsWebShare,
  whatsappShareUrl,
  shareFeedback,
}) => {
  return (
    <div className="flex h-full flex-col justify-between gap-3">
      {/* Header block */}
      <div className="space-y-1.5">
        <p className="text-[11px] font-bold tracking-widest text-[#E8710A]">
          GUÍA PASO A PASO
        </p>
        <h1 className="text-xl font-extrabold leading-tight tracking-tight text-[#14263F] dark:text-white sm:text-2xl [text-wrap:balance]">
          Configuración del sistema EVS
        </h1>
        <p className={`font-semibold text-[#5B6573] dark:text-slate-300 ${largeText ? 'text-base' : 'text-sm'}`}>
          Grúas HMF · Terminal CGW 5355
        </p>
        <p className={`leading-snug text-[#14263F] dark:text-slate-200 ${largeText ? 'text-base' : 'text-sm'}`}>
          Cada paso equivale a una pantalla del CGW 5355: mira la pantalla, haz lo indicado y pulsa ENTER.
        </p>
      </div>

      {/* Primary actions & saved progress */}
      <div className="space-y-2">
        {hasSavedProgress ? (
          <div className="space-y-2">
            <button
              type="button"
              onClick={onContinue}
              className="flex min-h-[48px] w-full items-center justify-between gap-3 rounded-xl bg-[#14263F] px-4 py-2.5 text-left text-white shadow-sm transition-colors hover:bg-[#1d3557] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8710A] dark:bg-[#E8710A] dark:hover:bg-[#cf6307]"
            >
              <div>
                <div className="text-base font-bold leading-tight">Continuar donde lo dejé</div>
                <div className="mt-0.5 text-xs font-medium text-slate-200 dark:text-orange-50 tabular-nums">
                  Paso {savedStep} de 12
                  {vehicleType ? ` · ${VEHICLE_LABELS[vehicleType]}` : ''}
                </div>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={onStartFresh}
              className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-[#14263F] transition-colors hover:bg-[#F2F4F7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14263F] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            >
              <RotateCcw className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Empezar de nuevo</span>
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onOpenChecklist}
            className="flex min-h-[50px] w-full items-center justify-center gap-2.5 rounded-xl bg-[#14263F] px-5 py-3 text-base font-bold text-white shadow-sm transition-colors hover:bg-[#1d3557] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8710A] dark:bg-[#E8710A] dark:hover:bg-[#cf6307]"
          >
            <Play className="h-5 w-5 shrink-0 fill-current" aria-hidden="true" />
            <span>Empezar procedimiento</span>
          </button>
        )}

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onOpenOverview}
            className="flex min-h-[44px] items-center justify-center rounded-xl border border-slate-200 bg-[#F2F4F7] px-3 py-2 text-sm font-bold text-[#14263F] transition-colors hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14263F] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            Ver los 12 pasos
          </button>

          {supportsWebShare ? (
            <button
              type="button"
              onClick={onShare}
              className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-[#F2F4F7] px-3 py-2 text-sm font-bold text-[#14263F] transition-colors hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14263F] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            >
              <Share2 className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Compartir</span>
            </button>
          ) : (
            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-[#F2F4F7] px-3 py-2 text-sm font-bold text-[#14263F] transition-colors hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14263F] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            >
              <Share2 className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Compartir</span>
            </a>
          )}
        </div>

        {shareFeedback && (
          <p className="text-center text-xs font-medium text-[#1F6FD1] dark:text-[#82B9FF]" role="status">
            {shareFeedback}
          </p>
        )}

        <PWAInstallButton className="w-full" />
      </div>

      {/* Useful keys card */}
      <section
        aria-labelledby="useful-keys-heading"
        className="rounded-xl border border-slate-200 bg-[#F2F4F7] p-3 dark:border-slate-700 dark:bg-slate-800/80"
      >
        <h2
          id="useful-keys-heading"
          className="mb-2 text-sm font-bold text-[#14263F] dark:text-white"
        >
          Teclas útiles
        </h2>
        <ul className="space-y-2">
          {USEFUL_KEYS.map((item) => (
            <li key={item.keyLabel} className="flex items-start gap-2.5">
              <span className="inline-flex min-h-[24px] shrink-0 items-center justify-center rounded border border-slate-300 bg-white px-2 py-0.5 font-mono text-[11px] font-bold text-[#14263F] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100">
                {item.keyLabel}
              </span>
              <span className="text-xs leading-snug text-[#14263F] dark:text-slate-200 sm:text-sm">
                {item.description}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Footer note */}
      <footer className="border-t border-slate-200 pt-2.5 text-[11px] leading-tight text-[#5B6573] dark:border-slate-800 dark:text-slate-400">
        Basado en el procedimiento del Departamento de Servicio Técnico (rev. 10-21)
      </footer>
    </div>
  );
};
