import Image from 'next/image';

export function ProductVisual({
  src = '/brand/peri-peri-pouch.png',
  alt = '11 PM Snacks popcorn pouch',
  caption = 'Pop the crunch',
  className = '',
  priority = false,
}: {
  src?: string;
  alt?: string;
  caption?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`hero-visual ${className}`}>
      <span className="orbit" aria-hidden="true" />
      <Image
        className="burst burst-a"
        src="/brand/clusters.png"
        alt=""
        width={900}
        height={800}
        aria-hidden="true"
      />
      <Image
        className="pouch"
        src={src}
        alt={alt}
        width={900}
        height={1350}
        priority={priority}
      />
      <Image
        className="burst burst-b"
        src="/brand/clusters-red.png"
        alt=""
        width={800}
        height={700}
        aria-hidden="true"
      />
      <span className="caption-stamp">{caption}</span>
    </div>
  );
}
