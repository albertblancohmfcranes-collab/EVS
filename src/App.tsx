import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Compass,
  CornerDownLeft,
  Info,
  ListChecks,
  Menu,
  Moon,
  RotateCcw,
  Share2,
  SlidersHorizontal,
  Sun,
  WifiOff,
  X,
} from 'lucide-react';
import { Checklist } from './components/Checklist';
import { Cover } from './components/Cover';
import { DirectionsDiagram } from './components/DirectionsDiagram';
import { FinishScreen } from './components/FinishScreen';
import { Overview } from './components/Overview';
import { ParamsScreen } from './components/ParamsScreen';
import { PWAInstallButton } from './components/PWAInstallButton';
import { StepScreen } from './components/StepScreen';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { CHECKLIST_ITEMS, STEPS, USEFUL_KEYS, type VehicleType } from './steps';

type ScreenView =
  | 'cover'
  | 'checklist'
  | 'directions'
  | 'overview'
  | 'step'
  | 'finish'
  | 'params'
  | 'keys';

interface PersistedState {
  currentStep: number;
  vehicleType: VehicleType | null;
  checkedItems: boolean[];
  darkMode: boolean;
  largeText: boolean;
  hasStarted: boolean;
}

const STORAGE_KEY = 'hmf_evs_cgw5355_v1';

const DEFAULT_STATE: PersistedState = {
  currentStep: 1,
  vehicleType: null,
  checkedItems: CHECKLIST_ITEMS.map(() => false),
  darkMode: false,
  largeText: false,
  hasStarted: false,
};

function loadPersistedState(): PersistedState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    return {
      currentStep:
        typeof parsed.currentStep === 'number' &&
        parsed.currentStep >= 1 &&
        parsed.currentStep <= 12
          ? parsed.currentStep
          : 1,
      vehicleType:
        parsed.vehicleType === '1' ||
        parsed.vehicleType === '2' ||
        parsed.vehicleType === '3'
          ? parsed.vehicleType
          : null,
      checkedItems:
        Array.isArray(parsed.checkedItems) &&
        parsed.checkedItems.length === CHECKLIST_ITEMS.length
          ? parsed.checkedItems.map(Boolean)
          : CHECKLIST_ITEMS.map(() => false),
      darkMode: Boolean(parsed.darkMode),
      largeText: Boolean(parsed.largeText),
      hasStarted: Boolean(parsed.hasStarted),
    };
  } catch {
    return DEFAULT_STATE;
  }
}

function savePersistedState(state: PersistedState): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage errors (private mode / quota)
  }
}

