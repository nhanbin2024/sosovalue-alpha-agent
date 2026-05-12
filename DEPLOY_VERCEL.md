# Deploy to Vercel

## Option 1: Deploy from GitHub

1. Create a new GitHub repository.
2. Upload or push this project folder.
3. Go to Vercel.
4. Click **Add New Project**.
5. Import the GitHub repository.
6. Framework preset should be **Next.js**.
7. Add environment variables if you have SoSoValue API access:

```bash
SOSOVALUE_API_KEY=your_api_key_here
SOSOVALUE_MARKET_URL=https://your-sosovalue-market-endpoint
SOSOVALUE_NEWS_URL=https://your-sosovalue-news-endpoint
```

8. Click **Deploy**.

## Option 2: Deploy with Vercel CLI

```bash
npm install
npm run build
npx vercel
```

For production:

```bash
npx vercel --prod
```

## Important Notes

- The project works without API keys because it has mock demo mode.
- For Buildathon judging, connect the official SoSoValue API once your access is approved.
- Do not put API keys directly in frontend code.
- API keys should only be stored in Vercel Environment Variables.
