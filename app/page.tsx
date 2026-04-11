'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

// --- 글로벌 다국어 매트릭스 (동이족 정체성 강화) ---
const TRANSLATIONS = {
  en: {
    title: "LifeCode",
    subtitle: "Ancient Dong-yi Astronomy Engine",
    rank: "Sovereign Rank",
    decode: "INITIATE DECODE",
    home: "RETURN TO SKY",
    connect: "SYNC IDENTITY",
    birth: "Birth Temporal Data"
  },
  es: {
    title: "Código de Vida",
    subtitle: "Motor de Astronomía Antigua Dong-yi",
    rank: "Rango Soberano",
    decode: "INICIAR DECO",
    home: "VOLVER AL CIELO",
    connect: "CONECTAR IDENTIDAD",
    birth: "Datos Temporales"
  }
};

const GATES = [
  { id: 'emperor', name: 'EMPEROR', price: '$50', color: 'from-purple-600 to-black', border: 'border-purple-500/50', text: 'text-purple-400' },
  { id: 'nobility', name: 'NOBILITY', price: '$30', color: 'from-blue-700 to-black', border: 'border-blue-500/30', text: 'text-blue-400' },
  { id: 'merchants', name: 'MERCHANTS', price: '$15', color: 'from-emerald-700 to-black', border: 'border-emerald-500/30', text: 'text-emerald-400' },
  { id: 'commons', name: 'COMMONS', price: '$5', color: 'from-slate-700 to-black', border: 'border-white/10', text: 'text-slate-400' }
];

