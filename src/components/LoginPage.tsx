import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Send, Calendar, User, Star, Gift } from 'lucide-react';

type Message = {
  id: number;
  text: string;
  sender: 'system' | 'user';
  isSpecial?: boolean;
};

export default function ChatLogin({ onSuccess }: { onSuccess: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [phase, setPhase] = useState<'intro' | 'askName' | 'askDate' | 'done'>('intro');
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number }[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasStarted = useRef(false);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  // Floating hearts effect
  useEffect(() => {
    if (phase === 'done') {
      const interval = setInterval(() => {
        setFloatingHearts(prev => [
          ...prev,
          { id: Date.now(), x: Math.random() * window.innerWidth }
        ]);
        setTimeout(() => {
          setFloatingHearts(prev => prev.slice(1));
        }, 4000);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [phase]);

  // Helper kirim pesan system dengan efek mengetik
  const sendSystem = (text: string, delay = 800, isSpecial = false) => {
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), text, sender: 'system', isSpecial }
      ]);
      setTyping(false);
    }, delay);
  };

  // INTRO FLOW dengan dialog lebih romantis
  useEffect(() => {
    if (phase === 'intro' && !hasStarted.current) {
      hasStarted.current = true;
      sendSystem("✨ hai… seseorang yang spesial ✨", 500);
      setTimeout(() => sendSystem("aku sudah lama menunggu momen ini… 💜", 1500), 500);
      setTimeout(() => sendSystem("ada sesuatu yang ingin aku sampaikan ke kamu… 🌸", 2800), 1500);
      setTimeout(() => sendSystem("tapi sebelumnya... aku pengen ngetes kamu, kamu biasa dipanggil aku apa? 💜", 4200), 2800);
      setTimeout(() => {
        setPhase('askName');
        inputRef.current?.focus();
      }, 5500);
    }
  }, [phase]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user'
    };

    setMessages((prev) => [...prev, userMessage]);

    // ======================
    // STEP 1: VALIDASI NAMA
    // ======================
    if (phase === 'askName') {
      if (input.toLowerCase() === 'raii' || input.toLowerCase() === 'Raii' || input.toLowerCase() === 'rai' || input.toLowerCase() === 'Rai') {
        setTimeout(() => {
          sendSystem("💕 iya… ternyata kamu masih ingat 💕", 400);
        }, 400);
        
        setTimeout(() => {
          sendSystem("senang rasanya… namamu selalu terukir di hati 💜", 1500);
        }, 800);

        setTimeout(() => {
          sendSystem("Terus Kamu ingat Gak tanggal, bulan dan tahun spesial kita, kapan yaaaaa? 🗓️", 2800);
          setPhase('askDate');
        }, 3000);
      } else {
        setTimeout(() => {
          sendSystem("hmm… sepertinya bukan itu namanya 😊", 400);
        }, 400);
        
        setTimeout(() => {
          sendSystem("coba ingat lagi… aku tahu kamu pasti ingat 💭", 1500);
        }, 1000);
      }
    }

    // ======================
    // STEP 2: VALIDASI TANGGAL
    // ======================
    else if (phase === 'askDate') {
      if (input === '230326' || input === '23 Maret 2026' || input === '23/03/2026' || input === '2026-03-23' || input === '23-03-2026' || input === 'March 23, 2026' || input === 'Mar 23, 2026' || input === '23 Maret 2026' || input === '23 maret 26' || input === '23 Mar 2026' || input === '23 Mar 26' || input === '23 maret 2026') {
        setTimeout(() => {
          sendSystem("🌹 ya… 23 Maret 2026, hari yang tak pernah aku lupakan 🌹", 400);
        }, 400);
        
        setTimeout(() => {
          sendSystem("setiap detik bersamamu adalah hadiah terindah ✨", 1500);
        }, 800);
        
        setTimeout(() => {
          sendSystem("sekarang… buka pintu ini, dan temani aku lagi, ya? 💜", 2800, true);
          setPhase('done');
        }, 2500);
        
        setTimeout(() => {
          onSuccess();
        }, 4000);
      } else {
        setTimeout(() => {
          sendSystem("bukan tanggal itu… coba ingat lagi 💭", 400);
        }, 400);
        
        setTimeout(() => {
          sendSystem("tanggal dimana semuanya dimulai… 🥺", 1500);
        }, 1000);
      }
    }

    setInput('');
  };

  return (
    <div className="relative min-h-screen bg-purple-50 flex flex-col justify-between p-4 overflow-hidden">
      
      {/* Floating Hearts Animation */}
      {floatingHearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '100vh', x: heart.x, opacity: 1 }}
          animate={{ y: '-20vh', opacity: 0 }}
          transition={{ duration: 4, ease: 'linear' }}
          className="fixed bottom-0 pointer-events-none z-50"
          style={{ left: heart.x }}
        >
          <Heart className="text-pink-400/60" size={24} fill="#f472b6" />
        </motion.div>
      ))}

      {/* Background Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          >
            <Star size={8} className="text-yellow-300/40" fill="#fcd34d" />
          </motion.div>
        ))}
      </div>

      {/* Header dengan pesan romantis */}
      {phase !== 'done' && (
        <motion.div 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="absolute top-4 left-0 right-0 text-center z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full shadow-sm border border-purple-100">
            <Heart className="text-pink-300" size={16} fill="#f9a8d4" />
            <span className="text-purple-800 text-sm font-medium">Untukmu yang tersayang</span>
            <Sparkles className="text-yellow-300" size={14} />
          </div>
        </motion.div>
      )}

      {/* CHAT CONTAINER */}
      <div className="flex-1 overflow-y-auto space-y-4 pt-16 px-2 pb-4">
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: msg.sender === 'system' ? -20 : 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ type: 'spring', damping: 20 }}
              className={`flex ${msg.sender === 'system' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] px-5 py-3 rounded-2xl text-sm md:text-base shadow-lg ${
                  msg.sender === 'system'
                    ? msg.isSpecial
                      ? 'bg-linear-to-r from-pink-100 to-purple-100 text-purple-900 border border-purple-200'
                      : 'bg-white text-purple-900'
                    : 'bg-linear-to-r from-pink-400 to-purple-500 text-white'
                }`}
              >
                {msg.sender === 'system' && msg.isSpecial && (
                  <Sparkles className="inline-block mr-2 mb-1" size={14} />
                )}
                {msg.text}
                {msg.sender === 'user' && (
                  <Heart className="inline-block ml-2" size={12} fill="white" />
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {typing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-purple-100 px-4 py-2 rounded-2xl">
              <div className="flex gap-1">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="w-2 h-2 bg-purple-400 rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 bg-purple-400 rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: 0.4 }}
                  className="w-2 h-2 bg-purple-400 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* INPUT AREA */}
      {phase !== 'done' && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="relative"
        >
          <div className="flex items-center gap-2 mt-4 bg-white shadow-lg border border-purple-100 rounded-full p-2">
            {phase === 'askName' ? (
              <User className="ml-3 text-purple-400" size={20} />
            ) : phase === 'askDate' ? (
              <Calendar className="ml-3 text-purple-400" size={20} />
            ) : (
              <Sparkles className="ml-3 text-purple-400" size={20} />
            )}
            
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder= "Ketik Pesan... 💜"
              className="flex-1 px-3 py-3 bg-transparent outline-none text-purple-900 placeholder:text-purple-300"
            />
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              className="px-5 py-3 bg-linear-to-r from-pink-400 to-purple-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Send size={18} className="inline-block mr-1" />
              Kirim
            </motion.button>
          </div>
          
          {/* Petunjuk kecil */}
          {phase === 'askDate' && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-purple-400 text-xs mt-2"
            >
              * tanggal dimana semua cerita indah ini dimulai
            </motion.p>
          )}
        </motion.div>
      )}
    </div>
  );
}