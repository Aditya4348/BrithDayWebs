import { motion } from 'motion/react';
import { ArrowLeft, Heart, Sparkles } from 'lucide-react';
import { useState } from 'react';

const scatteredPhotos = [
  // Baris atas
  { id: 1, url: '/forContent/foto (1).jpeg', top: '2%', left: '2%', rotate: -15, delay: 0.1 },
  { id: 2, url: '/forContent/foto (2).jpeg', top: '1%', left: '18%', rotate: 5, delay: 0.15 },
  { id: 3, url: '/forContent/foto (3).jpeg', top: '3%', right: '18%', rotate: -8, delay: 0.2 },
  { id: 4, url: '/forContent/foto (4).jpeg', top: '2%', right: '2%', rotate: 12, delay: 0.25 },
  
  // Baris kiri
  { id: 5, url: '/forContent/foto (5).jpeg', top: '15%', left: '-3%', rotate: -22, delay: 0.3 },
  { id: 6, url: '/forContent/foto (6).jpeg', top: '28%', left: '-1%', rotate: 18, delay: 0.35 },
  { id: 7, url: '/forContent/foto (7).jpeg', top: '42%', left: '-4%', rotate: -25, delay: 0.4 },
  { id: 8, url: '/forContent/foto (8).jpeg', top: '55%', left: '-2%', rotate: 10, delay: 0.45 },
  
  // Baris kanan
  { id: 9, url: '/forContent/foto (9).jpeg', top: '15%', right: '-3%', rotate: 20, delay: 0.5 },
  { id: 10, url: '/forContent/foto (10).jpeg', top: '28%', right: '-1%', rotate: -14, delay: 0.55 },
  { id: 11, url: '/forContent/foto (11).jpeg', top: '42%', right: '-4%', rotate: 16, delay: 0.6 },
  { id: 12, url: '/forContent/foto (12).jpeg', top: '55%', right: '-2%', rotate: -18, delay: 0.65 },
  
  // Baris bawah
  { id: 13, url: '/forContent/foto (13).jpeg', bottom: '2%', left: '3%', rotate: -10, delay: 0.7 },
  { id: 14, url: '/forContent/foto (14).jpeg', bottom: '1%', left: '20%', rotate: 7, delay: 0.75 },
  { id: 15, url: '/forContent/foto (15).jpeg', bottom: '3%', right: '20%', rotate: -12, delay: 0.8 },
  { id: 16, url: '/forContent/foto (16).jpeg', bottom: '2%', right: '3%', rotate: 9, delay: 0.85 },
  
  // Tambahan tumpuk di sudut
  { id: 17, url: '/forContent/foto (17).jpeg', top: '48%', left: '8%', rotate: 25, delay: 0.9 },
  { id: 18, url: '/forContent/foto (18).jpeg', top: '50%', right: '8%', rotate: -28, delay: 0.95 },
];

const romanticStickers = [
  { emoji: '🌸', top: '12%', left: '10%', delay: 1.2, rotate: -10 },
  { emoji: '💕', top: '8%', right: '12%', delay: 1.3, rotate: 15 },
  { emoji: '🌹', top: '22%', left: '5%', delay: 1.4, rotate: 5 },
  { emoji: '💖', top: '20%', right: '8%', delay: 1.5, rotate: -12 },
  { emoji: '✨', bottom: '15%', left: '10%', delay: 1.6, rotate: 8 },
  { emoji: '💝', bottom: '12%', right: '12%', delay: 1.7, rotate: -5 },
  { emoji: '🥰', top: '60%', left: '3%', delay: 1.8, rotate: 20 },
  { emoji: '😘', top: '62%', right: '3%', delay: 1.9, rotate: -15 },
  { emoji: '💗', bottom: '25%', left: '2%', delay: 2.0, rotate: 10 },
  { emoji: '💓', bottom: '28%', right: '2%', delay: 2.1, rotate: -8 },
];

const loveNotes = [
  { text: "You make my world brighter ✨", top: '18%', left: '15%', delay: 1.5 },
  { text: "My heart beats for you ❤️", bottom: '18%', right: '15%', delay: 1.7 },
  { text: "Best decision ever 🥹", top: '65%', left: '12%', delay: 1.9 },
  { text: "Forever and always ♾️", bottom: '35%', right: '10%', delay: 2.1 },
];

