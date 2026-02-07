import React, { useState, useEffect, useCallback } from 'react';
import { Heart, ChevronLeft, ChevronRight, Music, Flower2, Star, Wand2, Camera } from 'lucide-react';

const FloatingBloom = ({ x, y, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className="fixed pointer-events-none z-[60] animate-out fade-out zoom-out duration-1000 ease-in-out"
      style={{ left: x - 20, top: y - 20 }}
    >
      <div className="text-3xl animate-bounce">🌹</div>
    </div>
  );
};

const FallingPetals = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="absolute opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-10%`,
            animation: `fall ${7 + Math.random() * 10}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          <div className="text-xl rotate-45 select-none">🌸</div>
        </div>
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(0vh) rotate(0deg) translateX(0px); opacity: 0; }
          15% { opacity: 0.7; }
          85% { opacity: 0.7; }
          100% { transform: translateY(110vh) rotate(360deg) translateX(40px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

const IntroStep = ({ onOpen }) => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isNoMoving, setIsNoMoving] = useState(false);

  const moveNoButton = () => {
    const newX = Math.random() * (window.innerWidth < 640 ? 120 : 250) - (window.innerWidth < 640 ? 60 : 125);
    const newY = Math.random() * (window.innerWidth < 640 ? 120 : 250) - (window.innerWidth < 640 ? 60 : 125);
    setNoButtonPos({ x: newX, y: newY });
    setIsNoMoving(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="relative group max-w-sm w-full">
        <div className="absolute -inset-10 bg-rose-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        
        <div className="relative bg-white/80 backdrop-blur-md p-8 pt-12 rounded-[3rem] shadow-2xl border-4 border-white overflow-hidden">
          <div className="relative mx-auto w-44 h-44 mb-10">
            <div className="absolute inset-0 bg-rose-200 rounded-full animate-ping opacity-30 scale-125"></div>
            <div className="absolute inset-0 bg-rose-100 rounded-full animate-pulse opacity-40 scale-110"></div>
            
            <div className="absolute inset-0 bg-gradient-to-tr from-rose-200 to-rose-50 rounded-full shadow-inner border-4 border-white flex items-center justify-center overflow-hidden bg-white z-10">
              <span className="text-6xl transition-transform duration-300 group-hover:scale-110">
                🐻
              </span>
            </div>
          </div>
          
          <h1 className="text-3xl font-serif font-bold text-rose-950 mb-2 leading-tight">Will you be my Rose?</h1>
          <p className="text-gray-500 text-sm italic mb-10">A tiny surprise is waiting for you...</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 min-h-[60px]">
            <button 
              onClick={onOpen}
              className="w-full sm:w-auto px-12 py-3.5 bg-rose-600 text-white rounded-full font-bold shadow-lg shadow-rose-200 hover:bg-rose-700 transition-all hover:scale-105 active:scale-95 z-20"
            >
              Yes! 🌹
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

      <div className="mt-12 text-rose-400 font-medium tracking-widest uppercase text-xs flex items-center gap-2 animate-bounce">
        <Star size={12} className="fill-current" /> Tap Yes to Continue <Star size={12} className="fill-current" />
      </div>
    </div>
  );
};

const CardStep = ({ onNext }) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center animate-in fade-in zoom-in duration-1000">
    <div className="max-w-md w-full bg-white/60 backdrop-blur-2xl p-1 rounded-[3rem] shadow-2xl border border-white/50">
      <div className="bg-white p-12 rounded-[2.8rem] relative">
        <div className="w-20 h-20 bg-rose-600 text-white p-5 rounded-full shadow-xl shadow-rose-200 mx-auto -mt-20 flex items-center justify-center border-8 border-white">
          <Heart fill="currentColor" size={32} />
        </div>
        
        <h2 className="text-4xl font-serif font-bold text-rose-950 mb-8 mt-6 italic">A Digital Blossom</h2>
        <div className="w-16 h-1 bg-rose-100 mx-auto mb-8 rounded-full"></div>
        <p className="text-gray-700 leading-relaxed mb-12 text-xl font-serif italic">
          ". Happy Rose Day to the one who makes my soul bloom."
        </p>
        
        <button 
          onClick={onNext}
          className="group flex items-center gap-3 mx-auto px-10 py-4 bg-rose-600 text-white rounded-full font-bold shadow-lg hover:bg-rose-700 transition-all hover:shadow-rose-300"
        >
          Open the Memories <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  </div>
);

const ScrapbookStep = ({ onPrev, onRestart }) => {
  const images = [
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500',
    'https://images.unsplash.com/photo-1496062031456-07b8f162a322?w=500',
    'https://images.unsplash.com/photo-1548610762-65657f548b9c?w=500',
    'https://images.unsplash.com/photo-1559563458-527698bf5295?w=500',
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-in slide-in-from-bottom duration-700">
      <div className="max-w-4xl w-full bg-[#fdfaf6] p-8 md:p-14 rounded-xl shadow-2xl border-8 border-white relative transform rotate-1">
        <div className="absolute top-4 left-4 text-rose-100"><Camera size={40} /></div>
        <h2 className="text-3xl font-serif font-bold text-rose-900 mb-10 text-center">Moments in Bloom</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
          {images.map((img, i) => (
            <div key={i} className={`bg-white p-3 shadow-lg transform ${i % 2 === 0 ? '-rotate-2' : 'rotate-2'} hover:rotate-0 transition-transform duration-500`}>
              <div className="aspect-square bg-gray-100 overflow-hidden mb-3 border border-gray-50">
                <img src={img} alt="Rose" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
              </div>
              <p className="text-center font-serif text-rose-400 italic text-sm">Forever & Always</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6">
          <button onClick={onPrev} className="text-rose-400 font-medium hover:text-rose-600 flex items-center gap-1 transition-colors">
            <ChevronLeft size={20} /> Back
          </button>
          <button onClick={onRestart} className="px-8 py-3 bg-rose-950 text-white rounded-lg hover:bg-black transition-colors shadow-md text-sm font-bold">
            Restart Magic
          </button>
        </div>
      </div>
      <p className="mt-12 text-rose-300 font-serif italic">You are the most beautiful flower in my garden.</p>
    </div>
  );
};

export default function App() {
  const [step, setStep] = useState(1);
  const [isMagicOn, setIsMagicOn] = useState(true);
  const [blooms, setBlooms] = useState([]);

  const handleInteraction = useCallback((e) => {
    if (step <= 2) {
      const newBloom = { id: Date.now(), x: e.clientX, y: e.clientY };
      setBlooms(prev => [...prev, newBloom]);
    }
  }, [step]);

  const removeBloom = (id) => setBlooms(prev => prev.filter(b => b.id !== id));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  return (
    <div 
      className="min-h-screen bg-[#fffafa] selection:bg-rose-100 overflow-x-hidden cursor-crosshair relative"
      onClick={handleInteraction}
    >
      <FallingPetals />
      
      {blooms.map(b => (
        <FloatingBloom key={b.id} x={b.x} y={b.y} onComplete={() => removeBloom(b.id)} />
      ))}

      <div className="fixed top-8 right-8 z-50">
        <button 
          onClick={(e) => { e.stopPropagation(); setIsMagicOn(!isMagicOn); }}
          className={`p-4 rounded-full shadow-2xl transition-all duration-500 ${isMagicOn ? 'bg-rose-600 text-white rotate-12 scale-110 shadow-rose-300' : 'bg-white text-rose-300'}`}
        >
          {isMagicOn ? <Wand2 size={24} /> : <Music size={24} />}
        </button>
      </div>

      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex gap-4 bg-white/40 backdrop-blur-md p-3 rounded-full border border-white/50">
        {[1, 2, 3].map((s) => (
          <div 
            key={s} 
            className={`h-2 rounded-full transition-all duration-700 ${
              step === s ? 'w-10 bg-rose-600 shadow-[0_0_15px_rgba(225,29,72,0.4)]' : 'w-2 bg-rose-200'
            }`} 
          />
        ))}
      </div>

      <main className="relative z-10">
        {step === 1 && <IntroStep onOpen={() => setStep(2)} />}
        {step === 2 && <CardStep onNext={() => setStep(3)} />}
        {step === 3 && <ScrapbookStep onRestart={() => setStep(1)} onPrev={() => setStep(2)} />}
      </main>

      <div className="fixed -bottom-16 -left-16 opacity-5 pointer-events-none rotate-12">
        <Flower2 size={300} className="text-rose-900" />
      </div>
      <div className="fixed -top-16 -right-16 opacity-5 pointer-events-none -rotate-12">
        <Flower2 size={300} className="text-rose-900" />
      </div>
    </div>
  );
}
