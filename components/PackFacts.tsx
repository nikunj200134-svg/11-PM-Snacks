import { packIcons } from '@/lib/site';

export function PackFacts() {
  return (
    <ul className="pack-facts">
      {packIcons.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
