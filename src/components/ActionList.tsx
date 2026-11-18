import React from 'react';
import { formatBold } from '../utils/formatBold';

interface ActionListProps {
  actions: string[];
  heading?: string;
  largeText?: boolean;
}

export const ActionList: React.FC<ActionListProps> = ({
  actions,
  heading = 'QUÉ HACER',
  largeText = false,
}) => {
  return (
    <section aria-label={heading} className="w-full">
      <h2 className="mb-1.5 text-[11px] font-bold tracking-wider text-[#5B6573] dark:text-slate-400">
        {heading}
      </h2>
      <ol className="space-y-1.5">
        {actions.map((action, index) => (
          <li key={index} className="flex items-start gap-2.5">
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#14263F] text-xs font-bold tabular-nums text-white dark:bg-slate-700"
            >
              {index + 1}
            </span>
            <span
              className={`leading-snug text-[#14263F] dark:text-slate-100 ${
                largeText ? 'text-base' : 'text-[14.5px] sm:text-[15px]'
              }`}
            >
              {formatBold(action)}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
};
