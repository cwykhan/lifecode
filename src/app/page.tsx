'use client';

import { useState } from 'react';
import { calculateLifeCode } from '@/lib/engine';

export default function LifeCodeMain() {
  const [inputs, setInputs] = useState({ y: '', m: '', d: '', h: '' });
  const [data, setData] = useState<any>(null);

  const handleDecode = () => {
    if (!inputs.y || !inputs.m || !inputs.d) {
      alert("Please enter your birth date.");
      return;
    }
    const result = calculateLifeCode(+inputs.y, +inputs.m, +inputs.d, +inputs.h || 0);
    setData(result);
  };

  return (
    <main className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* 1. 천상열차분야지도 배경 레이어 */}
      <div 
        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
        style={{ backgroundImage: "url('/chunsang1.jpg')" }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-900/20 via-black/60 to-black pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-2xl text-center">
        <header className="mb-12 animate-in fade-in duration-1000">
          <h1 className="text-7xl font-black tracking-[0.2em] italic bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-gray-500">
            LIFECODE
          </h1>
          <p className="text-blue-400 font-mono text-sm tracking-[0.6em] mt-4 uppercase">CHUNSANG DESTINY PROTOCOL</p>
        </header>

        {/* 2. 입력 섹션 (Glassmorphism) */}
        <section className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-2xl shadow-[0_0_50px_rgba(30,58,138,0.3)] mb-10">
          <div className="grid grid-cols-4 gap-4 mb-8">
            {['year', 'month', 'day', 'hour'].map((k, idx) => (
              <div key={k} className="flex flex-col text-left">
                <label className="text-[10px] text-blue-300 font-mono mb-2 ml-1 uppercase">{k}</label>
                <input 
                  type="number" 
                  placeholder={idx === 0 ? '1990' : '01'}
                  className="w-full bg-black/60 border border-white/10 p-4 rounded-xl focus:border-blue-500 outline-none transition-all text-center font-mono text-xl"
                  onChange={e => setInputs({...inputs, [k[0]]: e.target.value})} 
                />
              </div>
            ))}
          </div>

          <button 
            onClick={handleDecode}
            className="w-full bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 py-5 font-black text-xl rounded-xl tracking-[0.3em] shadow-xl transition-all transform active:scale-[0.97]"
          >
            DECODE SYSTEM
          </button>
        </section>

        {/* 3. 명식 결과 (이니셜 코드 적용) */}
        {data && (
          <div className="grid grid-cols-4 gap-6 animate-in zoom-in-95 duration-700">
            {[data.hour, data.day, data.month, data.year].map((item, i) => (
              <div key={i} className="relative group bg-black/40 border border-blue-500/20 p-6 rounded-2xl backdrop-blur-sm overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-600" />
                <div className="text-[11px] text-blue-400 font-mono mb-2">{item.tenGod}</div>
                <div className="text-5xl font-black text-white mb-2">{item.stem}</div>
                <div className="text-sm text-gray-500 font-mono tracking-tighter uppercase">{item.branch}</div>
              </div>
            ))}
          </div>
        )}

        {/* 4. 환영 배너 문구 */}
        <div className="mt-20 space-y-2 opacity-80">
          <p className="text-xl font-light tracking-widest text-blue-100">WELCOME. DESIGN YOUR DESTINY ANEW.</p>
          <p className="text-[10px] font-mono tracking-[0.5em] text-gray-500">ARCHITECTURE FOR THE EMPEROR</p>
        </div>
      </div>
      
      <footer className="absolute bottom-6 text-[9px] text-gray-600 tracking-[0.5em] font-mono uppercase">
        © ARCHITECTED BY UI-GI-CHEON-CHU
      </footer>
    </main>
  );
}
