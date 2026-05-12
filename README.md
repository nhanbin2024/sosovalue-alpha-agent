# SoSoValue Alpha Agent

AI market signal dashboard built for the **SoSoValue Buildathon Wave 1**.

SoSoValue Alpha Agent helps retail crypto investors convert market data, news flow and risk indicators into a clear, explainable signal workflow.

## Demo Concept

**Input**: SoSoValue market/news data  
**Processing**: signal engine + AI-style explanation layer  
**Output**: Bullish / Neutral / Bearish regime, action suggestion, risk level, news drivers and confirmation checklist

This project is designed for Wave 1 as an early prototype with a working UI, working signal workflow, mock demo mode and a configurable SoSoValue API adapter.

## Features

- Dark, professional crypto dashboard UI
- Token selector: BTC, ETH, SOL, SOSO
- Market price and sentiment chart
- AI signal panel with score, confidence and recommended action
- News intelligence panel
- Risk confirmation checklist
- Server-side API route for SoSoValue data integration
- Mock fallback mode so the demo always works
- Ready for GitHub and Vercel deployment

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Recharts
- Lucide Icons
- Framer Motion

## Getting Started

```bash
npm install
npm run dev
```

Open:

```bash
http://localhost:3000
```

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Then add your SoSoValue API access details:

```bash
SOSOVALUE_API_KEY=your_api_key_here
SOSOVALUE_MARKET_URL=https://your-sosovalue-market-endpoint
SOSOVALUE_NEWS_URL=https://your-sosovalue-news-endpoint
```

The app will use live API mode when `SOSOVALUE_MARKET_URL` or `SOSOVALUE_NEWS_URL` is provided. If not, it automatically uses mock demo mode.

## SoSoValue API Adapter

The API adapter is located here:

```bash
app/api/market/route.ts
```

It supports:

- `Authorization: Bearer <API_KEY>`
- `X-API-Key: <API_KEY>`
- `x-api-key: <API_KEY>`
- flexible JSON normalization for market and news payloads

This makes the prototype easy to connect once Buildathon API access is approved.

## Project Structure

```text
sosovalue-alpha-agent
├── app
│   ├── api/market/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── ChartCard.tsx
│   ├── Dashboard.tsx
│   ├── MetricCard.tsx
│   ├── NewsPanel.tsx
│   ├── RiskMatrix.tsx
│   ├── Sidebar.tsx
│   └── SignalBadge.tsx
├── lib
│   ├── format.ts
│   ├── mock-data.ts
│   ├── signal-engine.ts
│   └── types.ts
├── DEPLOY_VERCEL.md
├── SUBMISSION.md
└── README.md
```

## Build

```bash
npm run build
npm run start
```

## Wave 1 Progress

In Wave 1, this project completed:

- concept definition
- target user definition
- dashboard prototype
- data-to-signal workflow
- API integration adapter
- risk control logic
- deployment-ready repository structure

## Disclaimer

This project is a research and demo tool. It does not provide financial advice and does not execute trades in Wave 1.
