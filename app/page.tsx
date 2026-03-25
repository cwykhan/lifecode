'use client';
import React, { useState } from 'react';
import { PlanTier, TIERS } from '@/lib/plans';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const startAnalysis = async () => {
    setLoading(true);
    // 빌드 테스트용: 실제 API 호출 대신 로컬 시뮬레이션
    setTimeout(() => {
      const config = TIERS.EMPEROR;
      setResult({
        tier: config.name,
        analysis: Array(config.lines).fill(0).map((_, i) => `[Node-${i+1}] 분석 중...`)
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#020408] text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">LifeCode.ai</h1>
      
      {/* 천원지방 UI 적용 섹션 */}
      <div className="grid grid-cols-4 gap-4 p-8 bg-white/5 rounded-[2.5rem] border border-white/10 mb-8">
        {/* 천간 (원형) */}
        {['F','e','f','W'].map((s, i) => (
          <div key={i} className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-xl">{s}</div>
        ))}
        {/* 지지 (네모) */}
        {['M','w','t','f'].map((s, i) => (
          <div key={i} className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center text-3xl font-bold">{s}</div>
        ))}
      </div>

      <button onClick={startAnalysis} disabled={loading} className="px-12 py-4 bg-blue-600 rounded-xl font-bold hover:scale-105 transition-all">
        {loading ? "분석 중..." : "START DEEP ANALYSIS"}
      </button>

      {result && (
        <div className="mt-8 p-6 bg-white/5 rounded-2xl w-full max-w-lg">
          <h3 className="text-blue-400 font-bold mb-4">{result.tier} 등급 분석 결과</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {result.analysis.map((line: string, i: number) => <p key={i} className="text-sm opacity-80">{line}</p>)}
          </div>
        </div>
      )}
    </main>
  );
}
