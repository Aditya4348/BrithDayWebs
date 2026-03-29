import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';

const quotes = [
  { text: "You are my today and all of my tomorrows.", top: '10%', left: '5%', delay: 0.5 },
  { text: "I look at you and see the rest of my life.", top: '15%', right: '5%', delay: 1.5 },
  { text: "I love you more than words can show.", bottom: '15%', left: '5%', delay: 2.5 },
  { text: "You're my favorite place to go.", bottom: '10%', right: '5%', delay: 3.5 },
  { text: "Every love story is beautiful, but ours is my favorite.", top: '45%', left: '2%', delay: 4.5 },
  { text: "I fall in love with you every single day.", top: '50%', right: '2%', delay: 5.5 },
];

export default function VirtualFlowerPage({ onBack }: { key?: string, onBack: () => void }) {
  const [isBlooming, setIsBlooming] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
    >
      <button 
        onClick={onBack}
        className="absolute top-8 left-8 p-3 glass text-purple-700 hover:text-purple-900 transition-colors flex items-center gap-2 z-50 rounded-full"
      >
        <ArrowLeft size={20} />
        <span className="font-medium pr-2">Back</span>
      </button>

      {/* Floating Quotes */}
      {quotes.map((quote, idx) => (
        <motion.div
          key={idx}
          className="absolute max-w-[150px] md:max-w-xs z-20 opacity-70 md:opacity-100"
          style={{ top: quote.top, left: quote.left, right: quote.right, bottom: quote.bottom }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: quote.delay, duration: 1.5 }}
        >
          <motion.p 
            className="font-handwriting text-lg md:text-2xl text-purple-800/80 leading-relaxed drop-shadow-sm"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4 + idx, repeat: Infinity, ease: "easeInOut" }}
          >
            "{quote.text}"
          </motion.p>
        </motion.div>
      ))}

      <div className="relative z-30 text-center max-w-2xl flex flex-col items-center">
        {!isBlooming && (
          <motion.p 
            className="text-purple-500 font-medium mb-4 animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Hold to bloom 🌸
          </motion.p>
        )}

        <motion.div
          onPointerDown={() => setIsBlooming(true)}
          onPointerUp={() => setIsBlooming(false)}
          onPointerLeave={() => setIsBlooming(false)}
          className="relative cursor-pointer mb-8 touch-none"
          animate={{ scale: isBlooming ? 1.1 : 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <div className={`absolute inset-0 bg-pink-400/20 rounded-full blur-3xl transition-opacity duration-1000 ${isBlooming ? 'opacity-100' : 'opacity-0'}`} />
          
          <motion.img 
            src="https://images.unsplash.com/photo-1563241527-2004ab3ba181?auto=format&fit=crop&q=80&w=400" 
            alt="Flowers" 
            className="w-64 h-64 object-cover rounded-full mx-auto shadow-[0_0_40px_rgba(244,114,182,0.4)] border-4 border-white relative z-10"
            style={{ filter: isBlooming ? 'saturate(1.2) brightness(1.1)' : 'saturate(0.8) brightness(0.9)' }}
            transition={{ duration: 1 }}
          />
        </motion.div>

        <motion.h2 
          className="text-3xl md:text-5xl font-serif text-purple-900 mb-6 leading-tight drop-shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isBlooming ? 1 : 0.4, y: 0 }}
          transition={{ duration: 1 }}
        >
          "If I could give you flowers every day, I would."
        </motion.h2>
        
        <motion.p
          className="text-lg text-purple-700/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: isBlooming ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          But since I can't always be there, here are some virtual ones that will never fade, just like my love for you. 🌸
        </motion.p>
      </div>

      {/* Parallax Petals */}
      {[...Array(20)].map((_, i) => {
        const depth = Math.random();
        const moveX = (mousePos.x - window.innerWidth / 2) * depth * -0.05;
        const moveY = (mousePos.y - window.innerHeight / 2) * depth * -0.05;
        
        return (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-pink-300/40 rounded-full blur-[1px] z-10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              x: moveX,
              y: moveY,
            }}
            animate={{
              y: [moveY, moveY - 100, moveY],
              x: [moveX, moveX + (Math.random() * 50 - 25), moveX],
              rotate: [0, 180, 360],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      })}
    </motion.div>
  );
}
