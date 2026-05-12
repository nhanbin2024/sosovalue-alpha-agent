import { Activity, BarChart3, Bot, Gauge, Newspaper, ShieldCheck, Sparkles } from "lucide-react";

const items = [
  { label: "Dashboard", icon: BarChart3 },
  { label: "Market Signals", icon: Activity },
  { label: "News Intelligence", icon: Newspaper },
  { label: "Risk Monitor", icon: ShieldCheck },
  { label: "Strategy Brief", icon: Bot }
];

export default function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-72 border-r border-white/10 bg-black/20 px-5 py-6 backdrop-blur-xl lg:block">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/15 ring-1 ring-brand/30">
          <Sparkles className="h-5 w-5 text-brand" />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-white/40">SoSoValue</p>
          <h1 className="text-lg font-bold">Alpha Agent</h1>
        </div>
      </div>

      <nav className="mt-10 space-y-2">
        {items.map((item, index) => (
          <a
            key={item.label}
            href={`#${item.label.toLowerCase().replaceAll(" ", "-")}`}
            className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition hover:bg-white/8 ${
              index === 0 ? "bg-white/10 text-white" : "text-white/55"
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </a>
        ))}
      </nav>

      <div className="mt-10 rounded-3xl border border-brand/20 bg-brand/10 p-4">
        <Gauge className="h-5 w-5 text-brand" />
        <p className="mt-3 text-sm font-semibold text-white">Wave 1 Ready</p>
        <p className="mt-2 text-xs leading-5 text-white/55">
          Clear user value, data-to-signal workflow, API adapter, demo mode and README are included.
        </p>
      </div>
    </aside>
  );
}
