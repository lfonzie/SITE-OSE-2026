import { ReactNode } from 'react';

interface AnimatedIconProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  bounce?: boolean;
  pulse?: boolean;
  rotate?: boolean;
}

export function AnimatedIcon({ 
  children, 
  className = "", 
  delay = 0,
  bounce = false,
  pulse = false,
  rotate = false
}: AnimatedIconProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}