import Link from 'next/link';
import { Button } from '@/components/Button';
import { PopBurst } from '@/components/PopBurst';

export default function NotFound() {
  return (
    <div className="relative overflow-hidden min-h-[75vh] flex items-center justify-center bg-[#FFF4DC] text-[#14102B] py-20">
      <PopBurst density="low" className="opacity-40" />

      <div className="w-[min(900px,92vw)] mx-auto text-center relative z-10 flex flex-col items-center">
        {/* Playful Oversized 404 Sticker */}
        <div className="inline-block px-8 py-3 rounded-3xl bg-[#FF4B1F] text-[#14102B] border-[3px] border-[#14102B] shadow-[8px_8px_0px_#14102B] rotate-[-3deg] mb-6 animate-[bounce-gentle_2s_ease-in-out_infinite]">
          <span className="text-6xl sm:text-7xl md:text-8xl font-display uppercase tracking-widest text-white drop-shadow-[2px_2px_0px_#14102B]">
            404
          </span>
        </div>

        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FFC21A] text-[#14102B] border-2 border-[#14102B] shadow-[2px_2px_0px_#14102B] mb-4">
          Empty Snack Bag
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display uppercase tracking-wider text-[#14102B] m-0">
          This Bag Was Munched Away.
        </h1>

        <p className="mt-4 text-base sm:text-lg text-[#14102B]/80 font-medium leading-relaxed max-w-lg mx-auto">
          Someone cleaned out the kettle before you arrived. The URL might have popped off, but our three signature masala flavours are ready and waiting.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/" variant="gold" size="lg">
            Back to Fresh Crunch →
          </Button>
          <Button href="/flavours" variant="outline" size="lg">
            Browse All 3 Flavours
          </Button>
        </div>
      </div>
    </div>
  );
}
