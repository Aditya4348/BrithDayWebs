import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Mail } from 'lucide-react';
import { useState } from 'react';

export default function LetterPage({ onBack }: { key?: string, onBack: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden"
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

      <div className="relative w-full max-w-2xl flex items-center justify-center min-h-[600px]">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="envelope"
              className="cursor-pointer group relative"
              onClick={() => setIsOpen(true)}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-64 h-48 bg-purple-200 rounded-lg shadow-2xl relative flex items-center justify-center border border-purple-300">
                {/* Envelope Flap */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-purple-300 rounded-t-lg origin-top transition-transform duration-500 group-hover:-rotate-x-180" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
                <Mail size={48} className="text-purple-600 opacity-50 relative z-10" />
                <p className="absolute bottom-6 text-purple-800 font-serif font-medium">Tap to open</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              className="w-full glass p-8 sm:p-12 rounded-3xl shadow-[0_20px_50px_rgba(168,85,247,0.2)] relative"
              initial={{ y: 100, opacity: 0, rotateX: -20 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            >
              <div className="absolute inset-0 bg-white/40 rounded-3xl -z-10" />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <h2 className="text-4xl font-handwriting text-purple-900 mb-8">My Dearest,</h2>
                
                <div className="space-y-6 text-purple-900 leading-relaxed text-2xl font-handwriting">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                  >
                    Happy 20th Birthday! 🎉 I can't believe you're entering a whole new decade. It feels like just yesterday we were making our first memories together.
                  </motion.p>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3, duration: 1 }}
                  >
                    I wanted to make something special for you today. Something that you could keep and look at whenever you want to be reminded of how much you mean to me.
                  </motion.p>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 4.5, duration: 1 }}
                  >
                    You are the most beautiful, kind-hearted, and amazing person I know. Watching you grow and achieve your dreams is my favorite privilege. I promise to be by your side, cheering you on, for all the birthdays to come.
                  </motion.p>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 6, duration: 1 }}
                  >
                    Thank you for being you. Thank you for being mine.
                  </motion.p>
                </div>

                <motion.div 
                  className="mt-12 text-right"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 7.5, duration: 1 }}
                >
                  <p className="text-purple-900 font-handwriting text-3xl">Forever yours,</p>
                  <p className="text-purple-700 font-handwriting text-2xl mt-2">Me 💜</p>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
