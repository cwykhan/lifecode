"use client";

import { motion } from "framer-motion";

export default function Home() {
  // 행성 구성: 지정하신 색상 반영 및 사이즈/궤도 반으로 축소
  const orbits = [
    { name: "Mercury", size: "w-1 h-1", color: "bg-[#003153]", duration: 10, radius: 30 }, // 감청색
    { name: "Venus", size: "w-2 h-2", color: "bg-white", duration: 15, radius: 50 },      // 하얀색
    { name: "Earth", size: "w-2.5 h-2.5", color: "bg-yellow-400", duration: 20, radius: 75 }, // 노랑
    { name: "Mars", size: "w-1.5 h-1.5", color: "bg-red-600", duration: 25, radius: 100 },   // 빨강
    { name: "Jupiter", size: "w-5 h-5", color: "bg-blue-600", duration: 40, radius: 140 },  // 파란색
  ];

  return (
    <main className="relative min-h-screen bg-[#02040a] text-white overflow-hidden font-sans">
      
      {/* 📡 [오른쪽 상단] 데이터 좌표 */}
      <div className="absolute top-8 right-8 z-50 flex gap-3">
        {["F", "e", "f", "W"].map((code, i) => (
          <div key={i} className="bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-2xl p-5 w-20 h-28 flex flex-col items-center justify-center shadow-2xl">
            <span className="text-[7px] font-bold text-slate-600 tracking-widest absolute top-3 uppercase">
              {["YEAR", "MONTH", "DAY", "TIME"][i]}
            </span>
            <span className="text-3xl font-black">{code}</span>
            <span className="text-[6px] font-mono text-purple-500/50 absolute bottom-3 uppercase">
              {["FIRE", "EARTH", "FIRE", "WATER"][i]}
            </span>
          </div>
        ))}
      </div>

      {/* ☀️ [중앙] 태양계 시뮬레이션 (색상 및 크기 조정) */}
      <section className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* 태양: 황금색 */}
        <div className="w-10 h-10 bg-[#FFD700] rounded-full shadow-[0_0_50px_rgba(255,215,0,0.4)] z-10 relative">
          <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" />
        </div>

        {/* 행성 궤도 및 회전 */}
        {orbits.map((planet, i) => (
          <motion.div
            key={i}
            className="absolute border border-white/5 rounded-full"
            style={{ width: planet.radius * 2, height: planet.radius * 2 }}
            animate={{ rotate: 360 }}
            transition={{ duration: planet.duration, repeat: Infinity, ease: "linear" }}
          >
            <div 
              className={`absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 ${planet.size} ${planet.color} rounded-full shadow-lg`}
            >
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[5px] text-slate-600 font-bold uppercase whitespace-nowrap opacity-50">
                {planet.name}
              </span>
            </div>
          </motion.div>
        ))}
      </section>

      {/* ✍️ [중앙 상단] 문구 */}
      <div className="absolute top-1/4 w-full text-center z-20 pointer-events-none px-6">
        <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase leading-tight mb-4">
          The stars have aligned <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">to reveal your destiny.</span>
        </h2>
        <p className="text-slate-500 text-[8px] tracking-[0.6em] uppercase font-light">
          Initialize deep sync to decipher your universal path
        </p>
      </div>

      {/* 🧬 [하단] 의기천추 시그니처 & 정보 */}
      <section className="absolute bottom-0 w-full z-30 pb-10 px-6 flex flex-col items-center gap-8 bg-gradient-to-t from-[#02040a] to-transparent">
        
        <button className="px-12 py-4 rounded-full bg-white text-black font-black text-[10px] tracking-[0.4em] uppercase hover:bg-purple-500 hover:text-white transition-all shadow-xl">
          Start Deep Analysis
        </button>

        <div className="text-center w-full max-w-4xl border-t border-white/5 pt-6">
          <div className="flex flex-col items-center gap-1 mb-4">
            <span className="text-[8px] font-bold tracking-[0.5em] text-slate-700 uppercase">Created by</span>
            <h3 className="text-xl font-black tracking-tighter text-white uppercase italic">의기천추</h3>
            
            <div className="flex gap-8 mt-2">
              <a href="https://www.youtube.com/@K-upfate" target="_blank" rel="noopener noreferrer" className="text-[9px] font-bold text-red-500 hover:text-white transition-colors tracking-widest border-b border-red-500/20 pb-1">YOUTUBE</a>
              <a href="https://www.facebook.com/choewan.yong" target="_blank" rel="noopener noreferrer" className="text-[9px] font-bold text-blue-500 hover:text-white transition-colors tracking-widest border-b border-blue-500/20 pb-1">FACEBOOK</a>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-1 mb-4 text-[9px] font-mono text-slate-500">
            <p><span className="text-purple-600 font-bold mr-2">MAIL_01</span> janus101@live.co.kr</p>
            <p><span className="text-purple-600 font-bold mr-2">MAIL_02</span> chldhksdyd@gmail.com</p>
          </div>
          
          <div className="opacity-30">
            <p className="text-[7px] font-medium tracking-[0.3em] text-slate-700 uppercase">
              © 2026 LifeCode. All Rights Reserved. Created by 의기천추.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
