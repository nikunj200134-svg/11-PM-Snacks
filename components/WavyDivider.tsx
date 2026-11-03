export interface WavyDividerProps {
  fillColor?: string;
  topColor?: string;
  direction?: 'up' | 'down';
  className?: string;
}

export function WavyDivider({
  fillColor = '#14102B',
  direction = 'down',
  className = '',
}: WavyDividerProps) {
  const isUp = direction === 'up';

  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden leading-none select-none ${
        isUp ? 'rotate-180 -mb-1' : '-mt-1'
      } ${className}`}
    >
      <svg
        viewBox="0 0 1440 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-8 md:h-12 lg:h-16 block"
        preserveAspectRatio="none"
      >
        <path
          d="M0,32 C240,64 480,0 720,32 C960,64 1200,0 1440,32 L1440,64 L0,64 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
}
