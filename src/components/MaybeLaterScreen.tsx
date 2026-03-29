import { motion } from 'motion/react';

export default function MaybeLaterScreen({ onNext }: { key?: string, onNext: () => void }) {
  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center bg-purple-950 text-purple-50 p-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
    >
      <motion.h2 
        className="text-2xl md:text-4xl font-serif mb-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 1 }}
      >
        Are you sure? I made this just for you 🥺
      </motion.h2>
      
      <motion.button 
        onClick={onNext}
        className="px-8 py-3 bg-purple-400 hover:bg-purple-300 text-purple-950 rounded-full font-medium transition-colors duration-300 shadow-lg shadow-purple-500/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        Okay, show me 💜
      </motion.button>
    </motion.div>
  );
}
