export interface MeterProps {
  label: string;
  level: 1 | 2 | 3 | 4 | 5;
  icon?: string;
  tone?: 'peri' | 'tomato' | 'cheddar';
  className?: string;
  descriptor?: string;
}

function getDescriptor(label: string, level: 1 | 2 | 3 | 4 | 5): string {
  const normalized = label.toLowerCase();
  if (normalized.includes('heat') || normalized.includes('spice')) {
    if (level <= 1) return 'Gentle Warmth';
    if (level === 2) return 'Mild Spice';
    if (level === 3) return 'Medium Kick';
    if (level === 4) return 'Bold Heat';
    return 'Fiery Kick';
  }
  if (normalized.includes('tang')) {
    if (level <= 1) return 'Subtle';
    if (level === 2) return 'Gentle Zing';
    if (level === 3) return 'Balanced Tang';
    if (level === 4) return 'Zesty Punch';
    return 'Chatpata Burst';
  }
  if (normalized.includes('cheese')) {
    if (level <= 2) return 'Mellow';
    if (level === 3) return 'Creamy';
    if (level === 4) return 'Rich Savoury';
    return 'Rich Cheddar';
  }
  if (normalized.includes('sweet') || normalized.includes('sour')) {
    if (level <= 2) return 'Subtle Twist';
    if (level === 3) return 'Balanced';
    return 'Chatpata Twist';
  }
  // Default for crunch / crunchiness
  if (level <= 2) return 'Light Crisp';
  if (level === 3) return 'Crispy';
  if (level === 4) return 'Extra Crisp';
  return 'Kettle Crisp';
}

function getStageNames(label: string): [string, string, string, string] {
  const normalized = label.toLowerCase();
  if (normalized.includes('heat') || normalized.includes('spice')) {
    return ['Mild', 'Medium', 'Bold', 'Fiery'];
  }
  if (normalized.includes('tang')) {
    return ['Subtle', 'Medium', 'Zesty', 'Burst'];
  }
  if (normalized.includes('cheese')) {
    return ['Hint', 'Mellow', 'Rich', 'Deep'];
  }
  // Default crunch / texture
  return ['Light', 'Crisp', 'Crunchy', 'Extra'];
}

export function Meter({
  label,
  level,
  icon = '🔥',
  tone = 'peri',
  className = '',
  descriptor,
}: MeterProps) {
  const toneBg = {
    peri: 'bg-[#FF4B1F]',
    tomato: 'bg-[#E5262F]',
    cheddar: 'bg-[#FFC21A]',
  }[tone];

  const activeDescriptor = descriptor || getDescriptor(label, level);
  const stages = getStageNames(label);

  // Map 1..5 scale to 4 qualitative stages:
  // 1 -> 0 (Mild)
  // 2 -> 1 (Medium / Subtle)
  // 3 -> 1 (Medium)
  // 4 -> 2 (Bold / Zesty)
  // 5 -> 3 (Fiery / Burst / Extra)
  const activeStageIndex = level <= 1 ? 0 : level <= 3 ? 1 : level === 4 ? 2 : 3;

  return (
    <div className={`flex flex-col gap-1.5 select-none ${className}`}>
      {/* Taste Attribute Header: Label + Descriptive Taste Profile Badge (NEVER X/5 rating score) */}
      <div className="flex items-center justify-between text-xs font-mono font-bold text-[#14102B]">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px] sm:text-xs">
          <span aria-hidden="true">{icon}</span>
          <span>{label}</span>
        </span>
        <span
          className={`px-2 py-0.5 rounded-full text-[11px] font-bold border border-[#14102B] uppercase tracking-wide shadow-[1px_1px_0px_#14102B] ${
            tone === 'cheddar'
              ? 'bg-[#FFC21A] text-[#14102B]'
              : tone === 'tomato'
              ? 'bg-[#E5262F] text-white'
              : 'bg-[#FF4B1F] text-white'
          }`}
        >
          {activeDescriptor}
        </span>
      </div>

      {/* Flavour Intensity Meter (Explicit 4-stage qualitative dial, eliminating rating bar confusion) */}
      <div className="p-1 bg-white border-2 border-[#14102B] rounded-xl shadow-[3px_3px_0px_#14102B]">
        <div className="grid grid-cols-4 gap-1">
          {stages.map((stageName, idx) => {
            const isCurrent = idx === activeStageIndex;
            const isPassed = idx < activeStageIndex;
            return (
              <div
                key={stageName}
                className={`py-1 text-center rounded text-[10px] font-mono font-bold uppercase transition-all duration-200 border ${
                  isCurrent
                    ? `${toneBg} ${tone === 'cheddar' ? 'text-[#14102B]' : 'text-white'} border-[#14102B] shadow-sm font-black`
                    : isPassed
                    ? 'bg-[#FFF4DC] text-[#14102B] border-[#14102B]/40 font-semibold'
                    : 'bg-[#FFF4DC]/20 text-[#14102B]/40 border-dashed border-[#14102B]/20 font-medium'
                }`}
                title={`Intensity: ${stageName}`}
              >
                {stageName}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
