import Link from "next/link";
import { ReactNode } from "react";

type NeonButtonProps = {
  href?: string;
  className?: string;
  children: ReactNode;
};

const base =
  "cp-button inline-flex items-center justify-center px-6 py-3 rounded-lg text-lg font-bold";

export default function NeonButton({ href, className = "", children }: NeonButtonProps) {
  const classes = `${base} ${className}`;
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return <button className={classes}>{children}</button>;
}
