export interface MeterProps {
  label: string;
  level: 1 | 2 | 3 | 4 | 5;
  icon?: string;
  tone?: 'peri' | 'tomato' | 'cheddar';
  className?: string;
}

const LEVEL_DESCRIPTORS: Record<number, string> = {
  1: 'Subtle / Zero Heat',
  2: 'Gentle Warmth',
  3: 'Medium Zest',
  4: 'Bold Punch',
  5: 'Fiery Kick',
};

export function Meter({
  label,
  level,
  icon = '🔥',
  tone = 'peri',
  className = '',
}: MeterProps) {
  const toneBg = {
    peri: 'bg-[#FF4B1F] !text-white',
    tomato: 'bg-[#E5262F] !text-white',
    cheddar: 'bg-[#FFC21A] !text-[#14102B]',
  }[tone];

  const descriptor = LEVEL_DESCRIPTORS[level] || 'Balanced';

  return (
    <div className={`p-3.5 rounded-2xl bg-[#FFFDF7] border-2 border-[#14102B] shadow-[3px_3px_0px_#14102B] flex items-center justify-between gap-3 select-none ${className}`}>
      <div className="flex items-center gap-2">
        <span className="text-lg leading-none" aria-hidden="true">{icon}</span>
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#14102B]">
          {label}
        </span>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border border-[#14102B] shadow-[1px_1px_0px_#14102B] ${toneBg}`}>
        {descriptor}
      </span>
    </div>
  );
}
