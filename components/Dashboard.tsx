"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bot,
  BrainCircuit,
  DatabaseZap,
  Gauge,
  Loader2,
  Radar,
  Search,
  ShieldCheck,
  TrendingUp
} from "lucide-react";
import ChartCard from "./ChartCard";
import MetricCard from "./MetricCard";
import NewsPanel from "./NewsPanel";
import RiskMatrix from "./RiskMatrix";
import Sidebar from "./Sidebar";
import SignalBadge from "./SignalBadge";
import { compactCurrency, fullCurrency } from "@/lib/format";
import { supportedAssets } from "@/lib/mock-data";
import type { ApiResponse, AssetSymbol } from "@/lib/types";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 }
};

export default function Dashboard() {
  const [asset, setAsset] = useState<AssetSymbol>("BTC");
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      try {
        const response = await fetch(`/api/market?asset=${asset}`, { cache: "no-store" });
        const payload = (await response.json()) as ApiResponse;
        if (active) setData(payload);
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [asset]);

  const filteredNews = useMemo(() => {
    if (!data) return [];
    if (!query.trim()) return data.asset.news;
    return data.asset.news.filter((news) => news.title.toLowerCase().includes(query.toLowerCase()));
  }, [data, query]);

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="glass flex items-center gap-3 rounded-3xl px-6 py-5 text-white/70">
          <Loader2 className="h-5 w-5 animate-spin text-brand" />
          Loading Alpha Agent...
        </div>
      </main>
    );
  }

  const { asset: market, signal, mode, updatedAt } = data;

  return (
    <main className="min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-0 grid-mask opacity-70" />
      <div className="relative z-10 flex">
        <Sidebar />

        <section className="w-full px-4 py-5 sm:px-6 lg:px-8">
          <motion.div variants={container} initial="hidden" animate="show" className="mx-auto max-w-7xl">
            <motion.header variants={item} className="glass rounded-[2rem] p-5 lg:p-8" id="dashboard">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                  <div className="mb-5 flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-brand/25 bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand">
                      Buildathon Wave 1
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/55">
                      {mode === "live" ? "Live SoSoValue API" : "Demo data mode"}
                    </span>
                  </div>
                  <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                    SoSoValue Alpha Agent
                  </h1>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-white/62 sm:text-lg">
                    An AI research dashboard that turns market data, news flow and risk metrics into a clear signal workflow for retail crypto investors.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <a href="#strategy-brief" className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-ink transition hover:translate-y-[-2px]">
                      View agent brief <ArrowRight className="h-4 w-4" />
                    </a>
                    <a href="#risk-monitor" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/75 transition hover:bg-white/10">
                      Risk controls <ShieldCheck className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <div className="signal-gradient rounded-[2rem] border border-white/10 p-5 shadow-glow lg:w-[360px]">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-white/60">Current signal</p>
                    <SignalBadge value={signal.regime} />
                  </div>
                  <div className="mt-6 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-5xl font-black tracking-tight">{signal.score}</p>
                      <p className="mt-2 text-sm text-white/55">Alpha score / 100</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{signal.confidence}%</p>
                      <p className="mt-2 text-sm text-white/55">Confidence</p>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <p className="text-xs text-white/45">Action</p>
                      <div className="mt-2"><SignalBadge value={signal.action} /></div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <p className="text-xs text-white/45">Risk</p>
                      <div className="mt-2"><SignalBadge value={signal.risk} /></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.header>

            <motion.div variants={item} className="mt-5 flex flex-col gap-3 rounded-3xl border border-white/10 bg-black/20 p-3 backdrop-blur md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap gap-2">
                {supportedAssets.map((symbol) => (
                  <button
                    key={symbol}
                    onClick={() => setAsset(symbol)}
                    className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                      asset === symbol ? "bg-brand text-ink" : "bg-white/5 text-white/60 hover:bg-white/10"
                    }`}
                  >
                    {symbol}
                  </button>
                ))}
              </div>
              <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 md:w-80">
                <Search className="h-4 w-4 shrink-0 text-white/35" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search news drivers..."
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                />
              </div>
            </motion.div>

            {loading && (
              <div className="mt-4 flex items-center gap-2 text-sm text-white/45">
                <Loader2 className="h-4 w-4 animate-spin" /> Refreshing market signal...
              </div>
            )}

            <motion.div variants={container} className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <motion.div variants={item}>
                <MetricCard label="Asset price" value={fullCurrency(market.price)} detail={`${market.name} spot reference`} trend={market.change24h} icon={TrendingUp} />
              </motion.div>
              <motion.div variants={item}>
                <MetricCard label="24h volume" value={compactCurrency(market.volume24h)} detail="Trading activity proxy" icon={BarChart3} />
              </motion.div>
              <motion.div variants={item}>
                <MetricCard label="Social momentum" value={`${market.socialMomentum}/100`} detail="News and attention signal" icon={Radar} />
              </motion.div>
              <motion.div variants={item}>
                <MetricCard label="Liquidity quality" value={`${market.liquidityScore}/100`} detail="Execution readiness proxy" icon={DatabaseZap} />
              </motion.div>
            </motion.div>

            <div className="mt-5 grid gap-5 xl:grid-cols-[1.45fr_0.9fr]">
              <motion.div variants={item}>
                <ChartCard asset={market} />
              </motion.div>

              <motion.div variants={item} className="space-y-5">
                <div className="glass rounded-3xl p-5" id="strategy-brief">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-brand">AI strategy brief</p>
                      <h2 className="mt-2 text-xl font-bold">Agent explanation</h2>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      <BrainCircuit className="h-5 w-5 text-brand" />
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-7 text-white/68">{signal.summary}</p>
                  <div className="mt-5 space-y-3">
                    {signal.drivers.map((driver) => (
                      <div key={driver} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-sm text-white/65">
                        <Activity className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                        <span>{driver}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass rounded-3xl p-5">
                  <div className="flex items-center gap-3">
                    <Bot className="h-5 w-5 text-brand" />
                    <h2 className="font-bold">Workflow</h2>
                  </div>
                  <div className="mt-5 grid gap-3">
                    {["SoSoValue data input", "Signal engine scoring", "Risk confirmation", "Actionable user output"].map((step, index) => (
                      <div key={step} className="flex items-center gap-3 rounded-2xl bg-white/[0.04] p-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand/15 text-xs font-bold text-brand">{index + 1}</span>
                        <span className="text-sm text-white/65">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="mt-5 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
              <motion.div variants={item}>
                <NewsPanel news={filteredNews} />
              </motion.div>
              <motion.div variants={item}>
                <RiskMatrix signal={signal} />
              </motion.div>
            </div>

            <motion.footer variants={item} className="my-6 rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-sm text-white/45">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <p>
                  Last update: {new Date(updatedAt).toLocaleString()} · Mode: {mode === "live" ? "Live API" : "Mock demo"}
                </p>
                <p className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning" /> Research demo only. Not financial advice.
                </p>
              </div>
            </motion.footer>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
