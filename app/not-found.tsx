import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="closing">
      <p className="eyebrow" style={{ justifyContent: 'center' }}>Wrong aisle</p>
      <h1 className="display">This page popped off.</h1>
      <p className="lede" style={{ marginInline: 'auto' }}>
        The crunch you want is probably still in the collection.
      </p>
      <Link className="btn btn-gold" href="/">Back home</Link>
    </section>
  );
}
