'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { decodeFate, SajuUnit } from '@/lib/sajuEngine';

// 가격 정책 (image_b0ea61.jpg 기준)
const GATES = [
  { id: 'emperor', name: 'EMPEROR GATE', price: '$50', priceId: 'pri_emperor_1', desc: 'Strategic Life Interpretation', color: 'from-purple-600 via-indigo-950 to-black', border: 'border-purple-500/50', text: 'text-purple-400' },
  { id: 'nobility', name: 'NOBILITY GATE', price: '$30', priceId: 'pri_nobility_1', desc: 'Advanced HSE Analysis', color: 'from-blue-700 via-slate-900 to-black', border: 'border-blue-500/30', text: 'text-blue-400' },
  { id: 'merchants', name: 'MERCHANTS GATE', price: '$15', priceId: 'pri_merchants_1', desc: 'Standard Destiny Sector', color: 'from-emerald-700 via-zinc-900 to-black', border: 'border-emerald-500/30', text: 'text-emerald-400' },
  { id: 'commons', name: 'COMMONS GATE', price: '$5', priceId: 'pri_commons_1', desc: 'Brief Cosmic Summary', color: 'from-slate-700 via-black to-black', border: 'border-white/10', text: 'text-slate-400' }
];

export default function Home() {
  const [stage, setStage] = useState<'intro' | 'dashboard'>('intro');
  const [user, setUser] = useState<any>(null);
  const [birthDate, setBirthDate] = useState('1976-09-04T01:04');
  const [sajuData, setSajuData] = useState<SajuUnit[]>([]);
  const [userRank, setUserRank] = useState('slave'); // 초기 신분 (image_b0ea61.jpg)
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    // Paddle 초기화 (Railway 배포 시 필수)
    if (typeof window !== 'undefined' && (window as any).Paddle) {
      (window as any).Paddle.Setup({ vendor: 123456 }); // 본인 Vendor ID
    }
    
    // 유저 세션 확인
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        const { data: profile } = await supabase.from('profiles').select('rank').eq('id', session.user.id).single();
        if (profile) setUserRank(profile.rank);
      }
    };
    checkUser();
  }, []);

  const handlePayment = (priceId: string) => {
    if (!user) return alert("신분 등록(구글 로그인)이 필요합니다.");
    (window as any).Paddle.Checkout.open({
      method: 'checkout',
      product: priceId,
      allowQuantity: false,
      disableLogout: true,
      passthrough: JSON.stringify({ userId: user.id })
    });
  };

  const handleDecode = () => {
    const data = decodeFate(birthDate);
    setSajuData(data);
    setShowResult(true);
  };

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden font-sans select-none">
      
      {/* --- INTRO: 상시 깜빡이는 인장 (image_b22a6e.png 디자인) --- */}
      {stage === 'intro' && (
        <div className="absolute inset-0 bg-black flex flex-col items-center justify-center z-50 animate-fade-in">
          <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('/images/lifecode_orbit.png')" }}></div>
          <div className="relative z-10 flex flex-col items-center">
            <button 
              onClick={() => setStage('dashboard')}
              className="relative group transition-transform duration-700 hover:scale-110 active:scale-95 animate-pulse"
            >
              <div className="absolute inset-0 bg-purple-600 rounded-full blur-3xl opacity-30 group-hover:opacity-60"></div>
              <img 
                src="/images/lifecode_wallpaper.png" 
                alt="Cosmic Seal" 
                className="w-56 h-56 md:w-72 md:h-72 rounded-full border-2 border-purple-500/30 shadow-[0_0_80px_rgba(147,51,234,0.4)]"
              />
            </button>
            <div className="mt-16 text-center">
              <h1 className="text-8xl font-black italic tracking-tighter text-white drop-shadow-2xl">
                LifeCode <span className="text-blue-500">AI</span>
              </h1>
              <p className="text-blue-400 tracking-[1.5em] text-[10px] mt-6 uppercase font-bold opacity-70 italic">Architecting Destiny Protocols</p>
            </div>
          </div>
        </div>
      )}

      {/* --- DASHBOARD: 1/4 축소 배경 및 비즈니스 로직 (image_b0ea61.jpg 디자인) --- */}
      {stage === 'dashboard' && (
        <div className="flex w-full h-screen animate-fade-in bg-black relative">
          {/* 중앙 배경: 25% 축소 및 투명도 조절 */}
          <div 
            className="absolute inset-0 bg-no-repeat bg-center transition-all opacity-20 pointer-events-none"
            style={{ backgroundImage: "url('/images/lifecode_wallpaper.png')", backgroundSize: '25% auto' }}
          />

          {/* Left Panel: Auth & Input */}
          <aside className="w-[480px] p-16 border-r border-white/5 bg-black/60 backdrop-blur-3xl flex flex-col gap-12 z-20 overflow-y-auto">
            <h2 className="text-6xl font-black italic text-blue-600 tracking-tighter uppercase">Architect</h2>
            
            {!user ? (
              <div className="p-8 bg-white/5 rounded-[3rem] border border-blue-500/30">
                <p className="text-[10px] text-blue-400 font-black mb-4 tracking-widest uppercase opacity-60">Identity Registration</p>
                <button 
                  onClick={() => supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin } })}
                  className="w-full py-5 bg-white text-black font-black rounded-2xl hover:bg-slate-200 transition-all text-xs"
                >
                  GOOGLE CONNECT
                </button>
              </div>
            ) : (
              <div className="p-8 bg-white/5 rounded-[3rem] border border-emerald-500/30">
                <p className="text-[10px] text-emerald-400 font-black mb-2 uppercase">Authenticated</p>
                <p className="text-xs font-bold mb-4 opacity-70 truncate">{user.email}</p>
                <button onClick={() => supabase.auth.signOut()} className="text-[10px] text-red-500 font-black underline">LOGOUT</button>
              </div>
            )}

            <div className="p-8 bg-white/5 rounded-[3rem] border-l-8 border-red-600 shadow-2xl">
              <p className="text-[10px] text-red-500 tracking-widest mb-6 uppercase font-black opacity-50">Fate Timeline</p>
              <input type="datetime-local" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="w-full p-5 bg-black border border-white/10 rounded-2xl text-2xl font-black text-white mb-8 outline-none focus:border-red-600" />
              <button onClick={handleDecode} className="w-full py-5 bg-red-700 rounded-2xl text-[12px] font-black tracking-[0.4em] hover:bg-red-600 transition-all">DECODE DESTINY</button>
            </div>
          </aside>

          {/* Right Panel: Saju & Gates */}
          <section className="flex-grow flex flex-col items-center justify-start p-16 z-20 overflow-y-auto custom-scrollbar">
            {showResult && (
              <div className="grid grid-cols-4 gap-12 mb-16 p-12 bg-black/40 rounded-[5rem] border border-white/10 shadow-2xl animate-fade-in">
                {sajuData.map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-8">
                    <div className={`w-32 h-32 rounded-full border-2 flex items-center justify-center text-5xl font-black ${item.kanColor}`}>{item.kan}</div>
                    <div className={`w-32 h-32 rounded-3xl border-2 flex items-center justify-center text-5xl font-black`}>{item.ji}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="text-center mb-12">
               <p className="text-red-600 font-black text-8xl italic tracking-tighter animate-pulse drop-shadow-2xl uppercase">Rank: {userRank}</p>
            </div>

            {/* 게이트 리스트 (image_b0ea61.jpg 디자인 계승) */}
            <div className="w-full max-w-2xl space-y-6">
              {GATES.map((gate) => (
                <button 
                  key={gate.id} 
                  onClick={() => handlePayment(gate.priceId)}
                  className={`w-full group relative overflow-hidden rounded-[2.5rem] border ${gate.border} bg-gradient-to-br ${gate.color} p-[1px] transition-all hover:scale-[1.03]`}
                >
                  <div className="relative flex items-center justify-between px-10 py-7 bg-black/50 rounded-[2.45rem] backdrop-blur-xl">
                    <div className="text-left">
                      <h3 className={`text-3xl font-black italic tracking-tighter ${gate.text} group-hover:text-white transition-colors uppercase`}>{gate.name}</h3>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 font-black italic">{gate.desc}</p>
                    </div>
                    <span className="text-4xl font-black text-white tracking-tighter">{gate.price}</span>
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
