# SoSoValue Buildathon Submission

## Project Name

SoSoValue Alpha Agent

## Short Description

SoSoValue Alpha Agent is an AI-powered market signal dashboard that helps retail crypto investors convert SoSoValue market data, news flow and risk metrics into explainable investment research signals.

## Target Users

- Retail crypto investors
- On-chain traders
- Small research teams
- Independent strategy builders
- Beginner users who need clearer market explanations

## Problem

Crypto users face information overload. Market prices, news, sentiment, liquidity and risk indicators are scattered across different sources. Many users cannot quickly convert this information into a clear decision workflow.

## Solution

The product uses SoSoValue data as the research input layer and converts it into:

- market regime: Bullish / Neutral / Bearish
- alpha score
- confidence score
- suggested action: Consider Entry / Watch / Avoid
- risk level
- news drivers
- confirmation checklist

## Core Workflow

```text
SoSoValue market/news data
        ↓
Signal engine scoring
        ↓
AI-style explanation layer
        ↓
Risk confirmation checklist
        ↓
Actionable user output
```

## APIs and Data Sources

- SoSoValue API for market and news data
- Configurable API adapter in `app/api/market/route.ts`
- Mock data fallback for Wave 1 prototype demonstration

## Current Wave 1 Progress

In Wave 1, the project completed:

- product concept
- target user definition
- UI/UX prototype
- data-to-output workflow
- market signal scoring logic
- risk control checklist
- API adapter design
- GitHub-ready and Vercel-ready codebase

## Planned Wave 2 Improvements

- Replace mock data fully with approved SoSoValue API endpoints
- Add SoDEX testnet execution preview
- Add watchlist alerts
- Add user portfolio context
- Add AI-generated daily market briefing
- Add signal history and backtesting panel

## Planned Wave 3 Improvements

- Complete SoDEX execution confirmation module
- Add strategy templates
- Add risk exposure limits
- Add automated research reports
- Add final demo video and product walkthrough

## Judging Criteria Alignment

### User Value and Practical Impact

The dashboard helps users make sense of complex market data and identify opportunities or risks faster.

### Functionality and Working Demo

The prototype runs as a working Next.js dashboard and can be deployed directly on Vercel.

### Logic, Workflow and Product Design

The product follows a clear workflow from data input to signal output and risk confirmation.

### Data / API Integration

The project includes a server-side SoSoValue API adapter and supports environment-based live API configuration.

### UX and Clarity

The product uses a clean professional dashboard layout with clear cards, charts, signal badges and explanation panels.
