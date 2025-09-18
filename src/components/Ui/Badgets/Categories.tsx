import { FaTag } from "react-icons/fa";

export function Categories({ items }: { items: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      {items.map((c) => (
        <span
          key={c}
          className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,229,255,0.25)] bg-[rgba(10,10,15,0.6)] px-3 py-1 text-md sm:text-lg tracking-wide"
        >
          <FaTag className="text-[var(--cp-cyan)]" />
          <span className="uppercase">{c}</span>
        </span>
      ))}
    </div>
  );
}
