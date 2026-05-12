import { NextResponse } from "next/server";
import { getMockMarket, supportedAssets } from "@/lib/mock-data";
import { analyzeSignal } from "@/lib/signal-engine";
import type { ApiResponse, AssetMarket, AssetSymbol, NewsItem } from "@/lib/types";

export const dynamic = "force-dynamic";

type LiveMarketResult = {
  source: "sosovalue" | "coingecko";
  asset: AssetMarket;
};

function asAssetSymbol(value: string | null): AssetSymbol {
  const symbol = (value ?? "BTC").toUpperCase() as AssetSymbol;
  return supportedAssets.includes(symbol) ? symbol : "BTC";
}

async function fetchJson(url: string, apiKey?: string, label = "API") {
  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
      "User-Agent": "sosovalue-alpha-agent/1.0",
      ...(apiKey
        ? {
            Authorization: `Bearer ${apiKey}`,
            "X-API-Key": apiKey,
            "x-api-key": apiKey
          }
        : {})
    }
  });

  if (!response.ok) {
    throw new Error(`${label} request failed: ${response.status}`);
  }

  return response.json();
}

function numberFrom(...values: unknown[]) {
  for (const value of values) {
    const num = Number(value);
    if (Number.isFinite(num)) return num;
  }
  return 0;
}

function stringFrom(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value;
  }
  return "";
}

function normalizeNews(raw: unknown): NewsItem[] {
  const objectPayload = !Array.isArray(raw) && raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const rows = Array.isArray(raw)
    ? raw
    : Array.isArray(objectPayload.data)
      ? objectPayload.data
      : Array.isArray(objectPayload.items)
        ? objectPayload.items
        : Array.isArray(objectPayload.list)
          ? objectPayload.list
          : Array.isArray(objectPayload.news)
            ? objectPayload.news
            : [];

  return rows.slice(0, 5).map((item, index) => {
    const row = item as Record<string, unknown>;
    const sentimentRaw = String(row.sentiment ?? row.tone ?? row.label ?? "Neutral").toLowerCase();
    const sentiment = sentimentRaw.includes("pos") || sentimentRaw.includes("bull")
      ? "Positive"
      : sentimentRaw.includes("neg") || sentimentRaw.includes("bear")
        ? "Negative"
        : "Neutral";

    const impactRaw = String(row.impact ?? row.importance ?? row.level ?? "Medium").toLowerCase();
    const impact = impactRaw.includes("high") || impactRaw.includes("3")
      ? "High"
      : impactRaw.includes("low") || impactRaw.includes("1")
        ? "Low"
        : "Medium";

    return {
      id: stringFrom(row.id, row.newsId, row.url) || `live-${index}`,
      title: stringFrom(row.title, row.headline, row.name) || "Untitled market update",
      source: stringFrom(row.source, row.provider, row.author) || "SoSoValue",
      impact,
      sentiment,
      time: stringFrom(row.time, row.publishedAt, row.createdAt) || "Live"
    } satisfies NewsItem;
  });
}

function normalizeSoSoValueMarket(symbol: AssetSymbol, marketRaw: unknown, newsRaw: unknown): AssetMarket {
  const fallback = getMockMarket(symbol);
  const payload = marketRaw as Record<string, unknown>;
  const data = (payload.data ?? payload.result ?? payload) as Record<string, unknown>;
  const current = Array.isArray(data) ? (data[0] as Record<string, unknown>) : data;

  const price = numberFrom(current.price, current.close, current.lastPrice, current.currentPrice, fallback.price);
  const change24h = numberFrom(current.change24h, current.priceChangePercent, current.changePercent, current.chg24h, fallback.change24h);
  const volume24h = numberFrom(current.volume24h, current.volume, current.turnover24h, fallback.volume24h);
  const marketCap = numberFrom(current.marketCap, current.market_cap, fallback.marketCap);

  const news = normalizeNews(newsRaw);

  return {
    ...fallback,
    price,
    change24h,
    volume24h,
    marketCap,
    news: news.length ? news : fallback.news,
    chart: fallback.chart.map((point) => ({
      ...point,
      price: Number((price * (point.price / fallback.price)).toFixed(symbol === "SOSO" ? 4 : 2))
    }))
  };
}

