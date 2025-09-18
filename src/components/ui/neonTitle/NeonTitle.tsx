import { cn } from "@/lib/cn";

export default function NeonTitle({
  as: Tag = "h2",
  className,
  children,
}: {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "degradedBlue cp-glow uppercase tracking-[0.2em] text-3xl sm:text-4xl lg:text-6xl font-bold text-center",
        className
      )}
    >
      {children}
    </Tag>
  );
}