export default function LifeCodeGlobal() {
  const [stage, setStage] = useState<'intro' | 'dashboard'>('intro');
  const [lang, setLang] = useState<'en' | 'es'>('en');
  const [user, setUser] = useState<any>(null);
  const [userRank, setUserRank] = useState('slave');
  const [birthDate, setBirthDate] = useState('1976-09-04T23:30'); 
  const [isDecoding, setIsDecoding] = useState(false);

  useEffect(() => {
    // 접속 지역/언어 감지 (자동 설정)
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'es') setLang('es');
    
    const syncSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        const { data: profile } = await supabase.from('profiles').select('rank').eq('id', session.user.id).single();
        if (profile) setUserRank(profile.rank);
      }
    };
    syncSession();
  }, []);

  const t = TRANSLATIONS[lang];

  return (
    <main className="min-h-screen bg-black text-white relative overflow-x-hidden font-sans select-none">
      
      {/* 🏛️ GLOBAL NAV: 모바일 대응 상단 바 */}
      <nav className="fixed top-4 left-4 md:top-8 md:left-8 z-[100] flex items-center gap-3 group cursor-pointer" onClick={() => setStage('intro')}>
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-blue-500/50 flex items-center justify-center bg-black/80 backdrop-blur-md transition-all group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]">
          <span className="text-blue-500 font-black text-lg md:text-xl italic">L</span>
        </div>
        <div className="hidden md:flex flex-col opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[10px] font-black text-blue-400 italic">{t.home}</span>
        </div>
      </nav>

      {/* 🌍 언어 선택기 (Mobile Friendly) */}
      <div className="fixed top-5 right-5 z-[100] flex gap-2">
        {(['en', 'es'] as const).map((l) => (
          <button key={l} onClick={() => setLang(l)} className={`px-3 py-1 text-[10px] font-black rounded-full border ${lang === l ? 'bg-white text-black border-white' : 'border-white/20 text-white/40'}`}>
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {/* --- STAGE 1: INTRO (Responsive) --- */}
      {stage === 'intro' && (
        <div className="absolute inset-0 bg-black flex flex-col items-center justify-center z-50 p-6 text-center">
          <div className="absolute inset-0 bg-[url('/images/lifecode_orbit.png')] bg-cover bg-center opacity-20"></div>
          <div className="relative z-10 animate-in fade-in zoom-in duration-1000 flex flex-col items-center">
            <button onClick={() => setStage('dashboard')} className="relative group animate-pulse mb-8 md:mb-12">
              <div className="absolute inset-0 bg-blue-600 rounded-full blur-[60px] md:blur-[100px] opacity-20 group-hover:opacity-40"></div>
              <img src="/images/lifecode_wallpaper.png" alt="Seal" className="w-48 h-48 md:w-80 md:h-80 rounded-full border border-white/10 shadow-2xl transition-transform group-hover:scale-105" />
            </button>
            <h1 className="text-6xl md:text-9xl font-black italic tracking-tighter leading-none">
              {t.title} <span className="text-blue-600 underline decoration-red-600">AI</span>
            </h1>
            <p className="text-red-600 tracking-[0.5em] md:tracking-[1.2em] text-[8px] md:text-[10px] mt-6 uppercase font-black italic opacity-80 leading-relaxed px-4">
              {t.subtitle}
            </p>
          </div>
        </div>
      )}

      {/* --- STAGE 2: DASHBOARD (Mobile First Flex) --- */}
      {stage === 'dashboard' && (
        <div className="flex flex-col md:flex-row w-full min-h-screen animate-in fade-in duration-700 bg-black relative">
          {/* Background: 25% Scale (의기천추 아키텍처 준수) */}
          <div className="absolute inset-0 bg-no-repeat bg-center opacity-10 pointer-events-none" style={{ backgroundImage: "url('/images/lifecode_wallpaper.png')", backgroundSize: '25% auto' }} />

          {/* LEFT: Control Center (모바일에서는 상단) */}
          <aside className="w-full md:w-[450px] p-8 md:p-16 border-b md:border-b-0 md:border-r border-white/5 bg-black/60 backdrop-blur-2xl z-20 flex flex-col gap-8 md:gap-12 pt-24 md:pt-32">
            <h2 className="text-4xl md:text-5xl font-black italic text-blue-600 tracking-tighter uppercase">Protocol</h2>
            
            <div className="p-6 md:p-8 bg-white/5 rounded-[2.5rem] md:rounded-[3rem] border-l-[8px] md:border-l-[12px] border-red-700 shadow-2xl">
              <p className="text-[10px] text-red-600 tracking-widest mb-4 uppercase font-black opacity-60">{t.birth}</p>
              <input type="datetime-local" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="w-full p-4 bg-black border border-white/10 rounded-xl text-lg md:text-xl font-black text-white mb-6 outline-none focus:border-blue-500 transition-all" />
              <button onClick={() => {setIsDecoding(true); setTimeout(()=>setIsDecoding(false),1500)}} className="w-full py-5 bg-red-800 rounded-xl text-[11px] font-black tracking-[0.3em] hover:bg-red-600 transition-all active:scale-95">
                {isDecoding ? "DECODING..." : t.decode}
              </button>
            </div>

            {!user ? (
              <button onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })} className="w-full py-4 bg-white text-black font-black rounded-xl text-[10px] tracking-widest uppercase hover:invert transition-all">{t.connect}</button>
            ) : (
              <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-center">
                <span className="text-[9px] text-emerald-400 font-black uppercase tracking-widest italic">{user.email}</span>
              </div>
            )}
          </aside>

          {/* RIGHT: Status & Gates (모바일에서는 하단) */}
          <section className="flex-grow flex flex-col items-center justify-start p-8 md:p-20 z-20 overflow-y-auto pt-10 md:pt-32">
            <div className="text-center mb-12 md:mb-20">
              <p className="text-[10px] md:text-[12px] text-white/30 tracking-[0.8em] uppercase mb-4">{t.rank}</p>
              <h3 className="text-8xl md:text-[12rem] font-black italic text-red-700 tracking-tighter animate-pulse leading-none uppercase drop-shadow-[0_0_50px_rgba(185,28,28,0.3)]">
                {userRank}
              </h3>
            </div>

            <div className="w-full max-w-xl space-y-4 pb-20">
              {GATES.map((gate) => (
                <button key={gate.id} className={`w-full group relative overflow-hidden rounded-[2rem] border ${gate.border} bg-gradient-to-br ${gate.color} p-[1px] transition-all active:scale-[0.98]`}>
                  <div className="relative flex items-center justify-between px-6 py-5 md:px-10 md:py-7 bg-black/60 rounded-[1.95rem] backdrop-blur-xl">
                    <div className="text-left">
                      <h4 className={`text-xl md:text-3xl font-black italic tracking-tighter ${gate.text} group-hover:text-white transition-colors`}>{gate.name}</h4>
                    </div>
                    <span className="text-2xl md:text-4xl font-black text-white tracking-tighter">{gate.price}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