export default function PhotoVideoPage({ onBack }: { key?: string, onBack: () => void }) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-pink-50/50 to-purple-50/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
    >
      <button 
        onClick={onBack}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 p-3 px-6 glass bg-white/40 backdrop-blur-md text-purple-700 hover:text-purple-900 transition-colors flex items-center gap-2 z-50 rounded-full shadow-lg whitespace-nowrap"
      >
        <Heart size={20} fill="currentColor" className="text-pink-400" />
        <span className="font-handwriting text-xl">Kembali ke Hatimu 💜</span>
      </button>

      {/* Scattered Photos - Lebih banyak dan berantakan */}
      {scatteredPhotos.map((photo) => (
        <motion.div
          key={photo.id}
          className="absolute polaroid z-10 w-24 h-32 md:w-44 md:h-52 shadow-xl cursor-pointer"
          style={{
            top: photo.top,
            left: photo.left,
            right: photo.right,
            bottom: photo.bottom,
          }}
          initial={{ opacity: 0, scale: 0.3, rotate: 0, x: (Math.random() - 0.5) * 100 }}
          animate={{ opacity: 0.7, scale: 1, rotate: photo.rotate, x: 0 }}
          transition={{ duration: 0.8, delay: photo.delay, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.15, zIndex: 40, rotate: 0, opacity: 1 }}
        >
          <div className="w-full h-full bg-white p-1.5 pb-6 shadow-md">
            <img src={photo.url} alt="Memory" className="w-full h-full object-cover" />
          </div>
        </motion.div>
      ))}

      {/* Romantic Stickers (Bunga & Emoji) */}
      {romanticStickers.map((sticker, idx) => (
        <motion.div
          key={`sticker-${idx}`}
          className="absolute z-15 text-3xl md:text-4xl drop-shadow-lg"
          style={{
            top: sticker.top,
            left: sticker.left,
            right: sticker.right,
            bottom: sticker.bottom,
          }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ opacity: 0.9, scale: 1, rotate: sticker.rotate }}
          transition={{ delay: sticker.delay, duration: 0.5, type: "spring" }}
          whileHover={{ scale: 1.3, rotate: 0, opacity: 1 }}
        >
          {sticker.emoji}
        </motion.div>
      ))}

      {/* Love Notes (Kata-kata romantis) */}
      {loveNotes.map((note, idx) => (
        <motion.div
          key={`note-${idx}`}
          className="absolute z-15 max-w-[180px] md:max-w-[220px]"
          style={{
            top: note.top,
            left: note.left,
            right: note.right,
            bottom: note.bottom,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ delay: note.delay, duration: 0.8 }}
          whileHover={{ opacity: 1, scale: 1.05 }}
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl px-3 py-2 shadow-md border border-pink-200">
            <p className="text-purple-700 text-sm md:text-base font-handwriting whitespace-nowrap">
              {note.text}
            </p>
          </div>
        </motion.div>
      ))}

      {/* Center Video dengan hiasan bingkai bunga */}
      <motion.div 
        className="relative z-20 w-full max-w-2xl aspect-video rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(168,85,247,0.4)] border-4 border-white/90 bg-purple-100 flex items-center justify-center"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 1, type: "spring" }}
      >
        {/* Frame dekoratif bunga di sekitar video */}
        <div className="absolute -top-3 -left-3 text-2xl z-30">🌸</div>
        <div className="absolute -top-3 -right-3 text-2xl z-30">🌷</div>
        <div className="absolute -bottom-3 -left-3 text-2xl z-30">💐</div>
        <div className="absolute -bottom-3 -right-3 text-2xl z-30">🌺</div>
        
        <div className="absolute top-2 left-2 text-xl z-30 opacity-70">✨</div>
        <div className="absolute top-2 right-2 text-xl z-30 opacity-70">✨</div>
        <div className="absolute bottom-2 left-2 text-xl z-30 opacity-70">✨</div>
        <div className="absolute bottom-2 right-2 text-xl z-30 opacity-70">✨</div>

        {!isVideoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center text-purple-400 font-medium bg-purple-50/80 backdrop-blur-sm z-20">
            <div className="flex flex-col items-center gap-2">
              <Heart className="animate-pulse text-pink-400" size={32} />
              <span>Loading our memory...</span>
            </div>
          </div>
        )}
        
        <video 
          src="/forContent/Collpse.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        
        <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 bg-linear-to-t from-black/70 via-black/30 to-transparent">
          <p className="text-white font-serif text-lg md:text-2xl drop-shadow-md flex items-center gap-2">
            <Sparkles size={18} className="text-yellow-300" />
            Every moment with you feels like a dream.
            <Sparkles size={18} className="text-yellow-300" />
          </p>
        </div>
      </motion.div>

      {/* Efek confetti hati berjatuhan */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`confetti-${i}`}
          className="absolute text-pink-400/60 z-5 pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-20px',
          }}
          animate={{
            y: ['0vh', '100vh'],
            rotate: [0, 360],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 5,
            delay: Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {Math.random() > 0.5 ? '🌸' : '💖'}
        </motion.div>
      ))}
    </motion.div>
  );
}