import { motion } from 'framer-motion';
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
  const animations = {
    initial: { scale: 0, opacity: 0, rotate: rotate ? -180 : 0 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      rotate: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: "easeOut",
        ...(bounce && {
          scale: {
            type: "spring",
            stiffness: 300,
            damping: 20
          }
        })
      }
    },
    ...(pulse && {
      whileInView: {
        scale: [1, 1.1, 1],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    })
  };

  return (
    <motion.div
      className={className}
      {...animations}
      viewport={{ once: true, margin: "-50px" }}
    >
      {children}
    </motion.div>
  );
}