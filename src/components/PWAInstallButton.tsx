import React, { useState } from 'react';
import { Download, Share, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ className = '' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={() => void install()}
        className={`flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#E8710A] px-4 py-2.5 text-base font-bold text-white transition-colors hover:bg-[#cf6307] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8710A] whitespace-nowrap ${className}`}
      >
        <Download className="h-5 w-5 shrink-0" aria-hidden="true" />
        <span>Instalar en el móvil</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className={`flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[#14263F]/20 bg-[#F2F4F7] px-4 py-2.5 text-base font-semibold text-[#14263F] transition-colors hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 whitespace-nowrap ${className}`}
        >
          <Download className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span>Instalar en iPhone / iPad</span>
        </button>

        {showIOSGuide && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ios-install-title"
          >
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900 dark:border dark:border-slate-700">
              <div className="flex items-start justify-between gap-4">
                <h3 id="ios-install-title" className="text-lg font-bold text-[#14263F] dark:text-white">
                  Instalar en iPhone / iPad
                </h3>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  aria-label="Cerrar instrucciones de instalación"
                  className="flex h-11 w-11 items-center justify-center rounded-lg text-[#5B6573] hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ol className="mt-3 space-y-2.5 text-base text-[#14263F] dark:text-slate-200">
                <li className="flex items-center gap-2">
                  <span className="font-bold">1.</span>
                  <span>
                    Pulsa el botón <Share className="inline h-4 w-4 mx-0.5" aria-hidden="true" /> <strong>Compartir</strong> en la barra de Safari.
                  </span>
                </li>
                <li>
                  <span className="font-bold">2.</span> Desliza hacia abajo y pulsa <strong>Añadir a pantalla de inicio</strong>.
                </li>
              </ol>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 min-h-[48px] w-full rounded-xl bg-[#14263F] py-2.5 text-base font-bold text-white hover:bg-[#1e385c] dark:bg-slate-700 dark:hover:bg-slate-600"
              >
                Entendido
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
