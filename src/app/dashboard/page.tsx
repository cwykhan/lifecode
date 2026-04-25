"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Dashboard() {
  // 실제 구현 시 API를 통해 받아올 가상 데이터
  const userData = {
    name: "의기천추",
    tier: "Merchant", // 상인 등급 (8줄 해석)
    coordinates: {
      year:  { sky: "F", land: "e", element: "Fire/Earth" },
      month: { sky: "m", land: "M", element: "Metal/Metal" },
      day:   { sky: "f", land: "M", element: "Fire/Metal" },
      time:  { sky: "m", land: "W", element: "Metal/Water" }
    },
    analysis: [
      "당신의 핵심 에너지는 'f'(정화)로, 어둠 속을 밝히는 등불과 같은 존재입니다.",
      "주변의 'Metal' 기운은 당신에게 날카로운 결단력과 명예를 가져다줍니다.",
      "화(Fire)와 금(Metal)의 충돌은 끊임없는 자기 혁신과 제련의 삶을 의미합니다.",
      "재물운을 뜻하는 수(Water) 기운이 시주(Time)에 머물러 말년의 풍요가 예상됩니다.",
      "전략적 파트너십이 향후 3년 주기의 성패를 결정짓는 핵심 요소가 될 것입니다.",
      "감정적인 투자는 지양하되, 기술적인 자산에 집중하는 것이 유리한 흐름입니다.",
      "창의적 잠재력은 목(Tree)의 기운과 동기화될 때 비로소 폭발적으로 발현됩니다.",
      "조직 관리보다는 독립적인 전문성을 바탕으로 한 확장이 더 큰 결실을 맺습니다."
    ]
  };

  return (
    <main className="min-h-screen bg-[#02040a] text-white p-6 md:p-12 font-sans selection:bg-purple-500/30 overflow-x-hidden">
      
      {/* 🛰️ DASHBOARD HEADER */}
      <header className="max-w-6xl mx-auto flex justify-between items-end mb-16 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tighter italic uppercase mb-2">
            Life<span className="text-purple-400">Code</span> Vault
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 uppercase tracking-widest">
              {userData.tier} Class Access
            </span>
            <span className="text-[10px] text-slate-500 font-mono">ID: {userData.name}_COSMIC_COORD</span>
          </div>
        </div>
        <Link href="/" className="text-[10px] font-bold text-slate-500 hover:text-white transition uppercase tracking-[0.3em]">
          Exit System
        </Link>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* 🔳 LEFT: THE ENERGY MATRIX (8-Pillar) */}
        <div className="lg:col-span-2 space-y-10">
          <section className="relative bg-white/[0.02] border border-white/10 rounded-[3rem] p-10 md:p-14 backdrop-blur-3xl shadow-2xl overflow-hidden">
            {/* 배경에 흐릿한 태양계 효과 */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full" />
            
            <h2 className="text-[9px] font-bold tracking-[0.5em] text-slate-600 uppercase mb-12 text-center">Temporal Energy Matrix</h2>
            
            <div className="grid grid-cols-4 gap-4 md:gap-8">
              {['TIME', 'DAY', 'MONTH', 'YEAR'].map((pos) => {
                const p = pos.toLowerCase() as keyof typeof userData.coordinates;
                const data = userData.coordinates[p];
                return (
                  <div key={pos} className="flex flex-col gap-6">
                    <div className="text-center text-[9px] font-black text-slate-500 tracking-widest uppercase">{pos}</div>
                    
                    {/* Sky Pillar (천간) - 지정된 황금색/보라색 톤 */}
                    <motion.div 
                      whileHover={{ scale: 1.05, borderColor: "rgba(168, 85, 247, 0.5)" }}
                      className="aspect-square rounded-[2rem] bg-black/60 border border-white/5 flex items-center justify-center text-5xl font-black shadow-inner transition-all group"
                    >
                      <span className="group-hover:text-purple-400 transition-colors">{data.sky}</span>
                    </motion.div>

                    {/* Land Pillar (지지) - 감청색/다크 톤 */}
                    <motion.div 
                      whileHover={{ scale: 1.05, borderColor: "rgba(59, 130, 246, 0.5)" }}
                      className="aspect-square rounded-[2rem] bg-white/[0.03] border border-white/5 flex items-center justify-center text-5xl font-black shadow-xl transition-all group"
                    >
                      <span className="group-hover:text-blue-400 transition-colors">{data.land}</span>
                    </motion.div>

                    <div className="text-center text-[8px] font-mono text-slate-600 uppercase tracking-tighter">
                      {data.element}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* 📊 ELEMENTAL DISTRIBUTION (오행 분포) */}
          <section className="grid grid-cols-5 gap-3">
            {['Tree', 'Fire', 'Earth', 'Metal', 'Water'].map((elem, idx) => (
              <div key={elem} className="bg-white/[0.01] border border-white/5 rounded-2xl p-5 text-center group hover:bg-white/[0.03] transition-all">
                <div className="text-[8px] font-bold text-slate-600 uppercase tracking-widest mb-3">{elem}</div>
                <div className="text-lg font-black text-slate-300 group-hover:text-white">20%</div>
              </div>
            ))}
          </section>
        </div>

        {/* 📜 RIGHT: CLASS-BASED ANALYSIS (계급별 해석) */}
        <div className="lg:col-span-1">
          <section className="h-full bg-gradient-to-b from-purple-900/10 to-transparent border border-white/10 rounded-[3rem] p-10 backdrop-blur-3xl sticky top-24">
            <div className="flex justify-between items-end mb-10 border-b border-white/5 pb-5">
              <h3 className="text-xl font-black tracking-tighter italic uppercase text-white">
                Cosmic<br/>Intelligence
              </h3>
              <span className="text-[10px] font-mono text-purple-400 font-bold uppercase">{userData.tier} LEVEL</span>
            </div>

            <div className="space-y-8">
              {userData.analysis.map((line, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={idx} 
                  className="flex gap-4 items-start group"
                >
                  <span className="text-[10px] font-mono text-slate-700 mt-1 font-bold group-hover:text-purple-500 transition-colors italic">0{idx + 1}</span>
                  <p className="text-[13px] text-slate-400 font-light leading-relaxed group-hover:text-slate-200 transition-colors">
                    {line}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* 업그레이드 유도 섹션 */}
            {userData.tier !== 'Emperor' && (
              <div className="mt-12 p-8 rounded-[2rem] bg-white/5 border border-dashed border-white/10 text-center group hover:border-purple-500/50 transition-all cursor-pointer">
                <p className="text-[9px] text-slate-500 mb-4 uppercase tracking-[0.2em]">Unlock 16 more lines</p>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 group-hover:text-white transition-all">
                  Upgrade to Noble Class →
                </span>
              </div>
            )}
          </section>
        </div>

      </div>

      {/* 🧬 FOOTER: 의기천추 시그니처 */}
      <footer className="max-w-6xl mx-auto mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h4 className="text-lg font-black tracking-tighter uppercase italic mb-1">의기천추</h4>
          <p className="text-[9px] text-slate-600 tracking-[0.4em] uppercase font-bold">K-upfate High-End Destiny Engineering</p>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="flex gap-8">
            <a href="https://www.youtube.com/@K-upfate" target="_blank" className="text-[9px] font-bold text-slate-500 hover:text-red-500 transition-colors tracking-widest uppercase">YouTube</a>
            <a href="https://www.facebook.com/choewan.yong" target="_blank" className="text-[9px] font-bold text-slate-500 hover:text-blue-500 transition-colors tracking-widest uppercase">Facebook</a>
          </div>
          <p className="text-[8px] text-slate-800 tracking-widest uppercase font-medium">© 2026 LifeCode System. All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  );
}
