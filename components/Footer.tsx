import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { flavours, site } from '@/lib/site';

export function Footer() {
  return (
    <footer className="site-footer">
      <Logo />
      <nav className="footer-links" aria-label="Footer">
        <Link href="/">Home</Link>
        <Link href="/flavours">Our Flavours</Link>
        <Link href="/healthy-snacking">Healthy Snacking</Link>
        {flavours.map((item) => (
          <Link key={item.slug} href={item.href}>{item.name}</Link>
        ))}
        <Link href="/why-11pm">Why 11 PM?</Link>
        <Link href="/ingredients-nutrition">Ingredients & Nutrition</Link>
        <Link href="/our-process">Our Process</Link>
        <Link href="/about">About Us</Link>
        <Link href="/contact">Contact</Link>
      </nav>
      <p className="legal">
        Big flavour. Serious crunch. Made without palm oil. Made with sunflower oil.
        <br />
        © {new Date().getFullYear()} {site.name}. Gurugram.
      </p>
    </footer>
  );
}
