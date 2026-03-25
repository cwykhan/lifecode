'use client';
import React, { useState } from 'react';
import { PlanTier, PLANS } from '@/lib/plans';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const startAnalysis = async () => {
    setLoading(true);
    setTimeout(() => {
      const config = PLANS.EMPEROR;
      setResult({
        tier: config.name,
        analysis: Array(config.lines).fill(0).map((_, i) => `[Cosmic Node-${i+1}] 분석 데이터 동기화 완료.`)
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#020408] text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">LifeCode.ai</h1>
      
      <div className="grid grid-cols-4 gap-4 p-8 bg-white/5 rounded-[2.5rem] border border-white/10 mb-8">
        {['F','e','f','W'].map((s, i) => (
          <div key={i} className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-xl">{s}</div>
        ))}
        {['M','w','t','f'].map((s, i) => (
          <div key={i} className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center text-3xl font-bold">{s}</div>
        ))}
      </div>

      <button onClick={startAnalysis} disabled={loading} className="px-12 py-4 bg-blue-600 rounded-xl font-bold hover:scale-105 transition-all">
        {loading ? "분석 중..." : "START DEEP ANALYSIS"}
      </button>

      {result && (
        <div className="mt-8 p-6 bg-white/5 rounded-2xl w-full max-w-lg border border-blue-500/30">
          <h3 className="text-blue-400 font-bold mb-4">{result.tier} 등급 분석 결과</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {result.analysis.map((line: string, i: number) => <p key={i} className="text-sm opacity-80">{line}</p>)}
          </div>
        </div>
      )}
    </main>
  );
}
