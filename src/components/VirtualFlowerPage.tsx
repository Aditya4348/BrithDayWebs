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
  const [showBouquet, setShowBouquet] = useState(false);
  const [cracked, setCracked] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleHoldStart = () => {
    setIsBlooming(true);
    setCracked(true);
    setTimeout(() => {
      setShowBouquet(true);
    }, 400);
  };

  const handleHoldEnd = () => {
    setIsBlooming(false);
    setCracked(false);
    setTimeout(() => {
      setShowBouquet(false);
    }, 300);
  };

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
          className="absolute max-w-37.5 md:max-w-xs z-20 opacity-70 md:opacity-100"
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
        {!showBouquet && (
          <motion.p 
            className="text-purple-500 font-medium mb-4 animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Hold to bloom 🌸
          </motion.p>
        )}

        {/* Lingkaran dengan efek pecah */}
        {!showBouquet && (
          <motion.div
            onPointerDown={handleHoldStart}
            onPointerUp={handleHoldEnd}
            onPointerLeave={handleHoldEnd}
            className="relative cursor-pointer mb-8 touch-none"
            animate={{ scale: isBlooming ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Lingkaran utama */}
            <motion.div
              className="w-40 h-40 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 shadow-2xl flex items-center justify-center"
              animate={{
                scale: isBlooming ? [1, 1.2, 1.5] : 1,
                opacity: isBlooming ? [1, 0.8, 0] : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-white font-semibold text-lg">🌸</span>
            </motion.div>

            {/* Retakan (crack effect) */}
            {cracked && (
              <motion.svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 100 100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.path
                  d="M50 50 L35 30 L40 25 L30 15 M50 50 L65 35 L60 28 L70 20 M50 50 L55 65 L48 75 L52 85 M50 50 L30 60 L25 55 L15 65"
                  stroke="#fff"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.path
                  d="M50 50 L45 40 L38 42 M50 50 L60 45 L62 38"
                  stroke="#fff"
                  strokeWidth="1"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.25 }}
                />
              </motion.svg>
            )}

            {/* Pecahan lingkaran */}
            {isBlooming && (
              <>
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 30) * Math.PI / 180;
                  const distance = 80;
                  return (
                    <motion.div
                      key={`shard-${i}`}
                      className="absolute w-3 h-3 bg-pink-400 rounded-sm"
                      style={{
                        left: "50%",
                        top: "50%",
                        x: -6,
                        y: -6,
                      }}
                      initial={{ scale: 1, opacity: 1, rotate: 0 }}
                      animate={{
                        x: Math.cos(angle) * distance,
                        y: Math.sin(angle) * distance,
                        scale: 0,
                        opacity: 0,
                        rotate: 360,
                      }}
                      transition={{ duration: 0.5, delay: i * 0.03 }}
                    />
                  );
                })}
              </>
            )}
          </motion.div>
        )}

        {/* BUKET BUNGA - Pure SVG, bukan gambar */}
        {showBouquet && (
          <motion.div
            className="mb-8 cursor-pointer touch-none"
            initial={{ scale: 0, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
          >
            <motion.svg
              viewBox="0 0 400 500"
              className="w-80 h-auto drop-shadow-2xl"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <defs>
                {/* Gradasi untuk kelopak */}
                <radialGradient id="flowerPink1" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fbcfe8" />
                  <stop offset="100%" stopColor="#f472b6" />
                </radialGradient>
                <radialGradient id="flowerPink2" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fda4af" />
                  <stop offset="100%" stopColor="#fb7185" />
                </radialGradient>
                <radialGradient id="flowerPurple" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#e9d5ff" />
                  <stop offset="100%" stopColor="#a855f7" />
                </radialGradient>
                <radialGradient id="flowerYellow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="100%" stopColor="#eab308" />
                </radialGradient>
                <radialGradient id="flowerWhite" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#fbcfe8" />
                </radialGradient>
              </defs>

              {/* Kertas pembungkus (wrapper) */}
              <motion.path
                d="M130 350 Q120 420 200 440 Q280 420 270 350 L260 300 L140 300 Z"
                fill="#fef3c7"
                stroke="#fde68a"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6 }}
              />
              
              {/* Lipatan kertas */}
              <motion.path
                d="M200 300 L200 440 M160 340 Q200 380 240 340"
                stroke="#fcd34d"
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />

              {/* Batang-batang bunga */}
              {[...Array(9)].map((_, i) => {
                const x = 180 + (i * 5);
                const angle = (i - 4) * 8;
                return (
                  <motion.path
                    key={`stem-${i}`}
                    d={`M${x} 300 Q${x + angle} 250 ${150 + (i * 12)} 180`}
                    stroke="#4ade80"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 + (i * 0.03) }}
                  />
                );
              })}

              {/* Daun-daun kecil */}
              {[
                { stemX: 190, stemY: 260, dir: -1 },
                { stemX: 210, stemY: 270, dir: 1 },
                { stemX: 180, stemY: 240, dir: -1 },
                { stemX: 220, stemY: 250, dir: 1 },
              ].map((leaf, i) => (
                <motion.path
                  key={`leaf-${i}`}
                  d={`M${leaf.stemX} ${leaf.stemY} Q${leaf.stemX + (leaf.dir * 25)} ${leaf.stemY - 15} ${leaf.stemX + (leaf.dir * 30)} ${leaf.stemY + 5}`}
                  fill="#22c55e"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + (i * 0.1), duration: 0.4 }}
                />
              ))}

              {/* BUNGA 1 - Mawar Pink Besar (Tengah) */}
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                style={{ transformOrigin: "200px 180px" }}
              >
                {[...Array(10)].map((_, i) => (
                  <motion.path
                    key="rose1"
                    d="M200 180 Q215 150 200 135 Q185 150 200 180"
                    fill="url(#flowerPink1)"
                    animate={{ rotate: i * 36 }}
                    style={{ originX: "200px", originY: "180px" }}
                    transition={{ delay: 0.5 + (i * 0.02) }}
                  />
                ))}
                {[...Array(8)].map((_, i) => (
                  <motion.path
                    key="rose1-inner"
                    d="M200 180 Q210 160 200 152 Q190 160 200 180"
                    fill="url(#flowerPink2)"
                    animate={{ rotate: i * 45 + 22.5 }}
                    style={{ originX: "200px", originY: "180px" }}
                    transition={{ delay: 0.7 + (i * 0.02) }}
                  />
                ))}
                <circle cx="200" cy="180" r="6" fill="#facc15" />
              </motion.g>

              {/* BUNGA 2 - Ungu (Kiri Atas) */}
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                style={{ transformOrigin: "155px 155px" }}
              >
                {[...Array(6)].map((_, i) => (
                  <path
                    key="flower2"
                    d="M155 155 Q140 130 155 120 Q170 130 155 155"
                    fill="url(#flowerPurple)"
                    transform={`rotate(${i * 60} 155 155)`}
                  />
                ))}
                <circle cx="155" cy="155" r="5" fill="#fef08a" />
              </motion.g>

              {/* BUNGA 3 - Kuning (Kanan Atas) */}
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.55, type: "spring", stiffness: 200 }}
                style={{ transformOrigin: "245px 155px" }}
              >
                {[...Array(6)].map((_, i) => (
                  <path
                    key="flower3"
                    d="M245 155 Q230 130 245 120 Q260 130 245 155"
                    fill="url(#flowerYellow)"
                    transform={`rotate(${i * 60} 245 155)`}
                  />
                ))}
                <circle cx="245" cy="155" r="5" fill="#f472b6" />
              </motion.g>

              {/* BUNGA 4 - Pink Kecil (Kiri) */}
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                style={{ transformOrigin: "135px 190px" }}
              >
                {[...Array(5)].map((_, i) => (
                  <path
                    key="flower4"
                    d="M135 190 Q125 175 135 168 Q145 175 135 190"
                    fill="url(#flowerPink2)"
                    transform={`rotate(${i * 72} 135 190)`}
                  />
                ))}
                <circle cx="135" cy="190" r="4" fill="#fef08a" />
              </motion.g>

              {/* BUNGA 5 - Putih Pink (Kanan) */}
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.65, type: "spring", stiffness: 200 }}
                style={{ transformOrigin: "265px 190px" }}
              >
                {[...Array(5)].map((_, i) => (
                  <path
                    key="flower5"
                    d="M265 190 Q255 175 265 168 Q275 175 265 190"
                    fill="url(#flowerWhite)"
                    transform={`rotate(${i * 72} 265 190)`}
                  />
                ))}
                <circle cx="265" cy="190" r="4" fill="#f472b6" />
              </motion.g>

              {/* BUNGA 6 - Mawar Kecil (Kiri Bawah) */}
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                style={{ transformOrigin: "160px 210px" }}
              >
                {[...Array(6)].map((_, i) => (
                  <path
                    key="flower6"
                    d="M160 210 Q150 195 160 188 Q170 195 160 210"
                    fill="url(#flowerPink1)"
                    transform={`rotate(${i * 60} 160 210)`}
                  />
                ))}
                <circle cx="160" cy="210" r="3" fill="#facc15" />
              </motion.g>

              {/* BUNGA 7 - Ungu Kecil (Kanan Bawah) */}
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.75, type: "spring", stiffness: 200 }}
                style={{ transformOrigin: "240px 210px" }}
              >
                {[...Array(6)].map((_, i) => (
                  <path
                    key="flower7"
                    d="M240 210 Q230 195 240 188 Q250 195 240 210"
                    fill="url(#flowerPurple)"
                    transform={`rotate(${i * 60} 240 210)`}
                  />
                ))}
                <circle cx="240" cy="210" r="3" fill="#fef08a" />
              </motion.g>

              {/* Pita / Ribbon */}
              <motion.path
                d="M160 340 Q200 360 240 340"
                stroke="#f472b6"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              />
              <motion.path
                d="M190 345 Q195 370 185 380 M210 345 Q205 370 215 380"
                stroke="#f472b6"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              />

              {/* Efek berkilau pada bunga */}
              {[...Array(12)].map((_, i) => (
                <motion.circle
                  key={`sparkle-${i}`}
                  cx={150 + Math.random() * 100}
                  cy={140 + Math.random() * 80}
                  r="1.5"
                  fill="#fff"
                  animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                  transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                />
              ))}
            </motion.svg>
          </motion.div>
        )}

        <motion.h2 
          className="text-3xl md:text-5xl font-serif text-purple-900 mb-6 leading-tight drop-shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showBouquet ? 1 : 0.4, y: 0 }}
          transition={{ duration: 1 }}
        >
          "If I could give you flowers every day, I would."
        </motion.h2>
        
        <motion.p
          className="text-lg text-purple-700/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: showBouquet ? 1 : 0 }}
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