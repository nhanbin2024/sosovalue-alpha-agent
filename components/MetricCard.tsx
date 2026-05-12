import { ArrowDownRight, ArrowUpRight, LucideIcon } from "lucide-react";
import { clsx } from "clsx";

type MetricCardProps = {
  label: string;
  value: string;
  detail: string;
  trend?: number;
  icon: LucideIcon;
};

export default function MetricCard({ label, value, detail, trend, icon: Icon }: MetricCardProps) {
  const positive = typeof trend === "number" && trend >= 0;
  return (
    <div className="glass rounded-3xl p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20">
      <div className="mb-5 flex items-center justify-between">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <Icon className="h-5 w-5 text-brand" />
        </div>
        {typeof trend === "number" && (
          <div
            className={clsx(
              "flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
              positive ? "bg-positive/15 text-positive" : "bg-danger/15 text-danger"
            )}
          >
            {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
            {Math.abs(trend).toFixed(1)}%
          </div>
        )}
      </div>
      <p className="text-sm text-white/55">{label}</p>
      <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">{value}</h3>
      <p className="mt-2 text-sm text-white/45">{detail}</p>
    </div>
  );
}
