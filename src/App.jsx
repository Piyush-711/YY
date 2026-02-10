import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Heart, ChevronLeft, ChevronRight, Music, Star, Wand2, Camera, Coffee } from 'lucide-react';
import img1 from '../1.jpg.jpeg';
import img2 from '../2.jpg.jpeg';
import img3 from '../3.jpg.jpeg';
import img4 from '../4.jpg.jpeg';
import palSong from '../Pal_Pal.mp3';

// --- Enchanted Background Elements ---

const FloatingTeddy = ({ x, y, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className="fixed pointer-events-none z-[60] animate-out fade-out zoom-out duration-1000 ease-in-out"
      style={{ left: x - 20, top: y - 20 }}
    >
      <div className="text-3xl animate-bounce">🧸</div>
    </div>
  );
};

const FallingCuddles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-10%`,
            animation: `fall ${8 + Math.random() * 12}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          <div className="text-xl select-none">{i % 2 === 0 ? '🧸' : '🤎'}</div>
        </div>
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(0vh) rotate(0deg) translateX(0px); opacity: 0; }
          15% { opacity: 0.6; }
          85% { opacity: 0.6; }
          100% { transform: translateY(110vh) rotate(720deg) translateX(50px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// --- Journey Steps ---

const IntroStep = ({ onOpen }) => {
  const [gifIndex, setGifIndex] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isNoMoving, setIsNoMoving] = useState(false);

  // Cute Teddy GIFs
  const teddyGifs = [
    "https://media.tenor.com/gU_N27ZJmSgAAAAi/mocha-bear-hearts.gif",
    "https://media.tenor.com/Z85pC7N-p7UAAAAi/milk-and-mocha.gif",
    "https://media.tenor.com/0v5C8vU_18AAAAAi/milk-and-mocha-bear-couple.gif",
    "https://media.tenor.com/p_YmK9O3S_UAAAAi/cute-bear.gif",
    "https://media.tenor.com/OnG_fUnm_7gAAAAi/mocha-bear-mocha.gif"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setGifIndex((prev) => (prev + 1) % teddyGifs.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [teddyGifs.length]);

  const moveNoButton = () => {
    const newX = Math.random() * (window.innerWidth < 640 ? 120 : 250) - (window.innerWidth < 640 ? 60 : 125);
    const newY = Math.random() * (window.innerWidth < 640 ? 120 : 250) - (window.innerWidth < 640 ? 60 : 125);
    setNoButtonPos({ x: newX, y: newY });
    setIsNoMoving(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="relative group max-w-sm w-full">
        {/* Warm Glow */}
        <div className="absolute -inset-10 bg-amber-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        
        <div className="relative bg-white/90 backdrop-blur-md p-8 pt-12 rounded-[3rem] shadow-2xl border-4 border-amber-50 overflow-hidden">
          
          {/* Circular Teddy Frame */}
          <div className="relative mx-auto w-44 h-44 mb-10">
            <div className="absolute inset-0 bg-amber-100 rounded-full animate-ping opacity-20 scale-125"></div>
            <div className="absolute inset-0 bg-amber-50 rounded-full animate-pulse opacity-40 scale-110"></div>
            
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-100 to-white rounded-full shadow-inner border-4 border-white flex items-center justify-center overflow-hidden bg-white z-10">
              <img 
                src={teddyGifs[gifIndex]} 
                alt="Cute Teddy" 
                className="w-32 h-32 object-contain transition-opacity duration-300"
              />
            </div>

            {/* Extra Teddy accent centered inside the circle */}
            <div className="absolute inset-0 flex items-center justify-center z-20 text-5xl drop-shadow-md pointer-events-none">
              🧸
            </div>
          </div>
          
          <h1 className="text-3xl font-serif font-bold text-amber-950 mb-2 leading-tight">Will you be my Teddy?</h1>
          <p className="text-amber-700/60 text-sm italic mb-10">I have something warm and fuzzy for you...</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 min-h-[60px]">
            <button 
              onClick={onOpen}
              className="w-full sm:w-auto px-12 py-3.5 bg-amber-700 text-white rounded-full font-bold shadow-lg shadow-amber-100 hover:bg-amber-800 transition-all hover:scale-105 active:scale-95 z-20"
            >
              Yes! 🧸
            </button>
            
            <button 
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
              style={{ transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)` }}
              className={`w-full sm:w-auto px-12 py-3.5 bg-gray-100 text-gray-400 rounded-full font-bold transition-all duration-200 whitespace-nowrap z-10 ${isNoMoving ? 'absolute pointer-events-auto shadow-md' : 'relative'}`}
            >
              No
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 text-amber-600 font-medium tracking-widest uppercase text-xs flex items-center gap-2 animate-bounce">
        <Star size={12} className="fill-current" /> Tap Yes for a Cuddle <Star size={12} className="fill-current" />
      </div>
    </div>
  );
};

const CardStep = ({ onNext }) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center animate-in fade-in zoom-in duration-1000">
    <div className="max-w-md w-full bg-white/70 backdrop-blur-2xl p-1 rounded-[3rem] shadow-2xl border border-white/50">
      <div className="bg-white p-12 rounded-[2.8rem] relative">
        <div className="w-20 h-20 bg-amber-700 text-white p-5 rounded-full shadow-xl shadow-amber-100 mx-auto -mt-20 flex items-center justify-center border-8 border-white">
          <Coffee fill="currentColor" size={32} />
        </div>
        
        <h2 className="text-4xl font-serif font-bold text-amber-950 mb-8 mt-6 italic">Soft & Sweet</h2>
        <div className="w-16 h-1 bg-amber-100 mx-auto mb-8 rounded-full"></div>
        <p className="text-gray-700 leading-relaxed mb-12 text-xl font-serif italic">
          "For my personal baby panda 🐼🤍,
soft as a dream and sweet as honey.
Whenever you’re near me, the whole world fades away—
I forget everything else and just lose myself watching you."
        </p>
        
        <button 
          onClick={onNext}
          className="group flex items-center gap-3 mx-auto px-10 py-4 bg-amber-700 text-white rounded-full font-bold shadow-lg hover:bg-amber-800 transition-all"
        >
          Cuddly Memories <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  </div>
);

const ScrapbookStep = ({ onRestart, onPrev }) => {
  const images = [img1, img2, img3, img4];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-in slide-in-from-bottom duration-700">
      <div className="max-w-4xl w-full bg-[#faf7f2] p-8 md:p-14 rounded-xl shadow-2xl border-8 border-white relative transform rotate-1">
        <div className="absolute top-4 left-4 text-amber-100"><Camera size={40} /></div>
        <h2 className="text-3xl font-serif font-bold text-amber-900 mb-10 text-center">Honey-Sweet Moments</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
          {images.map((img, i) => (
            <div key={i} className={`bg-white p-3 shadow-lg transform ${i % 2 === 0 ? '-rotate-2' : 'rotate-2'} hover:rotate-0 transition-transform duration-500`}>
              <div className="aspect-square bg-amber-50 overflow-hidden mb-3 border border-amber-50">
                <img src={img} alt="Teddy" className="w-full h-full object-cover sepia-[.3] hover:sepia-0 transition-all duration-1000" />
              </div>
              <p className="text-center font-serif text-amber-400 italic text-sm">A Warm Hug</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6">
          <button onClick={onPrev} className="text-amber-600 font-medium flex items-center gap-1 transition-colors">
            <ChevronLeft size={20} /> Back
          </button>
          <button onClick={onRestart} className="px-8 py-3 bg-amber-950 text-white rounded-lg hover:bg-black transition-colors shadow-md text-sm font-bold">
            Restart Magic
          </button>
        </div>
      </div>
      <p className="mt-12 text-amber-400 font-serif italic text-lg animate-pulse">You're the most huggable person I know. 🧸</p>
    </div>
  );
};

// --- Main Controller ---

export default function App() {
  const [step, setStep] = useState(1);
  const [isMagicOn, setIsMagicOn] = useState(true);
  const [cuddles, setCuddles] = useState([]);
  const audioRef = useRef(null);

  const handleInteraction = useCallback((e) => {
    if (step <= 2) {
      const newCuddle = { id: Date.now(), x: e.clientX, y: e.clientY };
      setCuddles(prev => [...prev, newCuddle]);
    }
  }, [step]);

  const removeCuddle = (id) => setCuddles(prev => prev.filter(b => b.id !== id));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  return (
    <div 
      className="min-h-screen bg-[#fffbf5] selection:bg-amber-100 overflow-x-hidden cursor-crosshair relative"
      onClick={handleInteraction}
    >
      {/* Background music */}
      <audio ref={audioRef} src={palSong} loop className="hidden" />
      <FallingCuddles />
      
      {cuddles.map(c => (
        <FloatingTeddy key={c.id} x={c.x} y={c.y} onComplete={() => removeCuddle(c.id)} />
      ))}

      {/* Magic Toggle */}
      <div className="fixed top-8 right-8 z-50">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsMagicOn(prev => {
              const next = !prev;
              if (audioRef.current) {
                if (next) {
                  audioRef.current.play().catch(() => {});
                } else {
                  audioRef.current.pause();
                  audioRef.current.currentTime = 0;
                }
              }
              return next;
            });
          }}
          className={`p-4 rounded-full shadow-2xl transition-all duration-500 ${isMagicOn ? 'bg-amber-700 text-white rotate-12 scale-110 shadow-amber-200' : 'bg-white text-rose-300'}`}
        >
          {isMagicOn ? <Wand2 size={24} /> : <Music size={24} />}
        </button>
      </div>

      {/* Progress Dots */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex gap-4 bg-white/40 backdrop-blur-md p-3 rounded-full border border-white/50">
        {[1, 2, 3].map((s) => (
          <div 
            key={s} 
            className={`h-2 rounded-full transition-all duration-700 ${
              step === s ? 'w-10 bg-amber-700 shadow-[0_0_15px_rgba(180,83,9,0.4)]' : 'w-2 bg-amber-200'
            }`} 
          />
        ))}
      </div>

      <main className="relative z-10">
        {step === 1 && <IntroStep onOpen={() => setStep(2)} />}
        {step === 2 && <CardStep onNext={() => setStep(3)} />}
        {step === 3 && <ScrapbookStep onRestart={() => setStep(1)} onPrev={() => setStep(2)} />}
      </main>

      {/* Decorative Accents */}
      <div className="fixed -bottom-16 -left-16 opacity-10 pointer-events-none rotate-12">
        <Heart size={300} fill="currentColor" className="text-amber-200" />
      </div>
      <div className="fixed -top-16 -right-16 opacity-10 pointer-events-none -rotate-12">
        <Heart size={300} fill="currentColor" className="text-amber-200" />
      </div>
    </div>
  );
}