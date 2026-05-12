import { clsx } from "clsx";

type SignalBadgeProps = {
  value: "Bullish" | "Neutral" | "Bearish" | "Positive" | "Negative" | "Low" | "Medium" | "High" | "Watch" | "Consider Entry" | "Avoid";
};

export default function SignalBadge({ value }: SignalBadgeProps) {
  const className = clsx(
    "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
    ["Bullish", "Positive", "Low", "Consider Entry"].includes(value) && "border-positive/30 bg-positive/15 text-positive",
    ["Neutral", "Medium", "Watch"].includes(value) && "border-warning/30 bg-warning/15 text-warning",
    ["Bearish", "Negative", "High", "Avoid"].includes(value) && "border-danger/30 bg-danger/15 text-danger"
  );

  return <span className={className}>{value}</span>;
}
