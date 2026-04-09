'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { decodeFate, SajuUnit } from '@/lib/sajuEngine';
import { analyzeFate, FateReport } from '@/lib/fateAnalyzer';

// image_569b80.png 기준 등급 및 가격 정의
const GATES = [
  { id: 'emperor', name: 'EMPEROR GATE', price: '$50', desc: 'Strategic Life Interpretation', color: 'from-purple-600 to-black', border: 'border-purple-500/50' },
  { id: 'nobility', name: 'NOBILITY GATE', price: '$25', desc: 'Advanced HSE Analysis', color: 'from-blue-700 to-black', border: 'border-blue-500/30' },
  { id: 'merchants', name: 'MERCHANTS GATE', price: '$5', desc: 'Standard Destiny Sector', color: 'from-emerald-700 to-black', border: 'border-emerald-500/30' },
  { id: 'commons', name: 'COMMONS GATE', price: '$1', desc: 'Brief Cosmic Summary', color: 'from-slate-700 to-black', border: 'border-white/10' }
];

export default function Home() {
  const [stage, setStage] = useState<'intro' | 'dashboard'>('intro');
  const [birthDate, setBirthDate] = useState('1976-09-04T01:04');
  const [sajuData, setSajuData] = useState<SajuUnit[]>([]);
  const [userRank, setUserRank] = useState('slave');
  const [showResult, setShowResult] = useState(false);

  const handleDecode = () => {
    const data = decodeFate(birthDate);
    setSajuData(data);
    setShowResult(true);
  };

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden font-sans select-none">
      
      {/* STEP 1: INTRO (image_ae24c7.jpg 배경 적용) */}
      {stage === 'intro' && (
        <div 
          className="absolute inset-0 bg-cover bg-center flex flex-col items-center justify-center z-50 animate-fade-in"
          style={{ backgroundImage: "url('/images/lifecode_orbit.png')" }} // image_ae24c7.jpg를 이 경로에 저장하세요
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            {/* 보라색 원 버튼 (image_ae25c4.png 이미지 활용) */}
            <button 
              onClick={() => setStage('dashboard')}
              className="relative group transition-all duration-700 hover:scale-110 active:scale-95"
            >
              <div className="absolute inset-0 bg-purple-600 rounded-full blur-3xl opacity-30 group-hover:opacity-60 animate-pulse"></div>
              <img 
                src="/images/lifecode_wallpaper.png" // image_ae25c4.png를 이 이름으로 저장하세요
                alt="Cosmic Portal" 
                className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-purple-500/40 shadow-[0_0_80px_rgba(147,51,234,0.5)]"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-black tracking-[0.7em] text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">INITIATE DECODING</span>
              </div>
            </button>

            <div className="mt-16 text-center">
              <h1 className="text-8xl font-black italic tracking-tighter text-white drop-shadow-2xl">LifeCode <span className="text-blue-500">AI</span></h1>
              <p className="text-blue-300 tracking-[1.2em] text-[11px] mt-6 uppercase font-bold opacity-80">Architecting Your Destiny</p>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: DASHBOARD (image_99c547.jpg 디자인 계승) */}
      {stage === 'dashboard' && (
        <div className="flex w-full h-screen animate-fade-in bg-slate-950 relative overflow-hidden">
          {/* 사이버네틱 배경 오버레이 */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "url('/images/lifecode_orbit.png')" }}></div>
          
          {/* 왼쪽 패널: 입력창 */}
          <aside className="w-[450px] p-12 border-r border-white/5 bg-black/40 backdrop-blur-xl z-10 overflow-y-auto">
            <h2 className="text-6xl font-black italic text-blue-600 mb-12 tracking-tighter">SYSTEM</h2>
            
            <div className="space-y-10">
              <section className="p-8 bg-white/5 rounded-[3rem] border border-white/10 shadow-inner">
                <p className="text-[10px] text-blue-400 tracking-widest mb-6 uppercase font-black">Identity Registration</p>
                <input type="email" placeholder="Access Email" className="w-full p-5 bg-black/60 border border-white/10 rounded-2xl mb-4 text-xs font-bold focus:border-blue-500 outline-none transition-all" />
                <button className="w-full py-5 bg-blue-600 rounded-2xl text-[11px] font-black tracking-[0.3em] hover:bg-blue-500 transition-all">REGISTER IDENTITY</button>
              </section>

              <section className="p-8 bg-white/5 rounded-[3rem] border-l-4 border-red-600 shadow-inner">
                <p className="text-[10px] text-red-500 tracking-widest mb-6 uppercase font-black">Fate Decoding Input</p>
                <input 
                  type="datetime-local" 
                  value={birthDate} 
                  onChange={(e) => setBirthDate(e.target.value)} 
                  className="w-full p-5 bg-black border border-white/10 rounded-2xl text-xl font-black text-white mb-6 outline-none" 
                />
                <button onClick={handleDecode} className="w-full py-5 bg-red-600 rounded-2xl text-[11px] font-black tracking-[0.3em] hover:bg-red-500 transition-all">DECODE YOUR FATE</button>
              </section>
            </div>
          </aside>

          {/* 메인 섹션: 명식 및 게이트 (image_99c547.jpg 스타일) */}
          <section className="flex-grow flex flex-col items-center justify-center p-10 z-10 relative">
            
            {/* 8글자 명식 노출 (시-일-월-년) */}
            {showResult && (
              <div className="grid grid-cols-4 gap-8 mb-20 p-12 bg-black/30 rounded-[5rem] border border-white/5 backdrop-blur-md">
                {sajuData.map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-6">
                    <div className={`w-32 h-32 rounded-full border-2 flex items-center justify-center text-5xl font-black shadow-2xl ${item.kanColor}`}>{item.kan}</div>
                    <div className={`w-32 h-32 rounded-3xl border-2 flex items-center justify-center text-5xl font-black shadow-2xl ${item.jiColor}`}>{item.ji}</div>
                    <span className="text-[12px] text-blue-500 font-black tracking-widest uppercase opacity-60">{item.label}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="text-center mb-12">
               <p className="text-red-600 font-black text-7xl italic tracking-tighter mb-2 animate-pulse">STATUS: {userRank.toUpperCase()}</p>
               <p className="text-slate-500 text-[10px] tracking-[0.4em] uppercase font-bold">Access currently bound. Use Gates to Ascend.</p>
            </div>

            {/* 게이트 배너들 */}
            <div className="w-full max-w-xl space-y-6">
              {GATES.map((gate) => (
                <button
                  key={gate.id}
                  className={`w-full group relative overflow-hidden rounded-[2.5rem] border ${gate.border} bg-gradient-to-br ${gate.color} p-[1px] transition-all hover:scale-[1.02]`}
                >
                  <div className="flex items-center justify-between px-10 py-6 bg-black/40 rounded-[2.4rem] backdrop-blur-md">
                    <div className="text-left">
                      <h3 className="text-2xl font-black italic tracking-tighter text-white group-hover:text-blue-400 transition-colors">{gate.name} <span className="text-xs font-normal opacity-40 ml-2">{gate.price}</span></h3>
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{gate.id === 'emperor' ? 'Master Access' : 'Unlock Now'}</span>
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
