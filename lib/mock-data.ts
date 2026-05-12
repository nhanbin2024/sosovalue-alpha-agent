import type { AssetMarket, AssetSymbol } from "./types";

const baseNews = {
  BTC: [
    ["ETF inflows stabilize after two volatile sessions", "SoSoValue News", "High", "Positive"],
    ["Long-term holders reduce exchange transfers", "On-chain Desk", "Medium", "Positive"],
    ["Macro traders await the next rate signal", "Market Brief", "Medium", "Neutral"]
  ],
  ETH: [
    ["Layer-2 activity rebounds as gas fees stay contained", "SoSoValue News", "High", "Positive"],
    ["Staking flows remain steady before protocol update", "On-chain Desk", "Medium", "Neutral"],
    ["Options desk sees moderate upside demand", "Derivatives Brief", "Low", "Positive"]
  ],
  SOL: [
    ["DEX volume expands while meme rotation cools", "SoSoValue News", "High", "Positive"],
    ["Network fees rise with consumer app activity", "Chain Monitor", "Medium", "Neutral"],
    ["Funding rate turns warm after sharp rally", "Risk Desk", "Medium", "Negative"]
  ],
  SOSO: [
    ["SoSoValue ecosystem activity grows around Buildathon", "Buildathon Feed", "High", "Positive"],
    ["Developers explore research-to-execution agents", "Community Radar", "Medium", "Positive"],
    ["Liquidity remains early-stage and requires confirmation", "Risk Desk", "Medium", "Neutral"]
  ]
} as const;

const seeds: Record<AssetSymbol, Omit<AssetMarket, "news" | "chart">> = {
  BTC: {
    symbol: "BTC",
    name: "Bitcoin",
    price: 68420,
    change24h: 2.8,
    volume24h: 41200000000,
    marketCap: 1340000000000,
    volatility: 42,
    socialMomentum: 76,
    fundingPressure: 58,
    liquidityScore: 92
  },
  ETH: {
    symbol: "ETH",
    name: "Ethereum",
    price: 3420,
    change24h: 1.6,
    volume24h: 21400000000,
    marketCap: 411000000000,
    volatility: 47,
    socialMomentum: 68,
    fundingPressure: 54,
    liquidityScore: 88
  },
  SOL: {
    symbol: "SOL",
    name: "Solana",
    price: 154.7,
    change24h: 4.9,
    volume24h: 5980000000,
    marketCap: 72400000000,
    volatility: 66,
    socialMomentum: 83,
    fundingPressure: 71,
    liquidityScore: 78
  },
  SOSO: {
    symbol: "SOSO",
    name: "SoSoValue",
    price: 0.41,
    change24h: 7.4,
    volume24h: 31500000,
    marketCap: 164000000,
    volatility: 74,
    socialMomentum: 89,
    fundingPressure: 64,
    liquidityScore: 61
  }
};

function buildChart(symbol: AssetSymbol, price: number) {
  const drift = symbol === "SOSO" ? 0.012 : symbol === "SOL" ? 0.008 : 0.004;
  return Array.from({ length: 14 }, (_, index) => {
    const wave = Math.sin(index * 0.78) * 0.018 + Math.cos(index * 0.37) * 0.011;
    const move = 1 + (index - 6) * drift + wave;
    return {
      time: `${index + 9}:00`,
      price: Number((price * move).toFixed(symbol === "SOSO" ? 4 : 2)),
      volume: Math.round(45 + Math.abs(Math.sin(index * 0.9)) * 52 + index * 1.8),
      sentiment: Math.round(45 + Math.sin(index * 0.7) * 16 + index * 2.1)
    };
  });
}

export function getMockMarket(symbol: AssetSymbol = "BTC"): AssetMarket {
  const seed = seeds[symbol] ?? seeds.BTC;
  return {
    ...seed,
    news: baseNews[symbol].map((item, index) => ({
      id: `${symbol}-${index}`,
      title: item[0],
      source: item[1],
      impact: item[2],
      sentiment: item[3],
      time: index === 0 ? "8 min ago" : index === 1 ? "32 min ago" : "1h ago"
    })),
    chart: buildChart(symbol, seed.price)
  };
}

export const supportedAssets: AssetSymbol[] = ["BTC", "ETH", "SOL", "SOSO"];
