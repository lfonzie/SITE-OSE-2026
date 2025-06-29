import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ClockProps {
  className?: string;
}

export default function Clock({ className = "" }: ClockProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getGreeting = () => {
    const hour = time.getHours();
    if (hour < 12) return 'Bom dia!';
    if (hour < 18) return 'Boa tarde!';
    return 'Boa noite!';
  };

  // Analog clock calculations
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  const secondAngle = (seconds * 6) - 90; // 6 degrees per second
  const minuteAngle = (minutes * 6) + (seconds * 0.1) - 90; // 6 degrees per minute + smooth seconds
  const hourAngle = (hours * 30) + (minutes * 0.5) - 90; // 30 degrees per hour + smooth minutes

  return (
    <motion.div 
      className={`bg-white/25 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-center gap-8">
        {/* Analog Clock */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 relative shadow-inner">
            {/* Clock marks */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-2 bg-slate-600 rounded-full"
                style={{
                  top: '4px',
                  left: '50%',
                  transformOrigin: '50% 44px',
                  transform: `translateX(-50%) rotate(${i * 30}deg)`,
                }}
              />
            ))}
            
            {/* Hour marks (every 3 hours) */}
            {[0, 3, 6, 9].map((i) => (
              <div
                key={`hour-${i}`}
                className="absolute w-1 h-3 bg-school-orange rounded-full"
                style={{
                  top: '2px',
                  left: '50%',
                  transformOrigin: '50% 46px',
                  transform: `translateX(-50%) rotate(${i * 30}deg)`,
                }}
              />
            ))}

            {/* Clock hands */}
            <div
              className="absolute w-0.5 h-7 bg-slate-700 rounded-full origin-bottom"
              style={{
                top: '12px',
                left: '50%',
                transformOrigin: '50% 100%',
                transform: `translateX(-50%) rotate(${hourAngle}deg)`,
              }}
            />
            <div
              className="absolute w-0.5 h-9 bg-slate-600 rounded-full origin-bottom"
              style={{
                top: '6px',
                left: '50%',
                transformOrigin: '50% 100%',
                transform: `translateX(-50%) rotate(${minuteAngle}deg)`,
              }}
            />
            <div
              className="absolute w-px h-10 bg-school-orange rounded-full origin-bottom"
              style={{
                top: '2px',
                left: '50%',
                transformOrigin: '50% 100%',
                transform: `translateX(-50%) rotate(${secondAngle}deg)`,
              }}
            />
            
            {/* Center dot */}
            <div className="absolute w-2 h-2 bg-school-orange rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Digital Clock */}
        <div className="text-center">
          <div className="flex items-center gap-2 text-lg font-medium text-school-orange mb-2">
            <span>🌅</span>
            <span>{getGreeting()}</span>
          </div>
          <div className="text-3xl font-bold text-slate-800 mb-1 font-mono tracking-wider">
            {formatTime(time)}
          </div>
          <div className="text-sm text-slate-600 capitalize">
            {formatDate(time)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}