export default function App() {
  const [persisted, setPersisted] = useState<PersistedState>(() => loadPersistedState());
  const [view, setView] = useState<ScreenView>('cover');
  const [menuOpen, setMenuOpen] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  const isOnline = useOnlineStatus();
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (persisted.darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [persisted.darkMode]);

  useEffect(() => {
    savePersistedState(persisted);
  }, [persisted]);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [view, persisted.currentStep]);

  const hasSavedProgress =
    persisted.hasStarted || persisted.currentStep > 1 || persisted.vehicleType !== null;

  const goToView = useCallback((nextView: ScreenView) => {
    setView(nextView);
    setMenuOpen(false);
  }, []);

  const goToStep = useCallback((stepNumber: number) => {
    const clamped = Math.max(1, Math.min(12, stepNumber));
    setPersisted((prev) => ({
      ...prev,
      currentStep: clamped,
      hasStarted: true,
    }));
    setView('step');
    setMenuOpen(false);
  }, []);

  const handleSelectVehicleType = useCallback((type: VehicleType) => {
    setPersisted((prev) => ({
      ...prev,
      vehicleType: type,
      hasStarted: true,
    }));
  }, []);

  const handleToggleChecklist = useCallback((index: number) => {
    setPersisted((prev) => {
      const next = [...prev.checkedItems];
      next[index] = !next[index];
      return { ...prev, checkedItems: next };
    });
  }, []);

  const handleRestart = useCallback(() => {
    setPersisted((prev) => ({
      ...DEFAULT_STATE,
      darkMode: prev.darkMode,
      largeText: prev.largeText,
    }));
    setView('checklist');
    setMenuOpen(false);
  }, []);

  const handleNext = useCallback(() => {
    if (view === 'cover') {
      setView('checklist');
      return;
    }
    if (view === 'checklist') {
      setView('directions');
      return;
    }
    if (view === 'directions') {
      setView('overview');
      return;
    }
    if (view === 'overview') {
      goToStep(1);
      return;
    }
    if (view === 'step') {
      if (persisted.currentStep === 9 && persisted.vehicleType === '2') {
        setView('finish');
        return;
      }
      if (persisted.currentStep < 12) {
        goToStep(persisted.currentStep + 1);
      } else {
        setView('finish');
      }
      return;
    }
    if (view === 'finish') {
      setView('params');
    }
  }, [view, persisted.currentStep, persisted.vehicleType, goToStep]);

  const handlePrev = useCallback(() => {
    if (view === 'checklist') {
      setView('cover');
      return;
    }
    if (view === 'directions') {
      setView('checklist');
      return;
    }
    if (view === 'overview') {
      setView('directions');
      return;
    }
    if (view === 'step') {
      if (persisted.currentStep > 1) {
        goToStep(persisted.currentStep - 1);
      } else {
        setView('overview');
      }
      return;
    }
    if (view === 'finish') {
      if (persisted.vehicleType === '2') {
        goToStep(9);
      } else {
        goToStep(12);
      }
      return;
    }
    if (view === 'params') {
      setView('finish');
      return;
    }
    if (view === 'keys') {
      setView('cover');
    }
  }, [view, persisted.currentStep, persisted.vehicleType, goToStep]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (menuOpen) {
        if (e.key === 'Escape') setMenuOpen(false);
        return;
      }
      if (view === 'cover') return;
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen, view, handleNext, handlePrev]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (menuOpen) return;
    const touch = e.touches[0];
    if (!touch) return;
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (menuOpen || !touchStartRef.current) return;
    const touch = e.changedTouches[0];
    if (!touch) return;
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (Math.abs(dx) > 64 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const appUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Guía EVS HMF (CGW 5355): ${appUrl}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  const supportsWebShare =
    typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  const handleWebShare = async () => {
    if (!supportsWebShare) return;
    try {
      await navigator.share({
        title: 'Guía EVS HMF — CGW 5355',
        text: 'Procedimiento paso a paso para configurar el sistema EVS con el CGW 5355.',
        url: appUrl,
      });
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setShareFeedback('Usa el menú para compartir por WhatsApp.');
      }
    }
  };

  const currentStepData =
    STEPS.find((s) => s.n === persisted.currentStep) ?? STEPS[0];

  const showBottomBar = view !== 'cover';
  const canGoNext = view !== 'params' && view !== 'keys';
  const isOption2Step9 =
    view === 'step' && currentStepData.n === 9 && persisted.vehicleType === '2';
  const isStepEnter = view === 'step' && currentStepData.enter;
  const isStepFinal = view === 'step' && Boolean(currentStepData.finalLabel);

  return (
    <div className="min-h-[100dvh] bg-slate-100 text-[#14263F] transition-colors dark:bg-slate-950 dark:text-slate-100">
      {/* Centered ~480px single-viewport column */}
      <div className="mx-auto flex h-[100dvh] w-full max-w-[480px] flex-col overflow-hidden bg-white shadow-sm dark:bg-slate-900">
        {/* Compact header (46px) */}
        <header className="flex h-[46px] shrink-0 items-center justify-between border-b border-slate-200 bg-[#14263F] px-3.5 text-white dark:border-slate-800">
          <button
            type="button"
            onClick={() => goToView('cover')}
            className="flex min-h-[40px] items-center gap-2 text-left text-[15px] font-bold tracking-tight whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8710A]"
          >
            <span className="inline-block h-3 w-1.5 rounded-xs bg-[#E8710A]" aria-hidden="true" />
            <span>Guía EVS HMF</span>
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú de navegación y ajustes"
            aria-expanded={menuOpen}
            className="flex min-h-[40px] min-w-[44px] items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8710A]"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        {/* Non-intrusive offline notice */}
        {!isOnline && (
          <div
            role="status"
            className="flex shrink-0 items-center justify-center gap-1.5 border-b border-amber-200 bg-[#FFF3DC] px-3 py-1 text-[11px] font-bold text-[#9A4700] dark:border-amber-900 dark:bg-[#3A2708] dark:text-[#FFB36B]"
          >
            <WifiOff className="h-3 w-3 shrink-0" aria-hidden="true" />
            <span>Sin conexión · Modo sin cobertura activo</span>
          </div>
        )}

        {/* Main viewport-fitted content */}
        <main
          ref={mainRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex-1 overflow-y-auto px-3.5 py-2.5"
        >
          {view === 'cover' && (
            <Cover
              hasSavedProgress={hasSavedProgress}
              savedStep={persisted.currentStep}
              vehicleType={persisted.vehicleType}
              largeText={persisted.largeText}
              onContinue={() => goToView('step')}
              onStartFresh={handleRestart}
              onOpenChecklist={() => goToView('checklist')}
              onOpenOverview={() => goToView('overview')}
              onShare={() => void handleWebShare()}
              supportsWebShare={supportsWebShare}
              whatsappShareUrl={whatsappShareUrl}
              shareFeedback={shareFeedback}
            />
          )}

          {view === 'checklist' && (
            <Checklist
              checked={persisted.checkedItems}
              onToggle={handleToggleChecklist}
              largeText={persisted.largeText}
            />
          )}

          {view === 'directions' && (
            <DirectionsDiagram largeText={persisted.largeText} />
          )}

          {view === 'overview' && (
            <Overview
              currentStep={persisted.currentStep}
              vehicleType={persisted.vehicleType}
              onSelectStep={goToStep}
              largeText={persisted.largeText}
            />
          )}

          {view === 'step' && (
            <StepScreen
              step={currentStepData}
              vehicleType={persisted.vehicleType}
              onSelectVehicleType={handleSelectVehicleType}
              onJumpToStep={goToStep}
              largeText={persisted.largeText}
            />
          )}

          {view === 'finish' && (
            <FinishScreen
              endedViaOption2={persisted.vehicleType === '2'}
              onOpenParams={() => goToView('params')}
              onRestart={handleRestart}
              largeText={persisted.largeText}
            />
          )}

          {view === 'params' && <ParamsScreen largeText={persisted.largeText} />}

          {view === 'keys' && (
            <div className="space-y-3">
              <div>
                <h1 className="text-xl font-extrabold text-[#14263F] dark:text-white">
                  Teclas útiles del CGW 5355
                </h1>
                <p className="mt-0.5 text-sm text-[#5B6573] dark:text-slate-300">
                  Atajos disponibles durante la configuración.
                </p>
              </div>
              <ul className="space-y-2.5">
                {USEFUL_KEYS.map((item) => (
                  <li
                    key={item.keyLabel}
                    className="rounded-xl border border-slate-200 bg-[#F2F4F7] p-3.5 dark:border-slate-700 dark:bg-slate-800/80"
                  >
                    <span className="inline-flex min-h-[28px] items-center justify-center rounded-md border border-slate-300 bg-white px-2.5 py-0.5 font-mono text-xs font-bold text-[#14263F] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100">
                      {item.keyLabel}
                    </span>
                    <p
                      className={`mt-2 leading-snug text-[#14263F] dark:text-slate-200 ${
                        persisted.largeText ? 'text-base' : 'text-sm'
                      }`}
                    >
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </main>

        {/* Fixed bottom Anterior / Siguiente + ENTER navigation (56px) */}
        {showBottomBar && (
          <nav
            aria-label="Navegación entre pantallas"
            className="flex shrink-0 items-center gap-2 border-t border-slate-200 bg-white px-3.5 py-1.5 dark:border-slate-800 dark:bg-slate-900"
          >
            <button
              type="button"
              onClick={handlePrev}
              className="flex min-h-[46px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-[#F2F4F7] px-3 py-2 text-sm font-bold text-[#14263F] transition-colors hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14263F] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Anterior</span>
            </button>

            {canGoNext ? (
              <button
                type="button"
                onClick={handleNext}
                className={`flex min-h-[46px] flex-[1.45] items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  isStepFinal
                    ? 'bg-[#E8710A] hover:bg-[#cf6307] focus-visible:outline-[#14263F]'
                    : 'bg-[#14263F] hover:bg-[#1e3759] focus-visible:outline-[#E8710A] dark:bg-[#E8710A] dark:hover:bg-[#cf6307]'
                }`}
              >
                {isStepEnter && (
                  <CornerDownLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
                )}
                {isStepFinal && (
                  <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
                )}
                <span className="truncate">
                  {view === 'overview'
                    ? 'Ir al paso 1'
                    : view === 'finish'
                    ? 'Ver parámetros'
                    : isOption2Step9
                    ? 'Hecho, ENTER (fin)'
                    : isStepEnter
                    ? 'Hecho, pulso ENTER'
                    : isStepFinal
                    ? 'Finalizar'
                    : 'Siguiente'}
                </span>
                {!isStepEnter && !isStepFinal && (
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => goToView('cover')}
                className="flex min-h-[46px] flex-[1.45] items-center justify-center gap-1.5 rounded-xl bg-[#14263F] px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-[#1e3759] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8710A] dark:bg-slate-700 dark:hover:bg-slate-600"
              >
                <span>Ir a la portada</span>
              </button>
            )}
          </nav>
        )}
      </div>

      {/* Navigation & settings drawer ("☰") */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/55 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de la guía"
        >
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setMenuOpen(false)}
            className="flex-1 cursor-default"
          />
          <div className="flex h-full w-full max-w-[340px] flex-col overflow-y-auto bg-white p-5 shadow-2xl dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3.5 dark:border-slate-800">
              <span className="text-lg font-extrabold text-[#14263F] dark:text-white">
                Menú
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Cerrar menú"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-[#5B6573] hover:bg-[#F2F4F7] dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav aria-label="Accesos directos" className="mt-4 space-y-1.5">
              <button
                type="button"
                onClick={() => goToView('cover')}
                className={`flex min-h-[48px] w-full items-center gap-3 rounded-xl px-3.5 text-left text-base font-bold transition-colors ${
                  view === 'cover'
                    ? 'bg-[#FFF3DC] text-[#9A4700] dark:bg-[#3A2708] dark:text-[#FFB36B]'
                    : 'text-[#14263F] hover:bg-[#F2F4F7] dark:text-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Info className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span>Portada</span>
              </button>

              <button
                type="button"
                onClick={() => goToView('checklist')}
                className={`flex min-h-[48px] w-full items-center gap-3 rounded-xl px-3.5 text-left text-base font-bold transition-colors ${
                  view === 'checklist'
                    ? 'bg-[#FFF3DC] text-[#9A4700] dark:bg-[#3A2708] dark:text-[#FFB36B]'
                    : 'text-[#14263F] hover:bg-[#F2F4F7] dark:text-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <ListChecks className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span>Antes de empezar</span>
              </button>

              <button
                type="button"
                onClick={() => goToView('directions')}
                className={`flex min-h-[48px] w-full items-center gap-3 rounded-xl px-3.5 text-left text-base font-bold transition-colors ${
                  view === 'directions'
                    ? 'bg-[#FFF3DC] text-[#9A4700] dark:bg-[#3A2708] dark:text-[#FFB36B]'
                    : 'text-[#14263F] hover:bg-[#F2F4F7] dark:text-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Compass className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span>Direcciones</span>
              </button>

              <button
                type="button"
                onClick={() => goToView('overview')}
                className={`flex min-h-[48px] w-full items-center gap-3 rounded-xl px-3.5 text-left text-base font-bold transition-colors ${
                  view === 'overview'
                    ? 'bg-[#FFF3DC] text-[#9A4700] dark:bg-[#3A2708] dark:text-[#FFB36B]'
                    : 'text-[#14263F] hover:bg-[#F2F4F7] dark:text-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Menu className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span>Resumen</span>
              </button>

              <button
                type="button"
                onClick={() => goToView('params')}
                className={`flex min-h-[48px] w-full items-center gap-3 rounded-xl px-3.5 text-left text-base font-bold transition-colors ${
                  view === 'params'
                    ? 'bg-[#FFF3DC] text-[#9A4700] dark:bg-[#3A2708] dark:text-[#FFB36B]'
                    : 'text-[#14263F] hover:bg-[#F2F4F7] dark:text-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <SlidersHorizontal className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span>Parámetros</span>
              </button>

              <button
                type="button"
                onClick={() => goToView('keys')}
                className={`flex min-h-[48px] w-full items-center gap-3 rounded-xl px-3.5 text-left text-base font-bold transition-colors ${
                  view === 'keys'
                    ? 'bg-[#FFF3DC] text-[#9A4700] dark:bg-[#3A2708] dark:text-[#FFB36B]'
                    : 'text-[#14263F] hover:bg-[#F2F4F7] dark:text-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border border-current font-mono text-[10px] font-bold">
                  ESC
                </span>
                <span>Teclas útiles</span>
              </button>
            </nav>

            <div className="mt-6 space-y-4 border-t border-slate-200 pt-4 dark:border-slate-800">
              <div>
                <div className="mb-2 text-xs font-bold tracking-wider text-[#5B6573] dark:text-slate-400">
                  ASPECTO
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={persisted.darkMode}
                  onClick={() =>
                    setPersisted((prev) => ({ ...prev, darkMode: !prev.darkMode }))
                  }
                  className="flex min-h-[48px] w-full items-center justify-between rounded-xl border border-slate-200 bg-[#F2F4F7] px-3.5 py-2.5 text-base font-bold text-[#14263F] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                >
                  <span className="flex items-center gap-2.5">
                    {persisted.darkMode ? (
                      <Moon className="h-5 w-5 text-[#E8710A]" aria-hidden="true" />
                    ) : (
                      <Sun className="h-5 w-5 text-[#E8710A]" aria-hidden="true" />
                    )}
                    <span>Modo oscuro</span>
                  </span>
                  <span className="text-sm font-semibold text-[#5B6573] dark:text-slate-300">
                    {persisted.darkMode ? 'Activado' : 'Desactivado'}
                  </span>
                </button>
              </div>

              <div>
                <div className="mb-2 text-xs font-bold tracking-wider text-[#5B6573] dark:text-slate-400">
                  TAMAÑO DE LETRA
                </div>
                <div className="grid grid-cols-2 gap-1.5 rounded-xl bg-[#F2F4F7] p-1 dark:bg-slate-800">
                  <button
                    type="button"
                    aria-pressed={!persisted.largeText}
                    onClick={() =>
                      setPersisted((prev) => ({ ...prev, largeText: false }))
                    }
                    className={`min-h-[44px] rounded-lg text-sm font-bold transition-colors ${
                      !persisted.largeText
                        ? 'bg-[#14263F] text-white dark:bg-[#E8710A]'
                        : 'text-[#14263F] hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    Normal
                  </button>
                  <button
                    type="button"
                    aria-pressed={persisted.largeText}
                    onClick={() =>
                      setPersisted((prev) => ({ ...prev, largeText: true }))
                    }
                    className={`min-h-[44px] rounded-lg text-sm font-bold transition-colors ${
                      persisted.largeText
                        ? 'bg-[#14263F] text-white dark:bg-[#E8710A]'
                        : 'text-[#14263F] hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    Grande
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2.5 border-t border-slate-200 pt-4 dark:border-slate-800">
              {supportsWebShare ? (
                <button
                  type="button"
                  onClick={() => void handleWebShare()}
                  className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-base font-bold text-[#14263F] hover:bg-[#F2F4F7] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                >
                  <Share2 className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <span>Compartir guía</span>
                </button>
              ) : (
                <a
                  href={whatsappShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-base font-bold text-[#14263F] hover:bg-[#F2F4F7] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                >
                  <Share2 className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <span>Compartir por WhatsApp</span>
                </a>
              )}

              <PWAInstallButton className="w-full" />

              <button
                type="button"
                onClick={handleRestart}
                className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-[#C0392B]/30 bg-[#FDECEA] px-4 py-2.5 text-base font-bold text-[#96281B] hover:bg-[#fbdad6] dark:border-[#C0392B]/50 dark:bg-[#3C1412] dark:text-[#FF9E94]"
              >
                <RotateCcw className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Empezar de nuevo</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
