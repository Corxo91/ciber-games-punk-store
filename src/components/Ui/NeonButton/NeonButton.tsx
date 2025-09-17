import { cn } from "@/lib/cn";

export default function NeonButton({
  className,
  children,
  ...rest
}: { className?: string; children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={cn(
        "cp-button px-4 sm:px-5 lg:px-6 py-2.5 sm:py-3 rounded-xl font-semibold uppercase tracking-wider",
        "backdrop-blur-sm hover:translate-y-[-2px]",
        className
      )}
    >
      {children}
    </button>
  );
}
