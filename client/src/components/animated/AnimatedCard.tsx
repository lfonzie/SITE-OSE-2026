import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  scale?: boolean;
  hover?: boolean;
}

export function AnimatedCard({ 
  children, 
  className = "", 
  delay = 0, 
  direction = 'up',
  scale = false,
  hover = true
}: AnimatedCardProps) {
  const directionVariants = {
    up: { y: 50, opacity: 0 },
    down: { y: -50, opacity: 0 },
    left: { x: -50, opacity: 0 },
    right: { x: 50, opacity: 0 }
  };

  const hoverVariants = hover ? {
    scale: scale ? 1.02 : 1,
    y: -5,
    transition: { duration: 0.2, ease: "easeOut" }
  } : {};

  return (
    <motion.div
      className={className}
      initial={directionVariants[direction]}
      whileInView={{ 
        x: 0, 
        y: 0, 
        opacity: 1,
        scale: 1
      }}
      whileHover={hoverVariants}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
}