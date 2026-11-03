import type { ReactNode } from 'react';

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  highlightText?: string;
  scribbleNote?: string;
  lede?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  children?: ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  highlightText,
  scribbleNote,
  lede,
  align = 'center',
  className = '',
  children,
}: SectionHeadingProps) {
  const alignClass = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  }[align];

  return (
    <div className={`flex flex-col max-w-3xl ${alignClass} ${className}`}>
      {/* Eyebrow Chip */}
      {eyebrow && (
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-widest uppercase bg-[#14102B] text-[#FFF4DC] border-2 border-[#14102B] mb-3 shadow-[2px_2px_0px_#FFC21A]">
          {eyebrow}
        </span>
      )}

      {/* Bagel Fat One Display Headline */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-wider text-[#14102B] leading-[1.08] m-0">
        {title}{' '}
        {highlightText && (
          <span className="text-[#FF4B1F] underline decoration-[#FFC21A] decoration-wavy decoration-2">
            {highlightText}
          </span>
        )}
      </h2>

      {/* Caveat Brush Handwritten Scribble */}
      {scribbleNote && (
        <span className="text-xl md:text-2xl font-scribble text-[#FF4B1F] rotate-[-2deg] mt-1.5 inline-block">
          {scribbleNote}
        </span>
      )}

      {/* Lede Paragraph */}
      {lede && (
        <p className="mt-4 text-base md:text-lg text-[#14102B]/80 leading-relaxed max-w-2xl">
          {lede}
        </p>
      )}

      {children}
    </div>
  );
}
