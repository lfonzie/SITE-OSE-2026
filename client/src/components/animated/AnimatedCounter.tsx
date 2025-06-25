import { ReactNode } from "react";

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({ 
  from = 0, 
  to, 
  duration = 2, 
  suffix = "", 
  className = "" 
}: AnimatedCounterProps) {
  return (
    <span className={className}>
      {to}{suffix}
    </span>
  );
}