"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar, BarChart } from "recharts";
import type { AssetMarket } from "@/lib/types";
import { fullCurrency } from "@/lib/format";

type ChartCardProps = {
  asset: AssetMarket;
};

export default function ChartCard({ asset }: ChartCardProps) {
  return (
    <div className="glass rounded-3xl p-5" id="market-signals">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-brand">Market chart</p>
          <h2 className="mt-2 text-2xl font-bold">{asset.name} price and sentiment</h2>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right">
          <p className="text-xs text-white/45">Current price</p>
          <p className="text-lg font-bold">{fullCurrency(asset.price)}</p>
        </div>
      </div>

      <div className="mt-6 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={asset.chart} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6AE4FF" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6AE4FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey="time" stroke="rgba(255,255,255,0.45)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="rgba(255,255,255,0.45)" fontSize={12} tickLine={false} axisLine={false} width={70} />
            <Tooltip
              cursor={{ stroke: "rgba(255,255,255,0.18)" }}
              contentStyle={{ background: "#101322", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16 }}
            />
            <Area type="monotone" dataKey="price" stroke="#6AE4FF" strokeWidth={3} fill="url(#priceGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 h-44">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={asset.chart} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey="time" stroke="rgba(255,255,255,0.45)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="rgba(255,255,255,0.45)" fontSize={12} tickLine={false} axisLine={false} width={40} />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
              contentStyle={{ background: "#101322", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16 }}
            />
            <Bar dataKey="sentiment" fill="#8B5CF6" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
