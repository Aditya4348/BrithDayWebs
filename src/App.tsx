import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Music, Music4 } from 'lucide-react';
import OpeningScreen from './components/OpeningScreen';
import MaybeLaterScreen from './components/MaybeLaterScreen';
import MainMenu from './components/MainMenu';
import PhotoVideoPage from './components/PhotoVideoPage';
import VirtualFlowerPage from './components/VirtualFlowerPage';
import MusicPage from './components/MusicPage';
import LetterPage from './components/LetterPage';
import FinalScreen from './components/FinalScreen';
import CustomCursor from './components/CustomCursor';
import LoginPage from './components/LoginPage';

export type Step = 'opening' | 'maybe-later' | 'login' | 'menu' | 'photo-video' | 'flower' | 'music' | 'letter' | 'final';

export default function App() {
  const [step, setStep] = useState<Step>('opening');
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/music/Hindia - everything u are.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const handleStartExperience = () => {
    setStep('menu');
    if (audioRef.current && !isMusicPlaying) {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      setIsMusicPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (isMusicPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play().catch(e => console.log("Audio play failed:", e));
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  const handleCompleteStep = (stepName: string) => {
    setCompletedSteps((prev) => new Set(prev).add(stepName));
    setStep('menu');
  };

  return (
    <div className="min-h-screen w-full bg-animated-gradient text-purple-950 overflow-hidden font-sans selection:bg-purple-300 selection:text-purple-900 relative cursor-none">
      <CustomCursor />
      
      {/* Global Music Toggle */}
      <AnimatePresence>
        {step !== 'opening' && step !== 'maybe-later' && step !== 'login' && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={toggleMusic}
            className="fixed top-6 right-6 z-50 p-3 rounded-full glass text-purple-600 hover:text-purple-900 hover:bg-white/40 transition-all shadow-lg shadow-purple-200/50"
          >
            {isMusicPlaying ? <Music size={20} className="animate-pulse" /> : <Music4 size={20} className="opacity-50" />}
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {step === 'opening' && <OpeningScreen key="opening" onNext={() => setStep('login')} onLater={() => setStep('maybe-later')} />}
        {step === 'maybe-later' && <MaybeLaterScreen key="maybe-later" onNext={() => setStep('login')} />}
        {step === 'login' && <LoginPage key="login" onSuccess={handleStartExperience} />}
        {step === 'menu' && <MainMenu key="menu" onNavigate={setStep} completedSteps={completedSteps} onFinish={() => setStep('final')} />}
        {step === 'photo-video' && <PhotoVideoPage key="photo-video" onBack={() => handleCompleteStep('photo-video')} />}
        {step === 'flower' && <VirtualFlowerPage key="flower" onBack={() => handleCompleteStep('flower')} />}
        {step === 'music' && <MusicPage key="music" onBack={() => handleCompleteStep('music')} isPlaying={isMusicPlaying} toggleMusic={toggleMusic} />}
        {step === 'letter' && <LetterPage key="letter" onBack={() => handleCompleteStep('letter')} />}
        {step === 'final' && <FinalScreen key="final" onReplay={() => { setStep('opening'); setCompletedSteps(new Set()); audioRef.current?.pause(); setIsMusicPlaying(false); }} />}
      </AnimatePresence>
    </div>
  );
}