async function getSoSoValueMarket(symbol: AssetSymbol): Promise<LiveMarketResult | null> {
  const apiKey = process.env.SOSOVALUE_API_KEY;
  const marketUrl = process.env.SOSOVALUE_MARKET_URL;
  const newsUrl = process.env.SOSOVALUE_NEWS_URL;

  if (!marketUrl && !newsUrl) return null;

  const buildUrl = (url: string) => {
    const parsed = new URL(url);
    if (!parsed.searchParams.has("symbol")) parsed.searchParams.set("symbol", symbol);
    return parsed.toString();
  };

  const [marketRaw, newsRaw] = await Promise.all([
    marketUrl ? fetchJson(buildUrl(marketUrl), apiKey, "SoSoValue market API") : Promise.resolve({}),
    newsUrl ? fetchJson(buildUrl(newsUrl), apiKey, "SoSoValue news API") : Promise.resolve({})
  ]);

  return {
    source: "sosovalue",
    asset: normalizeSoSoValueMarket(symbol, marketRaw, newsRaw)
  };
}

const coinGeckoIds: Record<AssetSymbol, string> = {
  BTC: "bitcoin",
  ETH: "ethereum",
  SOL: "solana",
  SOSO: "sosovalue"
};

function scaleChartToLivePrice(symbol: AssetSymbol, fallback: AssetMarket, livePrice: number) {
  const safeBasePrice = fallback.price || livePrice || 1;
  const decimals = symbol === "SOSO" ? 5 : symbol === "SOL" ? 3 : 2;

  return fallback.chart.map((point) => ({
    ...point,
    price: Number((livePrice * (point.price / safeBasePrice)).toFixed(decimals))
  }));
}

async function getCoinGeckoMarket(symbol: AssetSymbol): Promise<LiveMarketResult | null> {
  const fallback = getMockMarket(symbol);
  const id = coinGeckoIds[symbol];

  const url = new URL("https://api.coingecko.com/api/v3/simple/price");
  url.searchParams.set("ids", id);
  url.searchParams.set("vs_currencies", "usd");
  url.searchParams.set("include_market_cap", "true");
  url.searchParams.set("include_24hr_vol", "true");
  url.searchParams.set("include_24hr_change", "true");
  url.searchParams.set("include_last_updated_at", "true");

  const data = (await fetchJson(url.toString(), undefined, "CoinGecko price API")) as Record<string, Record<string, unknown>>;
  const row = data[id];

  if (!row || row.usd === undefined || row.usd === null) {
    return null;
  }

  const price = numberFrom(row.usd, fallback.price);
  const change24h = numberFrom(row.usd_24h_change, fallback.change24h);
  const volume24h = numberFrom(row.usd_24h_vol, fallback.volume24h);
  const marketCap = numberFrom(row.usd_market_cap, fallback.marketCap);

  return {
    source: "coingecko",
    asset: {
      ...fallback,
      price,
      change24h,
      volume24h,
      marketCap,
      chart: scaleChartToLivePrice(symbol, fallback, price)
    }
  };
}

async function getBestAvailableMarket(symbol: AssetSymbol): Promise<LiveMarketResult | null> {
  try {
    const sosoValueMarket = await getSoSoValueMarket(symbol);
    if (sosoValueMarket) return sosoValueMarket;
  } catch (error) {
    console.warn("SoSoValue API unavailable, falling back to CoinGecko/mock data.", error);
  }

  try {
    return await getCoinGeckoMarket(symbol);
  } catch (error) {
    console.warn("CoinGecko API unavailable, falling back to mock data.", error);
    return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = asAssetSymbol(searchParams.get("asset"));

  const live = await getBestAvailableMarket(symbol);
  const asset = live?.asset ?? getMockMarket(symbol);
  const signal = analyzeSignal(asset);

  const response: ApiResponse = {
    mode: live?.source ?? "mock",
    updatedAt: new Date().toISOString(),
    asset,
    signal,
    warning: live?.source === "coingecko"
      ? "Using CoinGecko live price as an external fallback. SoSoValue API URLs can be added through environment variables."
      : undefined
  };

  return NextResponse.json(response);
}
