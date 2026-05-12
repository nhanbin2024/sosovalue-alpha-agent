import { CheckCircle2, ShieldAlert } from "lucide-react";
import type { SignalResult } from "@/lib/types";

export default function RiskMatrix({ signal }: { signal: SignalResult }) {
  return (
    <div className="glass rounded-3xl p-5" id="risk-monitor">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-brand">Risk control</p>
          <h2 className="mt-2 text-xl font-bold">Confirmation checklist</h2>
        </div>
        <ShieldAlert className="h-6 w-6 text-warning" />
      </div>

      <div className="mt-5 space-y-3">
        {signal.warnings.map((warning) => (
          <div key={warning} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
            <p className="text-sm leading-6 text-white/65">{warning}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-warning/20 bg-warning/10 p-4 text-sm leading-6 text-warning">
        The product does not auto-trade in Wave 1. It provides a research signal and requires user confirmation before any future SoDEX execution step.
      </div>
    </div>
  );
}
