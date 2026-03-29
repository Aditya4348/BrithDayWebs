import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

export default function OpeningScreen({ onNext, onLater }: { key?: string, onNext: () => void, onLater: () => void }) {
  const [text, setText] = useState('');
  const fullText = "I have something for you...";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center bg-purple-950 text-purple-50 p-6 text-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
    >
      {/* Ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Floating Hearts Background */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`bg-heart-${i}`}
          className="absolute text-pink-400/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        >
          <Heart size={16 + Math.random() * 24} fill="currentColor" />
        </motion.div>
      ))}

      <div className="relative z-10">
        <h1 className="text-3xl md:text-5xl font-serif mb-8 h-12">
          {text}
          <motion.span 
            animate={{ opacity: [1, 0] }} 
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-[2px] h-8 bg-purple-300 ml-1 align-middle"
          />
        </h1>
        
        <motion.p 
          className="text-lg md:text-xl mb-12 text-purple-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
        >
          Do you want to see your birthday gift?
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-6 items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.5, duration: 1 }}
        >
          <motion.button 
            onClick={onNext}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="px-10 py-4 bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-300 hover:to-pink-300 text-purple-950 rounded-full font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(192,132,252,0.5)]"
          >
            Yes 💜
          </motion.button>
          <button 
            onClick={onLater}
            className="px-8 py-3 bg-transparent border border-purple-400/30 hover:bg-purple-900/50 text-purple-300 rounded-full font-medium transition-colors duration-300"
          >
            Hmm... maybe later
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
