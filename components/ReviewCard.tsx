import { Star } from 'lucide-react';

export interface ReviewItem {
  author: string;
  quote: string;
  occasion: string;
  rating?: number;
}

export interface ReviewCardProps {
  review: ReviewItem;
  tilt?: -2 | -1 | 0 | 1 | 2;
  className?: string;
}

export function ReviewCard({
  review,
  tilt = 0,
  className = '',
}: ReviewCardProps) {
  const tiltClass = {
    [-2]: 'rotate-[-2deg]',
    [-1]: 'rotate-[-1deg]',
    0: 'rotate-0',
    1: 'rotate-[1deg]',
    2: 'rotate-[2deg]',
  }[tilt];

  return (
    <article
      className={`relative flex flex-col justify-between p-6 bg-[#FFFDF7] border-[2.5px] border-[#14102B] rounded-2xl shadow-[6px_6px_0px_#14102B] hover:shadow-[8px_8px_0px_#14102B] hover:-translate-y-1 transition-all duration-200 select-none ${tiltClass} ${className}`}
    >
      {/* Decorative Washi Tape Accent */}
      <div className="absolute -top-3 left-8 w-16 h-4 bg-[#FFC21A]/70 border border-[#14102B]/30 rotate-[-3deg] shadow-sm pointer-events-none" />

      <div>
        {/* Rating Stars */}
        <div className="flex items-center gap-1 mb-3 text-[#FF4B1F]">
          {Array.from({ length: review.rating || 5 }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current stroke-none" />
          ))}
        </div>

        {/* Quote */}
        <p className="text-sm md:text-base font-medium text-[#14102B] leading-relaxed">
          &ldquo;{review.quote}&rdquo;
        </p>
      </div>

      {/* Author & Occasion Stamp */}
      <div className="mt-5 pt-3 border-t border-[#14102B]/15 flex items-center justify-between gap-2">
        <span className="text-xs font-mono font-bold text-[#14102B]/75 uppercase">
          {review.author}
        </span>
        <span className="text-sm font-scribble text-[#FF4B1F] rotate-1">
          #{review.occasion}
        </span>
      </div>
    </article>
  );
}
