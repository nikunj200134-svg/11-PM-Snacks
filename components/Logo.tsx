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
        className="logo-art object-contain max-h-[48px] h-11 w-auto"
        src="/brand/logo-official.png"
        alt="11 PM Snacks"
        width={120}
        height={104}
        priority
        style={{
          maxHeight: '48px',
          width: 'auto',
          height: 'auto',
        }}
      />
    </Link>
  );
}
