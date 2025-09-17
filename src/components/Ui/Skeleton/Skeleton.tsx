import { cn } from "@/lib/cn";

export default function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-[rgba(124,58,237,0.12)]",
        "shadow-[0_0_20px_rgba(0,229,255,0.15)]",
        "border border-[rgba(0,229,255,0.25)]",
        className
      )}
    />
  );
}
