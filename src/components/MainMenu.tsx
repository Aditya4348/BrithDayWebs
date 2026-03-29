import { motion, AnimatePresence } from 'motion/react';
import { Camera, Flower2, Music, Heart } from 'lucide-react';
import type { Step } from '../App';

const cards = [
  { id: 'photo-video', title: 'Memories', icon: Camera, desc: 'A little trip down memory lane 📸' },
  { id: 'flower', title: 'For You', icon: Flower2, desc: 'Something that never fades 🌸' },
  { id: 'music', title: 'Our Song', icon: Music, desc: 'Listen to this 🎵' },
  { id: 'letter', title: 'My Heart', icon: Heart, desc: 'A few words for you 💌' },
];

export default function MainMenu({ onNavigate, completedSteps, onFinish }: { key?: string, onNavigate: (step: Step) => void, completedSteps: Set<string>, onFinish: () => void }) {
  const allCompleted = cards.every(c => completedSteps.has(c.id));

  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center p-6 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
    >
      <div className="max-w-4xl w-full relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl md:text-5xl font-serif text-purple-900 mb-4 drop-shadow-sm">Your Birthday Gifts</h2>
          <p className="text-purple-700/80 font-medium">Choose an envelope to open...</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, idx) => {
            const isCompleted = completedSteps.has(card.id);
            const Icon = card.icon;
            return (
              <motion.button
                key={card.id}
                onClick={() => onNavigate(card.id as Step)}
                className={`relative overflow-hidden p-8 rounded-3xl text-left transition-all duration-500 group ${
                  isCompleted 
                    ? 'glass opacity-70' 
                    : 'glass hover:shadow-[0_0_30px_rgba(216,180,254,0.6)] hover:-translate-y-2'
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 + 0.5, duration: 0.8, type: "spring" }}
                whileHover={{ scale: isCompleted ? 1 : 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Envelope Flap Decoration */}
                {!isCompleted && (
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent -skew-y-6 transform origin-top-left transition-transform duration-500 group-hover:-translate-y-full" />
                )}
                
                <div className="relative z-10 flex items-center justify-between mb-4">
                  <div className={`p-4 rounded-2xl backdrop-blur-md ${isCompleted ? 'bg-purple-100/50 text-purple-400' : 'bg-white/60 text-purple-600 shadow-sm'}`}>
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  {isCompleted && (
                    <span className="text-xs font-medium text-purple-500 bg-purple-100/50 px-3 py-1 rounded-full border border-purple-200/50">Opened</span>
                  )}
                </div>
                
                <h3 className={`text-2xl font-serif mb-2 relative z-10 ${isCompleted ? 'text-purple-500' : 'text-purple-900'}`}>{card.title}</h3>
                <p className={`text-sm relative z-10 ${isCompleted ? 'text-purple-400' : 'text-purple-700'}`}>{card.desc}</p>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {allCompleted && (
            <motion.div 
              className="mt-16 text-center"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <button 
                onClick={onFinish}
                className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-400 hover:from-purple-600 hover:to-pink-500 text-white rounded-full font-medium transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transform hover:-translate-y-1 text-lg"
              >
                Continue to my final wish 💜
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
