import Image from 'next/image';
import Link from 'next/link';

export function Logo({
  compact = false,
  className = '',
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <Link
      className={`logo-mark ${compact ? 'is-compact' : ''} ${className}`}
      href="/"
      aria-label="11 PM Snacks home"
    >
      <Image
        className="logo-art object-contain max-h-[48px] w-auto"
        src="/brand/logo-official.png"
        alt="11 PM Snacks"
        width={1000}
        height={869}
        priority
      />
    </Link>
  );
}
