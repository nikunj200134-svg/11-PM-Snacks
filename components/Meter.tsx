export interface MeterProps {
  label: string;
  level: 1 | 2 | 3 | 4 | 5;
  icon?: string;
  tone?: 'peri' | 'tomato' | 'cheddar';
  className?: string;
}

const LEVEL_DESCRIPTORS: Record<number, string> = {
  1: 'Mild',
  2: 'Zesty',
  3: 'Medium',
  4: 'Bold',
  5: 'Intense',
};

export function Meter({
  label,
  level,
  icon = '🔥',
  tone = 'peri',
  className = '',
}: MeterProps) {
  const toneBg = {
    peri: 'bg-[#FF4B1F]',
    tomato: 'bg-[#E5262F]',
    cheddar: 'bg-[#FFC21A]',
  }[tone];

  const descriptor = LEVEL_DESCRIPTORS[level] || 'Balanced';

  return (
    <div className={`flex flex-col gap-1.5 select-none ${className}`}>
      {/* Label and Qualitative Intensity Tag (No confusing X/5 star-rating look) */}
      <div className="flex items-center justify-between text-xs font-mono font-bold text-[#14102B]">
        <span className="flex items-center gap-1.5 uppercase tracking-wider">
          <span aria-hidden="true">{icon}</span>
          <span>{label}</span>
        </span>
        <span className="px-2 py-0.5 rounded-full bg-[#14102B] text-[#FFF4DC] text-[10px] font-mono font-bold uppercase tracking-wider">
          {descriptor}
        </span>
      </div>

      {/* 5-Segment Hard Block Bar */}
      <div className="grid grid-cols-5 gap-1.5 p-1 bg-white border-2 border-[#14102B] rounded-xl shadow-[2px_2px_0px_#14102B]">
        {Array.from({ length: 5 }).map((_, idx) => {
          const isFilled = idx < level;
          return (
            <div
              key={idx}
              className={`h-2.5 sm:h-3 rounded-md border border-[#14102B] transition-colors ${
                isFilled ? toneBg : 'bg-[#FFF4DC]/40'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
