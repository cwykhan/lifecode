'use client';
import React from 'react';

const GATES = [
  {
    id: 'EMPEROR',
    name: 'EMPEROR GATE',
    price: '$50',
    desc: 'Strategic Life Interpretation & Master Analysis',
    color: 'from-purple-600 via-indigo-950 to-black',
    border: 'border-purple-500/50',
    shadow: 'shadow-[0_0_50px_rgba(168,85,247,0.4)]',
    text: 'text-purple-400'
  },
  {
    id: 'NOBILITY',
    name: 'NOBILITY GATE',
    price: '$30',
    desc: 'Advanced HSE Analysis & Flow Insights',
    color: 'from-blue-700 via-slate-900 to-black',
    border: 'border-blue-500/30',
    shadow: 'shadow-[0_0_30px_rgba(59,130,246,0.3)]',
    text: 'text-blue-400'
  },
  {
    id: 'MERCHANTS',
    name: 'MERCHANTS GATE',
    price: '$15',
    desc: 'Standard Destiny Sector Analysis',
    color: 'from-emerald-700 via-zinc-900 to-black',
    border: 'border-emerald-500/30',
    shadow: 'shadow-[0_0_30px_rgba(16,185,129,0.2)]',
    text: 'text-emerald-400'
  },
  {
    id: 'COMMONS',
    name: 'COMMONS GATE',
    price: '$5',
    desc: 'Brief One-line Cosmic Summary',
    color: 'from-slate-700 via-black to-black',
    border: 'border-white/10',
    shadow: 'shadow-none',
    text: 'text-slate-400'
  }
];

export default function GateBanners({ onPurchase }: { onPurchase: (id: string) => void }) {
  return (
    <div className="w-full max-w-2xl space-y-6">
      {GATES.map((gate) => (
        <button
          key={gate.id}
          onClick={() => onPurchase(gate.id)}
          className={`w-full group relative overflow-hidden rounded-[2.5rem] border-2 ${gate.border} bg-gradient-to-br ${gate.color} p-1 transition-all hover:scale-[1.02] active:scale-[0.98] ${gate.shadow}`}
        >
          <div className="relative flex items-center justify-between px-10 py-8 bg-black/40 rounded-[2.3rem] backdrop-blur-md">
            {/* Left: Info */}
            <div className="text-left">
              <h3 className={`text-3xl font-black italic tracking-tighter ${gate.text} group-hover:text-white transition-colors`}>
                {gate.name}
              </h3>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 font-bold">
                {gate.desc}
              </p>
            </div>

            {/* Right: Price */}
            <div className="flex flex-col items-end">
              <span className="text-4xl font-black text-white tracking-tighter">
                {gate.price}
              </span>
              <div className="h-[2px] w-12 bg-white/20 mt-2 group-hover:w-full transition-all duration-500" />
            </div>

            {/* Futuristic Decor Element */}
            <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
              <div className="w-4 h-4 border-t-2 border-r-2 border-white"></div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
