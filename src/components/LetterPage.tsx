import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Mail, Heart } from 'lucide-react';
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
        className="absolute bottom-12 left-1/2 -translate-x-1/2 p-3 px-6 glass text-purple-700 hover:text-purple-900 transition-colors flex items-center gap-2 z-50 rounded-full whitespace-nowrap shadow-lg"
      >
        <Heart size={20} fill="currentColor" className="text-pink-400" />
        <span className="font-handwriting text-xl">Kembali ke Hatimu 💜</span>
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
                <h2 className="text-4xl font-handwriting text-purple-900 mb-8">Untuk Raii tersayang,</h2>
                
                <div className="space-y-6 text-purple-900 leading-relaxed text-2xl font-handwriting">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                  >
                    Selamat ulang tahun yang ke-18, Raii! 🎉 Rasanya baru kemarin kita mulai mengenal satu sama lain, dan sekarang kamu sudah semakin dewasa dan luar biasa. Aku senang banget bisa melihat setiap langkahmu dan semua momen indah kita bersama.
                  </motion.p>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3, duration: 1 }}
                  >
                    Aku ingin membuat sesuatu yang spesial untukmu hari ini. Sesuatu yang bisa kamu simpan dan lihat kapan pun kamu ingin diingatkan bahwa kamu begitu berarti bagiku.
                  </motion.p>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 4.5, duration: 1 }}
                  >
                    Kamu adalah orang yang paling indah, baik hati, dan luar biasa yang pernah aku kenal. Mendengar dan melihat kamu tumbuh serta mengejar impianmu adalah salah satu kebahagiaan terbesar dalam hidupku. Aku berjanji akan selalu ada di sampingmu, mendukungmu, di setiap ulang tahunmu ke depan.
                  </motion.p>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 6, duration: 1 }}
                  >
                    Terima kasih karena menjadi dirimu. Terima kasih karena menjadi milikku. Dan setiap kali aku dengar lagu “Everything You Are” oleh Hindia, aku selalu teringat betapa tenang dan bahagianya hidupku karena kamu 💜
                  </motion.p>
                </div>

                <motion.div 
                  className="mt-12 text-right"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 7.5, duration: 1 }}
                >
                  <p className="text-purple-900 font-handwriting text-3xl">Selamanya milikmu,</p>
                  <p className="text-purple-700 font-handwriting text-2xl mt-2">Aku 💜</p>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
