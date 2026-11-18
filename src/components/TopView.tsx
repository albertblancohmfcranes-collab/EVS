import React from 'react';
import type { DiagramType } from '../steps';

interface TopViewProps {
  diagram: Exclude<DiagramType, 'fold'>;
  stepKey?: number;
}

interface BoomSpec {
  angle: number;
  length: number;
  block?: boolean;
}

interface ArcSpec {
  r: number;
  t0: number;
  t1: number;
  dashed?: boolean;
}

interface ArrowSpec {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface TruckDrawProps {
  length: 'long' | 'short';
  cranePos: 'cab' | 'rear';
  stabilizers?: boolean;
  cut?: number;
  highlightWheels?: 'right' | 'rear' | 'none';
  ghostBooms?: BoomSpec[];
  booms?: BoomSpec[];
  arcs?: ArcSpec[];
  arrows?: ArrowSpec[];
  controlUnit?: 'up' | 'down';
  animateActive?: boolean;
}

const degToRad = (deg: number) => (deg * Math.PI) / 180;

const BlueArrowHead: React.FC<{
  tipX: number;
  tipY: number;
  dirX: number;
  dirY: number;
}> = ({ tipX, tipY, dirX, dirY }) => {
  const len = Math.hypot(dirX, dirY) || 1;
  const ux = dirX / len;
  const uy = dirY / len;
  const nx = -uy;
  const ny = ux;
  const back = 7.5;
  const halfW = 4;
  const p1 = `${tipX},${tipY}`;
  const p2 = `${tipX - ux * back + nx * halfW},${tipY - uy * back + ny * halfW}`;
  const p3 = `${tipX - ux * back - nx * halfW},${tipY - uy * back - ny * halfW}`;
  return <polygon points={`${p1} ${p2} ${p3}`} fill="#1F6FD1" />;
};

const TruckSvgGroup: React.FC<TruckDrawProps> = ({
  length,
  cranePos,
  stabilizers = false,
  cut,
  highlightWheels = 'none',
  ghostBooms = [],
  booms = [],
  arcs = [],
  arrows = [],
  controlUnit,
  animateActive = false,
}) => {
  const bottom = length === 'long' ? -80 : -40;
  const cy = cranePos === 'cab' ? 18 : bottom + 24;
  const svgCy = -cy;

  const chassisBottom = cut !== undefined ? cut : bottom;
  const chassisHeight = 30 - chassisBottom;

  const frontLeftWheelFill = '#333B47';
  const frontRightWheelFill = highlightWheels === 'right' ? '#C0392B' : '#333B47';
  const rearLeftWheelFill = highlightWheels === 'rear' ? '#C0392B' : '#333B47';
  const rearRightWheelFill =
    highlightWheels === 'right' || highlightWheels === 'rear' ? '#C0392B' : '#333B47';

  return (
    <g>
      {/* Stabilizer outriggers (optional) */}
      {stabilizers && (
        <g>
          <line x1={-28} y1={svgCy} x2={-52} y2={svgCy} stroke="#6B7482" strokeWidth={3} />
          <line x1={28} y1={svgCy} x2={52} y2={svgCy} stroke="#6B7482" strokeWidth={3} />
          <rect x={-55} y={svgCy - 6} width={6} height={12} rx={1} fill="#6B7482" />
          <rect x={49} y={svgCy - 6} width={6} height={12} rx={1} fill="#6B7482" />
        </g>
      )}

      {/* Front wheels */}
      <rect x={-36} y={-60} width={8} height={22} rx={2} fill={frontLeftWheelFill} />
      <rect x={28} y={-60} width={8} height={22} rx={2} fill={frontRightWheelFill} />

      {/* Rear wheels (hidden if cut) */}
      {cut === undefined && (
        <>
          <rect
            x={-36}
            y={-(bottom + 30)}
            width={8}
            height={22}
            rx={2}
            fill={rearLeftWheelFill}
          />
          <rect
            x={28}
            y={-(bottom + 30)}
            width={8}
            height={22}
            rx={2}
            fill={rearRightWheelFill}
          />
        </>
      )}

      {/* Chassis */}
      <rect
        x={-28}
        y={-30}
        width={56}
        height={chassisHeight}
        rx={cut !== undefined ? 0 : 4}
        fill="#C9D1DB"
        stroke="#14263F"
        strokeWidth={1.4}
      />

      {/* Cutaway dashed line */}
      {cut !== undefined && (
        <line
          x1={-29}
          y1={-cut}
          x2={29}
          y2={-cut}
          stroke="#FFFFFF"
          strokeWidth={2.2}
          strokeDasharray="4 3"
        />
      )}

      {/* Cab */}
      <rect x={-28} y={-70} width={56} height={40} rx={6} fill="#14263F" />
      {/* Windshield */}
      <rect x={-20} y={-65} width={40} height={7} rx={2} fill="#7FA6D6" />

      {/* Control unit box + direction arrow (for Step 2) */}
      {controlUnit && (
        <g>
          <rect
            x={-64}
            y={svgCy - 10}
            width={22}
            height={20}
            rx={3}
            fill="#FFFFFF"
            stroke="#1F6FD1"
            strokeWidth={1.8}
          />
          <circle cx={-53} cy={svgCy} r={3} fill="#1F6FD1" />
          {controlUnit === 'up' ? (
            <g>
              <line
                x1={-75}
                y1={svgCy + 24}
                x2={-75}
                y2={svgCy - 18}
                stroke="#1F6FD1"
                strokeWidth={2.6}
                strokeLinecap="round"
              />
              <BlueArrowHead tipX={-75} tipY={svgCy - 24} dirX={0} dirY={-1} />
            </g>
          ) : (
            <g>
              <line
                x1={-75}
                y1={svgCy - 24}
                x2={-75}
                y2={svgCy + 18}
                stroke="#1F6FD1"
                strokeWidth={2.6}
                strokeLinecap="round"
              />
              <BlueArrowHead tipX={-75} tipY={svgCy + 24} dirX={0} dirY={1} />
            </g>
          )}
        </g>
      )}

      {/* Ghost booms */}
      {ghostBooms.map((boom, i) => {
        const rad = degToRad(boom.angle);
        const tx = boom.length * Math.sin(rad);
        const ty = svgCy - boom.length * Math.cos(rad);
        return (
          <g key={`ghost-${i}`}>
            <line
              x1={0}
              y1={svgCy}
              x2={tx}
              y2={ty}
              stroke="#F3C79B"
              strokeWidth={5}
              strokeLinecap="round"
            />
            {boom.block && (
              <rect
                x={tx - 5}
                y={ty - 5}
                width={10}
                height={10}
                rx={1.5}
                fill="#8F97A3"
                opacity={0.7}
              />
            )}
          </g>
        );
      })}

      {/* Arcs around crane column */}
      {arcs.map((arc, i) => {
        const rad0 = degToRad(arc.t0);
        const rad1 = degToRad(arc.t1);
        const sx = arc.r * Math.sin(rad0);
        const sy = svgCy - arc.r * Math.cos(rad0);
        const ex = arc.r * Math.sin(rad1);
        const ey = svgCy - arc.r * Math.cos(rad1);
        const span = (((arc.t1 - arc.t0) % 360) + 360) % 360;
        const largeArc = span > 180 ? 1 : 0;
        const tanX = Math.cos(rad1);
        const tanY = Math.sin(rad1);
        return (
          <g
            key={`arc-${i}`}
            className={animateActive ? 'animate-[evsFadeIn_550ms_cubic-bezier(0.16,1,0.3,1)]' : undefined}
          >
            <path
              d={`M ${sx} ${sy} A ${arc.r} ${arc.r} 0 ${largeArc} 1 ${ex} ${ey}`}
              fill="none"
              stroke="#1F6FD1"
              strokeWidth={2.2}
              strokeDasharray={arc.dashed ? '5 4' : undefined}
            />
            <BlueArrowHead tipX={ex} tipY={ey} dirX={tanX} dirY={tanY} />
          </g>
        );
      })}

      {/* Active orange booms */}
      {booms.map((boom, i) => {
        const rad = degToRad(boom.angle);
        const tx = boom.length * Math.sin(rad);
        const ty = svgCy - boom.length * Math.cos(rad);
        return (
          <g
            key={`boom-${i}`}
            className={animateActive ? 'animate-[evsFadeIn_550ms_cubic-bezier(0.16,1,0.3,1)]' : undefined}
          >
            <line
              x1={0}
              y1={svgCy}
              x2={tx}
              y2={ty}
              stroke="#E8710A"
              strokeWidth={5}
              strokeLinecap="round"
            />
            {boom.block && (
              <rect
                x={tx - 5}
                y={ty - 5}
                width={10}
                height={10}
                rx={1.5}
                fill="#333B47"
                stroke="#FFFFFF"
                strokeWidth={1}
              />
            )}
          </g>
        );
      })}

      {/* Straight blue arrows */}
      {arrows.map((arr, i) => {
        const sx1 = arr.x1;
        const sy1 = -arr.y1;
        const sx2 = arr.x2;
        const sy2 = -arr.y2;
        const dx = sx2 - sx1;
        const dy = sy2 - sy1;
        const dist = Math.hypot(dx, dy) || 1;
        const shorten = 6;
        const lineX2 = sx2 - (dx / dist) * shorten;
        const lineY2 = sy2 - (dy / dist) * shorten;
        return (
          <g key={`arrow-${i}`}>
            <line
              x1={sx1}
              y1={sy1}
              x2={lineX2}
              y2={lineY2}
              stroke="#1F6FD1"
              strokeWidth={2.6}
              strokeLinecap="round"
            />
            <BlueArrowHead tipX={sx2} tipY={sy2} dirX={dx} dirY={dy} />
          </g>
        );
      })}

      {/* Crane column drawn ON TOP of boom */}
      <circle cx={0} cy={svgCy} r={8} fill="#E8710A" stroke="#FFFFFF" strokeWidth={1.8} />
    </g>
  );
};

type LegendItem =
  | { kind: 'line'; color: string; text: string }
  | { kind: 'square'; color: string; text: string }
  | { kind: 'arrow'; color: string; text: string };

const LegendSwatch: React.FC<{ item: LegendItem }> = ({ item }) => {
  if (item.kind === 'arrow') {
    return (
      <svg viewBox="0 0 20 14" className="h-3.5 w-5 shrink-0" aria-hidden="true">
        <line x1={2} y1={7} x2={13} y2={7} stroke={item.color} strokeWidth={2.6} strokeLinecap="round" />
        <polygon points="18,7 11,3 11,11" fill={item.color} />
      </svg>
    );
  }
  if (item.kind === 'line') {
    return (
      <span
        className="inline-block h-1.5 w-5 shrink-0 rounded-full"
        style={{ backgroundColor: item.color }}
        aria-hidden="true"
      />
    );
  }
  return (
    <span
      className="inline-block h-3.5 w-3.5 shrink-0 rounded-xs border border-white/60"
      style={{ backgroundColor: item.color }}
      aria-hidden="true"
    />
  );
};

const LegendBox: React.FC<{ items: LegendItem[] }> = ({ items }) => (
  <ul className="space-y-2 text-[13px] font-bold leading-snug text-[#14263F] dark:text-slate-100">
    {items.map((item, idx) => (
      <li key={idx} className="flex items-center gap-2">
        <LegendSwatch item={item} />
        <span>{item.text}</span>
      </li>
    ))}
  </ul>
);

export const TopView: React.FC<TopViewProps> = ({ diagram, stepKey }) => {
  if (diagram === 'types') {
    return (
      <div
        className="w-full rounded-xl border border-slate-200 bg-[#F2F4F7] p-2 dark:border-slate-700 dark:bg-slate-800/80"
        role="img"
        aria-label="Comparación de los tres tipos de montaje: 1 grúa tras cabina chasis largo, 2 grúa atrás chasis largo, 3 chasis corto"
      >
        <div className="grid grid-cols-3 gap-1.5 text-center">
          <div className="flex flex-col items-center">
            <svg viewBox="-46 -80 92 170" className="h-16 w-full">
              <TruckSvgGroup length="long" cranePos="cab" />
            </svg>
            <span className="mt-0.5 text-base font-extrabold leading-none text-[#E8710A]">1</span>
            <span className="mt-0.5 text-[11px] font-semibold leading-tight text-[#5B6573] dark:text-slate-300">
              tras cabina
            </span>
          </div>

          <div className="flex flex-col items-center">
            <svg viewBox="-46 -80 92 170" className="h-16 w-full">
              <TruckSvgGroup length="long" cranePos="rear" />
            </svg>
            <span className="mt-0.5 text-base font-extrabold leading-none text-[#E8710A]">2</span>
            <span className="mt-0.5 text-[11px] font-semibold leading-tight text-[#5B6573] dark:text-slate-300">
              grúa atrás
            </span>
          </div>

          <div className="flex flex-col items-center">
            <svg viewBox="-46 -80 92 170" className="h-16 w-full">
              <TruckSvgGroup length="short" cranePos="cab" />
            </svg>
            <span className="mt-0.5 text-base font-extrabold leading-none text-[#E8710A]">3</span>
            <span className="mt-0.5 text-[11px] font-semibold leading-tight text-[#5B6573] dark:text-slate-300">
              chasis corto
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (diagram === 'pos') {
    return (
      <div
        className="w-full rounded-xl border border-slate-200 bg-[#F2F4F7] p-2 dark:border-slate-700 dark:bg-slate-800/80"
        role="img"
        aria-label="Posición de la unidad de control: 1 Left flecha hacia delante, 2 Right grúa girada 180 grados"
      >
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="flex flex-col items-center">
            <svg viewBox="-88 -78 134 116" className="h-20 w-full">
              <TruckSvgGroup length="long" cranePos="cab" cut={-30} controlUnit="up" />
            </svg>
            <span className="mt-0.5 text-[11.5px] font-bold leading-tight text-[#14263F] dark:text-slate-100">
              1 Left · flecha delante
            </span>
          </div>

          <div className="flex flex-col items-center">
            <svg viewBox="-88 -78 134 116" className="h-20 w-full">
              <TruckSvgGroup length="long" cranePos="cab" cut={-30} controlUnit="down" />
            </svg>
            <span className="mt-0.5 text-[11.5px] font-bold leading-tight text-[#14263F] dark:text-slate-100">
              2 Right · girada 180°
            </span>
          </div>
        </div>
      </div>
    );
  }

  let viewBox = '-66 -88 132 132';
  let truckProps: TruckDrawProps = { length: 'long', cranePos: 'cab', stabilizers: true };
  let legend: LegendItem[] = [];
  let ariaLabel = '';

  switch (diagram) {
    case 'cab_over':
      viewBox = '-66 -86 132 128';
      truckProps = {
        length: 'long',
        cranePos: 'cab',
        stabilizers: true,
        cut: -34,
        booms: [{ angle: 0, length: 56 }],
        arcs: [{ r: 40, t0: 270, t1: 358, dashed: true }],
        animateActive: true,
      };
      legend = [
        { kind: 'line', color: '#E8710A', text: 'Brazo sobre cabina (Y1)' },
        { kind: 'arrow', color: '#1F6FD1', text: 'Gira a la izquierda' },
      ];
      ariaLabel = 'Esquema: brazo sobre la cabina (Y1) tras girar a la izquierda';
      break;

    case 'ext_cal':
      viewBox = '-66 -98 132 130';
      truckProps = {
        length: 'long',
        cranePos: 'cab',
        stabilizers: true,
        cut: -24,
        booms: [{ angle: 0, length: 56 }],
        arrows: [{ x1: 0, y1: 58, x2: 0, y2: 86 }],
        animateActive: true,
      };
      legend = [
        { kind: 'arrow', color: '#1F6FD1', text: 'Saca extensiones despacio' },
        { kind: 'square', color: '#E8710A', text: 'Para al zumbador fijo' },
      ];
      ariaLabel = 'Esquema: sacar extensiones despacio hacia delante hasta zumbador fijo';
      break;

    case 'slew':
      viewBox = '-66 -88 132 134';
      truckProps = {
        length: 'long',
        cranePos: 'cab',
        stabilizers: true,
        cut: -38,
        booms: [{ angle: 0, length: 56 }],
        arcs: [{ r: 50, t0: 5, t1: 355, dashed: false }],
        animateActive: true,
      };
      legend = [
        { kind: 'arrow', color: '#1F6FD1', text: '360° dcha., lento, sin parar' },
        { kind: 'line', color: '#E8710A', text: 'Inicia y acaba en cabina' },
      ];
      ariaLabel = 'Esquema: giro lento de 360 grados a la derecha empezando y terminando sobre la cabina';
      break;

    case 'x':
      viewBox = '-68 -80 136 142';
      truckProps = {
        length: 'long',
        cranePos: 'cab',
        stabilizers: true,
        cut: -52,
        ghostBooms: [
          { angle: 270, length: 52, block: true },
          { angle: 180, length: 52, block: true },
        ],
        arcs: [{ r: 36, t0: 180, t1: 268, dashed: true }],
        booms: [{ angle: 225, length: 56, block: true }],
        animateActive: true,
      };
      legend = [
        { kind: 'line', color: '#E8710A', text: 'Inclinación máx. (diagonal)' },
        { kind: 'line', color: '#F3C79B', text: 'Oscila entre pata y detrás' },
        { kind: 'arrow', color: '#1F6FD1', text: 'Giro 90° a la derecha' },
      ];
      ariaLabel = 'Esquema: buscar inclinación máxima en diagonal trasera entre la pata izquierda y detrás';
      break;

    case 'ext_x':
      viewBox = '-96 -80 158 118';
      truckProps = {
        length: 'long',
        cranePos: 'cab',
        stabilizers: true,
        cut: -30,
        booms: [{ angle: 270, length: 62, block: true }],
        arrows: [{ x1: -68, y1: 18, x2: -88, y2: 18 }],
        highlightWheels: 'right',
        animateActive: true,
      };
      legend = [
        { kind: 'arrow', color: '#1F6FD1', text: 'Saca el bloque cerca suelo' },
        { kind: 'square', color: '#C0392B', text: 'Rueda contraria se levanta' },
      ];
      ariaLabel = 'Esquema: extender el bloque hacia el lado izquierdo hasta que se levanta la rueda derecha';
      break;

    case 'y1_pos':
      viewBox = '-64 -98 128 130';
      truckProps = {
        length: 'long',
        cranePos: 'cab',
        stabilizers: true,
        cut: -24,
        booms: [{ angle: 0, length: 64, block: true }],
        animateActive: true,
      };
      legend = [
        {
          kind: 'square',
          color: '#333B47',
          text: 'Bloque delante (Y1) cerca del suelo',
        },
      ];
      ariaLabel = 'Esquema: bloque suspendido delante de la cabina en dirección Y1 cerca del suelo';
      break;

    case 'ext_y1':
      viewBox = '-64 -110 128 160';
      truckProps = {
        length: 'short',
        cranePos: 'cab',
        stabilizers: true,
        booms: [{ angle: 0, length: 72, block: true }],
        arrows: [{ x1: 0, y1: 80, x2: 0, y2: 100 }],
        highlightWheels: 'rear',
        animateActive: true,
      };
      legend = [
        { kind: 'arrow', color: '#1F6FD1', text: 'Saca el bloque cerca suelo' },
        { kind: 'square', color: '#C0392B', text: 'Rueda trasera se levanta' },
      ];
      ariaLabel = 'Esquema: sacar el bloque delante de la cabina hasta que la rueda trasera empieza a levantarse';
      break;
  }

  return (
    <div
      key={stepKey}
      className="flex w-full items-center gap-2.5 rounded-xl border border-slate-200 bg-[#F2F4F7] p-2 dark:border-slate-700 dark:bg-slate-800/80"
      role="img"
      aria-label={ariaLabel}
    >
      <div className="w-[42%] shrink-0">
        <svg viewBox={viewBox} className="mx-auto h-[84px] w-full">
          <TruckSvgGroup {...truckProps} />
        </svg>
      </div>
      <div className="min-w-0 flex-1">
        <LegendBox items={legend} />
      </div>
    </div>
  );
};
