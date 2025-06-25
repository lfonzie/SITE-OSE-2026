import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  hover?: boolean;
  scale?: boolean;
  className?: string;
}

export function AnimatedCard({ 
  children, 
  delay = 0, 
  direction = 'up',
  hover = false,
  scale = false,
  className = ""
}: AnimatedCardProps) {
  const directionVariants = {
    up: { y: 50, opacity: 0 },
    down: { y: -50, opacity: 0 },
    left: { x: 50, opacity: 0 },
    right: { x: -50, opacity: 0 }
  };

  const hoverVariants = hover ? {
    hover: { 
      y: -5,
      scale: scale ? 1.02 : 1,
      transition: { duration: 0.2 }
    }
  } : {};

  return (
    <motion.div
      className={className}
      initial={directionVariants[direction]}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      variants={hoverVariants}
      whileHover="hover"
    >
      {children}
    </motion.div>
  );
}