import React from 'react';

interface ScreenBoxProps {
  lines: string[];
  largeText?: boolean;
}

export const ScreenBox: React.FC<ScreenBoxProps> = ({ lines, largeText = false }) => {
  return (
    <section aria-label="Mensaje en la pantalla del CGW 5355" className="w-full">
      <div
        className="w-full rounded-xl border border-[#1E3529] bg-[#0E1A14] px-3.5 py-2 shadow-inner"
        role="region"
        aria-label="Texto del display"
      >
        <div className="mb-0.5 flex items-center justify-between text-[10px] font-bold tracking-wider text-[#6CFF9A]/70">
          <span>EN PANTALLA · CGW 5355</span>
        </div>
        <div
          className={`font-mono font-bold leading-tight tracking-tight text-[#6CFF9A] ${
            largeText ? 'text-base sm:text-lg' : 'text-[15px] sm:text-base'
          }`}
        >
          {lines.map((line, index) => (
            <div key={index} className="py-px">
              {line}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
