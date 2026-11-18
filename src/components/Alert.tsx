import React from 'react';
import { AlertTriangle, Ban, Info } from 'lucide-react';
import type { AlertType } from '../steps';
import { formatBold } from '../utils/formatBold';

interface AlertProps {
  type: AlertType;
  label?: string;
  text: string;
  largeText?: boolean;
}

const ALERT_STYLES: Record<
  AlertType,
  {
    bg: string;
    border: string;
    bar: string;
    titleColor: string;
    defaultLabel: string;
    Icon: React.FC<{ className?: string; 'aria-hidden'?: boolean }>;
  }
> = {
  warn: {
    bg: 'bg-[#FFF3DC] dark:bg-[#3A2708]',
    border: 'border-[#E8710A]/35 dark:border-[#E8710A]/50',
    bar: 'bg-[#E8710A]',
    titleColor: 'text-[#9A4700] dark:text-[#FFB36B]',
    defaultLabel: 'ATENCIÓN',
    Icon: AlertTriangle,
  },
  stop: {
    bg: 'bg-[#FDECEA] dark:bg-[#3C1412]',
    border: 'border-[#C0392B]/35 dark:border-[#C0392B]/55',
    bar: 'bg-[#C0392B]',
    titleColor: 'text-[#96281B] dark:text-[#FF9E94]',
    defaultLabel: 'NO HAGAS',
    Icon: Ban,
  },
  info: {
    bg: 'bg-[#E6F0FB] dark:bg-[#0F2642]',
    border: 'border-[#1F6FD1]/35 dark:border-[#1F6FD1]/55',
    bar: 'bg-[#1F6FD1]',
    titleColor: 'text-[#144E96] dark:text-[#82B9FF]',
    defaultLabel: 'INFORMACIÓN',
    Icon: Info,
  },
};

export const Alert: React.FC<AlertProps> = ({ type, label, text, largeText = false }) => {
  const style = ALERT_STYLES[type];
  const Icon = style.Icon;
  const heading = label || style.defaultLabel;

  return (
    <div
      role={type === 'stop' || type === 'warn' ? 'alert' : 'note'}
      className={`relative overflow-hidden rounded-xl border ${style.bg} ${style.border} px-3 py-2 pl-4`}
    >
      <div className={`absolute inset-y-0 left-0 w-1.5 ${style.bar}`} aria-hidden="true" />
      <div
        className={`flex items-center gap-1.5 font-bold leading-tight ${style.titleColor} ${
          largeText ? 'text-sm' : 'text-xs'
        }`}
      >
        <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden={true} />
        <span>{heading}</span>
      </div>
      <p
        className={`mt-0.5 leading-snug text-[#14263F] dark:text-slate-100 ${
          largeText ? 'text-[15px]' : 'text-[13.5px]'
        }`}
      >
        {formatBold(text)}
      </p>
    </div>
  );
};
