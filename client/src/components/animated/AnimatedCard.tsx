import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  hover?: boolean;
  scale?: boolean;
  className?: string;
}

export default function AnimatedCard({ 
  children, 
  delay = 0, 
  direction = 'up',
  hover = false,
  scale = false,
  className = ""
}: AnimatedCardProps) {
  const hoverClass = hover ? "hover:transform hover:-translate-y-1 transition-transform duration-200" : "";
  
  return (
    <div className={`${className} ${hoverClass}`}>
      {children}
    </div>
  );
}

export { AnimatedCard };