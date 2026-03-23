'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "./components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, Shield, Globe } from "lucide-react";

export default function Home() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<any>(null);

  // 분석 시뮬레이션 기능 강화
  const startAnalysis = () => {
    setIsAnalyzing(true);
    setResult(null);
    setProgress(0);
  };

  useEffect(() => {
    if (isAnalyzing && progress < 100) {
      const timer = setTimeout(() => setProgress(prev => prev + 2), 50);
      return () => clearTimeout(timer);
    } else if (progress === 100) {
      setTimeout(() => {
        setIsAnalyzing(false);
        setResult({
          fate: "Heavenly Pioneer",
          elements: { wood: 40, fire: 20, earth: 10, metal: 25, water: 5 },
          summary: "Your digital 'Ki' is exceptionally strong in technical architecture."
        });
      }, 800);
    }
  }, [isAnalyzing, progress]);

  return (
    <main className="min-h-screen bg-[#02040a] text-slate-200 overflow-hidden relative font-sans">
      {/* 🌌 프리미엄 배경: 움직이는 성운 및 격자 시스템 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,30,70,0.3),transparent)]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-32">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
          <h1 className="text-6xl font-black tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">
            LifeCode<span className="text-blue-500">.ai</span>
          </h1>
          <p className="text-slate-500 tracking-widest uppercase text-sm font-light">Ancient Wisdom × Digital Architecture</p>
        </motion.div>

        {/* Hero Section */}
        <section className="relative group flex flex-col items-center">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000" />
          
          <div className="relative w-full bg-[#0a0f1a]/80 border border-white/10 backdrop-blur-3xl rounded-[2.5rem] p-12 text-center shadow-2xl">
            {!isAnalyzing && !result && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="mb-10 flex justify-center space-x-4">
                  <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20"><Globe className="text-blue-400 w-8 h-8" /></div>
                  <div className="p-4 bg-purple-500/10 rounded-2xl border border-purple-500/20"><Zap className="text-purple-400 w-8 h-8" /></div>
                </div>
                <h2 className="text-3xl font-bold text-white mb-6">Ready to decode your destiny?</h2>
                <Button 
                  onClick={startAnalysis}
                  className="bg-white text-black hover:bg-blue-500 hover:text-white px-12 h-16 rounded-2xl font-bold text-xl transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                >
                  Initialize Decoding
                </Button>
              </motion.div>
            )}

            {/* 기능: 분석 프로세스 애니메이션 */}
            {isAnalyzing && (
              <div className="py-10">
                <div className="text-5xl font-mono font-bold mb-8 text-blue-500">{progress}%</div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-6">
                  <motion.div className="h-full bg-blue-500" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
                </div>
                <p className="text-slate-400 animate-pulse font-mono tracking-tighter text-sm">
                  {progress < 40 ? ">> Mapping Star Coordinates..." : progress < 80 ? ">> Calculating Wuxing Imbalance..." : ">> Generating LifeCode Report..."}
                </p>
              </div>
            )}

            {/* 기능: 프리미엄 결과창 */}
            {result && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-left space-y-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-6">
                  <h3 className="text-4xl font-black text-white">{result.fate}</h3>
                  <span className="px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-bold border border-blue-500/30">ELITE CLASS</span>
                </div>
                
                <div className="grid grid-cols-5 gap-4">
                  {Object.entries(result.elements).map(([el, val]: any) => (
                    <div key={el} className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                      <div className="text-[10px] text-slate-500 uppercase mb-2">{el}</div>
                      <div className="text-xl font-bold text-slate-200">{val}%</div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-br from-blue-600/10 to-transparent p-6 rounded-2xl border border-blue-500/10">
                  <p className="text-lg text-slate-300 leading-relaxed italic">"{result.summary}"</p>
                </div>

                <Button variant="outline" onClick={() => setResult(null)} className="w-full border-white/10 hover:bg-white/5">Re-calibrate System</Button>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
