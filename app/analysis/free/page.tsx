"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function FreeAnalysis() {
  return (
    <main className="min-h-screen bg-[#02040a] text-white p-6 font-sans selection:bg-purple-500/30">
      {/* 🛰️ HEADER */}
      <header className="max-w-4xl mx-auto flex justify-between items-center mb-12 border-b border-white/5 pb-6">
        <h1 className="text-xl font-black italic uppercase tracking-tighter">Life<span className="text-purple-400">Code</span></h1>
        <div className="px-3 py-1 rounded-full border border-slate-700 bg-slate-900/50 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
          Slave Class Access
        </div>
      </header>

      <div className="max-w-4xl mx-auto space-y-10">
        {/* 🔳 THE 8-PILLAR (노예 등급은 2칸만 선명, 나머지는 블러) */}
        <section className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 relative overflow-hidden">
          <h2 className="text-[10px] font-bold tracking-[0.4em] text-slate-600 uppercase mb-8 text-center">Partial Energy Matrix</h2>
          
          <div className="grid grid-cols-4 gap-4 opacity-50">
            {['TIME', 'DAY', 'MONTH', 'YEAR'].map((pos, i) => (
              <div key={pos} className={`flex flex-col gap-4 ${i < 3 ? 'blur-md grayscale' : 'opacity-100 scale-105'}`}>
                <div className="text-center text-[8px] font-black text-slate-500 uppercase">{pos}</div>
                <div className="aspect-square rounded-2xl bg-black/60 border border-white/5 flex items-center justify-center text-3xl font-black">
                  {i === 3 ? "F" : "?"}
                </div>
                <div className="aspect-square rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-3xl font-black">
                  {i === 3 ? "e" : "?"}
                </div>
              </div>
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] pointer-events-none">
            <span className="text-[10px] font-bold text-purple-400 tracking-widest bg-black/80 px-4 py-2 rounded-full border border-purple-500/30">
              UPGRADE TO UNLOCK FULL MATRIX
            </span>
          </div>
        </section>

        {/* 📜 ANALYSIS (노예 등급은 단 1줄만 공개) */}
        <section className="space-y-6">
          <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-mono text-purple-500 font-bold italic">01</span>
              <p className="text-sm text-slate-300 leading-relaxed">
                "당신은 불(Fire)의 기운을 타고나 열정적이지만, 현재 좌표상 에너지가 고립되어 있습니다."
              </p>
            </div>

            {/* 잠긴 항목들 */}
            {[2, 3, 4].map((n) => (
              <div key={n} className="flex gap-4 items-start py-4 border-t border-white/5 filter blur-[5px] select-none opacity-30">
                <span className="text-[10px] font-mono text-slate-700 mt-1">0{n}</span>
                <p className="text-sm text-slate-500">당신의 재물운과 미래의 전략적 파트너십에 대한 핵심 코드가 이곳에 숨겨져 있습니다.</p>
              </div>
            ))}
          </div>

          {/* 👑 CALL TO ACTION (강력한 결제 유도) */}
          <div className="bg-gradient-to-b from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-[2.5rem] p-10 text-center space-y-6 shadow-[0_0_50px_rgba(168,85,247,0.15)]">
            <h3 className="text-2xl font-black italic uppercase tracking-tighter">운명의 나머지 코드를 해독하시겠습니까?</h3>
            <p className="text-xs text-slate-400 font-light leading-relaxed max-w-md mx-auto">
              노예 등급은 당신의 우주적 잠재력의 3%만을 보여줍니다. <br/>
              **상인(Merchant)** 이상의 계급으로 승급하여 부와 명예의 흐름을 지배하십시오.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <Link href="/pricing" className="px-8 py-4 rounded-full bg-white text-black font-black text-[10px] tracking-widest uppercase hover:bg-purple-500 hover:text-white transition-all">
                상인 계급으로 승급 ($9)
              </Link>
              <Link href="/pricing" className="px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-black text-[10px] tracking-widest uppercase hover:bg-white/10 transition-all">
                황제 계급 (모든 코드 해제)
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* 🧬 FOOTER */}
      <footer className="mt-20 text-center opacity-30">
        <p className="text-[8px] tracking-[0.4em] uppercase">Created by 의기천추</p>
      </footer>
    </main>
  );
}
