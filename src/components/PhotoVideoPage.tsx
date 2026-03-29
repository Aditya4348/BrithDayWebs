import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

const scatteredPhotos = [
  { id: 1, url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=400', top: '5%', left: '2%', rotate: -12, delay: 0.2 },
  { id: 2, url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=400', top: '8%', right: '2%', rotate: 8, delay: 0.4 },
  { id: 3, url: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&q=80&w=400', bottom: '5%', left: '5%', rotate: -6, delay: 0.6 },
  { id: 4, url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=400', bottom: '8%', right: '5%', rotate: 15, delay: 0.8 },
  { id: 5, url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=400', top: '40%', left: '-5%', rotate: -20, delay: 1.0 },
  { id: 6, url: 'https://images.unsplash.com/photo-1518599904199-0ca897819ddb?auto=format&fit=crop&q=80&w=400', top: '45%', right: '-5%', rotate: 22, delay: 1.2 },
];

export default function PhotoVideoPage({ onBack }: { key?: string, onBack: () => void }) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
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

      {/* Scattered Photos */}
      {scatteredPhotos.map((photo) => (
        <motion.div
          key={photo.id}
          className="absolute polaroid z-10 w-24 h-32 md:w-48 md:h-56 opacity-60 md:opacity-100"
          style={{
            top: photo.top,
            left: photo.left,
            right: photo.right,
            bottom: photo.bottom,
          }}
          initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: photo.rotate }}
          transition={{ duration: 1, delay: photo.delay, type: "spring" }}
          whileHover={{ scale: 1.1, zIndex: 30, rotate: 0, opacity: 1 }}
        >
          <img src={photo.url} alt="Memory" className="w-full h-full object-cover" />
        </motion.div>
      ))}

      {/* Center Video */}
      <motion.div 
        className="relative z-20 w-full max-w-2xl aspect-video rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(168,85,247,0.3)] border-4 border-white/80 bg-purple-100 flex items-center justify-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        {!isVideoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center text-purple-400 font-medium">
            Loading our memory...
          </div>
        )}
        <video 
          src="https://cdn.pixabay.com/video/2020/05/24/40088-424933014_tiny.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        
        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent">
          <p className="text-white font-serif text-xl md:text-2xl drop-shadow-md">
            Every moment with you feels like a dream.
          </p>
        </div>
      </motion.div>

    </motion.div>
  );
}
