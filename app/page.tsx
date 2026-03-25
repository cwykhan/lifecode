'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./components/ui/button";
import { Globe, ShieldCheck, Zap, Orbit } from "lucide-react";

// 계급별 설정 (노예, 평민, 상인, 귀족, 왕/황제)
const TIERS = {
  SLAVE: { name: "노예", price: 0, lines: 2 },
  COMMONER: { name: "평민", price: 5, lines: 4 },
  MERCHANT: { name: "상인", price: 15, lines: 8 },
  NOBLE: { name: "귀족", price: 30, lines: 16 },
  EMPEROR: { name: "왕·황제", price: 50, lines: 32 },
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // 분석 시작 함수 (cwykhan님은 테스트를 위해 EMPEROR 등급으로 고정 출력되게 설정함)
  const startAnalysis = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const userTier = TIERS.EMPEROR; // cwykhan님 전용 황제 등급 고정
      setResult({
        tier: userTier,
        title: "THE IMPERIAL ARCHITECT (cwykhan)",
        // 황제 등급에 걸맞는 32줄 분량의 분석 데이터 (예시)
        analysis: Array(userTier.lines).fill(0).map((_, i) => 
          `[Node-${i + 1}] Analyzing cosmic infrastructure... ${i === 0 ? "Core frequency aligns with 'T' (Tree/목)." : "Global scaling potential detected."}`
        )
      });
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-[#020408] text-slate-200 overflow-hidden relative font-sans selection:bg-blue-500/30">
      
      {/* 🌌 배경 섹션: 업로드하신 lifecode_wallpaper.png 적용, 한자 제거 및 미니멀화 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#020408]" />
        <img 
          src="/images/lifecode_wallpaper.png" 
          alt="LifeCode Universe" 
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen"
        />
        {/* 원형 천문도를 더 돋보이게 하고 한자를 가리기 위한 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(2,4,8,0.1),#020408_60%)] opacity-95" />
        {/* 텍스트 가독성을 위한 상하단 그라데이션 암전 처리 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020408] via-transparent to-[#020408] opacity-80" />
        {/* 아키텍트 감성의 미세한 그리드 레이어 */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      {/* 🖥️ 메인 콘텐츠 영역: Grid로 완벽한 정중앙 정렬 구현 */}
      <div className="relative z-10 w-full min-h-screen grid place-items-center p-6">
        <div className="w-full max-w-5xl flex flex-col items-center">
            
            {/* Header - 상단에 작게 배치 (정중앙 집중을 위해 여백 조정) */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-8 self-center w-full">
              <h1 className="text-4xl font-black tracking-tighter mb-1.5 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">
                LifeCode<span className="text-blue-500">.ai</span>
              </h1>
              <p className="text-slate-500 text-[9px] tracking-[0.4em] uppercase font-bold">cwykhan Global Infrastructure</p>
            </motion.div>

            {/* 🔮 사주 명식: 8글자 시스템 (천간 축소 + 지지 확대) - 원형 정중앙에 위치 */}
            {/* 💡 '천원지방' 원리 적용 섹션 */}
            <div className="grid grid-cols-4 gap-4 mb-14 p-8 bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-xl shadow-2xl relative">
                <Orbit className="absolute -top-6 -right-6 text-blue-500/20 w-16 h-16" />
                
                {/* 🔵 상위 천간 (天圓 - 완벽한 원) */}
                <SajuCell sym="F" el="Fire" label="YEAR" shape="round" isStem />
                <SajuCell sym="e" el="earth" label="MONTH" shape="round" isStem />
                <SajuCell sym="f" el="fire" label="DAY" shape="round" isStem />
                <SajuCell sym="W" el="Water" label="TIME" shape="round" isStem />
                
                {/* ⬛ 하위 지지 (地方 - 각진 네모) */}
                <SajuCell sym="M" el="Metal" shape="square" isStem={false} />
                <SajuCell sym="w" el="water" shape="square" isStem={false} />
                <SajuCell sym="t" el="Tree" shape="square" isStem={false} /> {/* Tree 심볼 t 적용 */}
                <SajuCell sym="f" el="fire" shape="square" isStem={false} />
            </div>

            {/* Action / Result Area - 사주박스 바로 아래 배치 */}
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div key="cta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="text-center w-full max-w-xl">
                  <h2 className="text-3xl font-bold text-white mb-7 tracking-tight leading-tight">
                    THE STARS HAVE ALIGNED<br/>
                    <span className="text-blue-400 font-black">TO REVEAL YOUR DESTINY.</span>
                  </h2>
                  <Button 
                    onClick={startAnalysis}
                    disabled={loading}
                    className="px-16 h-18 bg-blue-600 hover:bg-blue-500 text-lg font-black rounded-xl transition-all hover:scale-105 shadow-[0_0_40px_rgba(37,99,235,0.3)] w-full"
                  >
                    {loading ? "DECODING SYNC..." : "START DEEP ANALYSIS"}
                  </Button>
                  <div className="mt-7 flex justify-center gap-5 text-slate-600 w-full text-[10px] font-bold tracking-widest uppercase">
                    <div className="flex items-center gap-1.5"><ShieldCheck size={14}/> Secure</div>
                    <div className="flex items-center gap-1.5"><Globe size={14}/> Global API</div>
                    <div className="flex items-center gap-1.5"><Zap size={14}/> 50ms Latency</div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full bg-[#0a0c14]/80 border-2 border-blue-500/20 rounded-[3rem] p-12 relative overflow-hidden backdrop-blur-xl">
                    {/* 결과 화면도 중앙에 위치 */}
                  <div className="absolute top-0 right-0 p-8 opacity-5 text-blue-500"><ShieldCheck size={180}/></div>
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <p className="text-blue-500 text-xs font-black tracking-[0.3em] mb-2">RANK: {result.tier.name} ($50)</p>
                      <h3 className="text-3xl font-black text-white">{result.title}</h3>
                    </div>
                    <Button variant="outline" onClick={() => setResult(null)} className="border-white/10 hover:bg-white/5 text-xs">Reset</Button>
                  </div>
                  <div className="space-y-4 max-h-[350px] overflow-y-auto pr-4 custom-scrollbar">
                    {result.analysis.map((line: string, i: number) => (
                      <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="text-sm text-slate-300 font-medium border-l-2 border-blue-500/40 pl-6 leading-relaxed">
                        {line}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Footer - 하단에 작게 배치 */}
            <footer className="mt-16 text-center opacity-40">
              <p className="text-slate-600 text-[9px] font-bold tracking-[0.5em] uppercase italic">Created by 의기천추</p>
            </footer>
        </div>
      </div>
    </main>
  );
}

// 사주 셀 컴포넌트 (shape 프롭 추가)
function SajuCell({ sym, el, label, shape = "square", isStem }: { sym: string, el: string, label?: string, shape?: "round" | "square", isStem: boolean }) {
  // Tree 심볼 강제 규칙 적용 (T/t)
  const isTree = el.toLowerCase() === 'tree';
  const displaySym = isTree ? (isStem ? 'T' : 't') : sym;
  // 오행 한글 병용 (wood 등 영문 포함)
  const elementLabel = isTree ? `Tree (목)` : el === 'fire' || el === 'Fire' ? `Fire (화)` : el;

  return (
    <div className="flex flex-col items-center group transition-all duration-300 relative">
      {label && <span className="text-[9px] text-slate-700 font-black tracking-widest mb-3 group-hover:text-slate-500 transition-colors">{label}</span>}
      <div className={`
        flex items-center justify-center border border-white/5 bg-white/3 transition-all duration-500 relative
        ${isStem ? 'w-14 h-14' : 'w-20 h-20 bg-white/5 border-white/10 shadow-lg group-hover:border-blue-500/20 group-hover:scale-105'}
        ${shape === "round" ? 'rounded-full' : 'rounded-2xl'} // 천원지방 형태 적용
      `}>
          {/* 완벽한 원을 위한 특별 처리 */}
          {shape === "round" && <div className="absolute inset-0 border-2 border-dashed border-white/5 rounded-full scale-105" />}
        <span className={`font-black tracking-tighter transition-colors group-hover:text-blue-100 ${isStem ? 'text-2xl text-slate-400' : 'text-4xl text-white'}`}>
          {displaySym}
        </span>
      </div>
      <span className="mt-3 text-[9px] font-bold text-slate-600 tracking-tighter uppercase whitespace-nowrap group-hover:text-slate-400 transition-colors">
        {displaySym} {elementLabel}
      </span>
    </div>
  );
}



