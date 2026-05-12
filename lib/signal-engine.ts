import type { AssetMarket, SignalResult } from "./types";

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, value));

export function analyzeSignal(asset: AssetMarket): SignalResult {
  const newsScore = asset.news.reduce((sum, item) => {
    const sentiment = item.sentiment === "Positive" ? 1 : item.sentiment === "Negative" ? -1 : 0;
    const weight = item.impact === "High" ? 16 : item.impact === "Medium" ? 10 : 5;
    return sum + sentiment * weight;
  }, 0);

  const trendScore = asset.change24h * 6;
  const momentumScore = (asset.socialMomentum - 50) * 0.55;
  const liquidityScore = (asset.liquidityScore - 50) * 0.32;
  const riskPenalty = (asset.volatility - 50) * 0.38 + Math.max(asset.fundingPressure - 62, 0) * 0.48;

  const score = clamp(52 + trendScore + momentumScore + liquidityScore + newsScore - riskPenalty);
  const regime = score >= 68 ? "Bullish" : score <= 42 ? "Bearish" : "Neutral";
  const action = regime === "Bullish" ? "Consider Entry" : regime === "Bearish" ? "Avoid" : "Watch";
  const risk = asset.volatility > 68 || asset.fundingPressure > 70 ? "High" : asset.volatility > 50 ? "Medium" : "Low";
  const confidence = clamp(Math.round(50 + Math.abs(score - 50) * 0.72 + asset.liquidityScore * 0.12));

  const drivers = [
    `${asset.change24h >= 0 ? "Positive" : "Negative"} 24h price momentum: ${asset.change24h.toFixed(1)}%`,
    `Social/news momentum score: ${asset.socialMomentum}/100`,
    `Liquidity quality score: ${asset.liquidityScore}/100`,
    `${asset.news.filter((item) => item.sentiment === "Positive").length} positive news drivers detected`
  ];

  const warnings = [
    asset.volatility > 60 ? "Volatility is elevated; avoid oversized positions." : "Volatility is manageable but still requires stop-loss planning.",
    asset.fundingPressure > 65 ? "Funding pressure is warm; wait for confirmation before execution." : "Funding pressure is not extreme.",
    "This demo is for research workflow only, not financial advice."
  ];

  const summary =
    regime === "Bullish"
      ? `${asset.symbol} shows constructive momentum with supportive news flow. The agent suggests a confirmation-based entry workflow instead of blind execution.`
      : regime === "Bearish"
        ? `${asset.symbol} shows weak risk-adjusted conditions. The agent recommends avoiding new exposure until sentiment and liquidity improve.`
        : `${asset.symbol} is mixed. The agent recommends watching the asset and waiting for a cleaner signal before execution.`;

  return {
    regime,
    action,
    confidence,
    risk,
    score: Math.round(score),
    drivers,
    warnings,
    summary
  };
}
