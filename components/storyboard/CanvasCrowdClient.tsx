'use client';

import dynamic from 'next/dynamic';

const DynamicCanvasCrowd = dynamic(
  () => import('@/components/storyboard/CanvasCrowd').then((mod) => mod.CanvasCrowd),
  {
    ssr: false,
    loading: () => (
      <div
        className="min-h-screen bg-[#E5E1D8] flex items-center justify-center text-xs font-mono uppercase tracking-widest text-[#14102B]/40"
        aria-hidden="true"
      >
        Loading Visual Story...
      </div>
    ),
  }
);

export function CanvasCrowdClient() {
  return <DynamicCanvasCrowd />;
}
