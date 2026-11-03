import type { ReactNode } from 'react';

export interface StatChipProps {
  value: string;
  label: string;
  icon?: ReactNode;
  variant?: 'cream' | 'gold' | 'peri' | 'leaf' | 'pink' | 'midnight';
  className?: string;
}

export function StatChip({
  value,
  label,
  icon,
  variant = 'cream',
  className = '',
}: StatChipProps) {
  const variantStyles = {
    cream: 'bg-[#FFF4DC] text-[#14102B]',
    gold: 'bg-[#FFC21A] text-[#14102B]',
    peri: 'bg-[#FF4B1F] text-[#14102B]',
    leaf: 'bg-[#2EC27E] text-[#14102B]',
    pink: 'bg-[#FF7AB8] text-[#14102B]',
    midnight: 'bg-[#14102B] text-[#FFF4DC]',
  }[variant];

  return (
    <div
      className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border-2 border-[#14102B] shadow-[3px_3px_0px_#14102B] select-none ${variantStyles} ${className}`}
    >
      {icon && <span className="text-base shrink-0">{icon}</span>}
      <div className="flex items-baseline gap-1.5">
        <strong className="text-sm md:text-base font-mono font-bold leading-none">
          {value}
        </strong>
        <span className="text-xs font-sans font-semibold opacity-90 leading-none">
          {label}
        </span>
      </div>
    </div>
  );
}
