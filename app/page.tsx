
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* NAVBAR */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-slate-950/70 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="text-lg sm:text-xl font-bold tracking-wide">
            Life<span className="text-purple-400">Code</span>
          </div>

          <nav className="hidden md:flex gap-8 text-slate-300 text-sm">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#demo" className="hover:text-white transition">Preview</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
          </nav>

          <div className="hidden md:flex gap-4">
            <Link href="/dashboard" className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 transition text-sm">
              Dashboard
            </Link>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-2xl">
            ☰
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800 px-6 py-6 space-y-4 text-slate-300">
            <a href="#features" onClick={() => setMobileOpen(false)}>Features</a>
            <a href="#demo" onClick={() => setMobileOpen(false)}>Preview</a>
            <a href="#pricing" onClick={() => setMobileOpen(false)}>Pricing</a>
            <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="block pt-2 text-purple-400">
              Dashboard
            </Link>
          </div>
        )}
      </header>

      <section className="relative flex flex-col items-center text-center px-4 sm:px-6 pt-40 sm:pt-48 pb-24 sm:pb-32">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold leading-tight max-w-5xl"
        >
          Your Fate.
          <br className="sm:hidden" />
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Decoded by AI.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-6 sm:mt-8 text-base sm:text-xl text-slate-300 max-w-2xl"
        >
          Enterprise-grade AI Saju intelligence delivering personality precision, career alignment, and predictive life-cycle forecasting.
        </motion.p>

        <motion.a
          href="#pricing"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-10 sm:mt-12 px-8 sm:px-10 py-3 sm:py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-base sm:text-lg font-semibold shadow-2xl hover:scale-105 transition-transform"
        >
          Start My Analysis
        </motion.a>
      </section>

      <footer className="text-center py-12 sm:py-16 text-slate-500 text-xs sm:text-sm border-t border-slate-800">
        © {new Date().getFullYear()} LifeCode — AI Saju Intelligence Platform
      </footer>
    </main>
  );
}
