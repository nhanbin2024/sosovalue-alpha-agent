export type AssetSymbol = "BTC" | "ETH" | "SOL" | "SOSO";

export type NewsItem = {
  id: string;
  title: string;
  source: string;
  impact: "High" | "Medium" | "Low";
  sentiment: "Positive" | "Neutral" | "Negative";
  time: string;
};

export type MarketPoint = {
  time: string;
  price: number;
  volume: number;
  sentiment: number;
};

export type AssetMarket = {
  symbol: AssetSymbol;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  volatility: number;
  socialMomentum: number;
  fundingPressure: number;
  liquidityScore: number;
  news: NewsItem[];
  chart: MarketPoint[];
};

export type SignalResult = {
  regime: "Bullish" | "Neutral" | "Bearish";
  action: "Consider Entry" | "Watch" | "Avoid";
  confidence: number;
  risk: "Low" | "Medium" | "High";
  score: number;
  drivers: string[];
  warnings: string[];
  summary: string;
};

export type ApiResponse = {
  mode: "mock" | "coingecko" | "sosovalue";
  updatedAt: string;
  asset: AssetMarket;
  signal: SignalResult;
  warning?: string;
};
