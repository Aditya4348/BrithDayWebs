import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FinalScreen({ onReplay }: { key?: string, onReplay: () => void }) {
  const [showSecret, setShowSecret] = useState(false);
  const [showPSButton, setShowPSButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPSButton(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center bg-purple-950 text-purple-50 p-6 text-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-800/30 via-purple-950 to-purple-950" />
      
      {/* Floating Lanterns / Orbs */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-t from-orange-400/80 to-yellow-200/80 blur-[2px] shadow-[0_0_20px_rgba(251,146,60,0.8)]"
          style={{
            width: Math.random() * 20 + 10 + 'px',
            height: Math.random() * 25 + 15 + 'px',
            left: `${Math.random() * 100}%`,
            bottom: '-10%',
          }}
          animate={{
            y: ['0vh', '-120vh'],
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
            opacity: [0, 1, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 15 + 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10,
          }}
        />
      ))}

      <div className="relative z-10">
        <motion.h1 
          className="text-5xl md:text-7xl font-serif mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 drop-shadow-[0_0_15px_rgba(216,180,254,0.5)]"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 1.5, delay: 0.5 }}
        >
          Happy Birthday
        </motion.h1>
        
        <motion.h2
          className="text-3xl md:text-5xl font-serif text-white mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          My Love 💜
        </motion.h2>

        <motion.button 
          onClick={onReplay}
          className="flex items-center gap-2 mx-auto px-6 py-3 glass hover:bg-white/20 text-purple-200 rounded-full font-medium transition-colors duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
        >
          <RotateCcw size={18} />
          <span>Experience Again</span>
        </motion.button>

        <AnimatePresence>
          {showPSButton && !showSecret && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setShowSecret(true)}
              className="mt-12 text-purple-400/60 hover:text-purple-300 transition-colors text-sm font-serif italic border-b border-purple-400/30 pb-1"
            >
              P.S.
            </motion.button>
          )}

          {showSecret && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="mt-12 glass-dark p-6 rounded-2xl max-w-md mx-auto"
            >
              <Heart className="w-8 h-8 text-pink-400 mx-auto mb-4 animate-pulse" fill="currentColor" />
              <p className="text-xl font-handwriting text-purple-200">
                "I love you in every universe."
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
