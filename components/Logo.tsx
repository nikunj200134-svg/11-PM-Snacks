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
        className="logo-art"
        src="/brand/logo-official.png"
        alt="11 PM Snacks"
        width={1024}
        height={512}
        priority
      />
    </Link>
  );
}
