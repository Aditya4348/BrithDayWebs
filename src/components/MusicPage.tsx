import { motion } from 'motion/react';
import { ArrowLeft, Play, Pause, Heart } from 'lucide-react';

export default function MusicPage({ onBack, isPlaying, toggleMusic }: { key?: string, onBack: () => void, isPlaying: boolean, toggleMusic: () => void }) {
  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center relative p-6"
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

      <div className="max-w-md w-full glass rounded-3xl p-8 shadow-2xl shadow-purple-200/50 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-br from-purple-200/50 to-pink-200/50 opacity-50" />
        
        <motion.div 
          className="relative z-10 w-40 h-40 mx-auto bg-white/50 rounded-full flex items-center justify-center mb-8 shadow-inner"
          animate={{
            boxShadow: isPlaying ? "0 0 40px rgba(168, 85, 247, 0.4)" : "0 0 0px rgba(168, 85, 247, 0)",
          }}
          transition={{ duration: 1 }}
        >
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md"
          >
            <img 
              src="/forContent/foto (20).jpeg" 
              alt="Record" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute w-4 h-4 bg-white rounded-full border border-gray-200" />
        </motion.div>

        <div className="relative z-10">
          <h2 className="text-2xl font-serif text-purple-900 mb-2">Our Song</h2>
          <p className="text-purple-500 text-sm mb-8 font-medium">Playing: Everything U Are</p>

          <button 
            onClick={toggleMusic}
            className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-pink-400 hover:from-purple-600 hover:to-pink-500 text-white rounded-full flex items-center justify-center transition-transform hover:scale-105 shadow-lg shadow-purple-500/30 mb-8"
          >
            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
          </button>

          <div className="bg-white/50 p-4 rounded-2xl border border-purple-100">
            <Heart className="w-6 h-6 text-pink-400 mx-auto mb-2 animate-pulse" fill="currentColor" />
            <p className="text-sm text-purple-800/80 italic">
             “Setiap kali aku dengar ‘Everything You Are’, aku langsung kepikiran kamu… semua yang kamu bawa ke hidupku, bikin hati ini tenang dan bahagia 💜”
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
