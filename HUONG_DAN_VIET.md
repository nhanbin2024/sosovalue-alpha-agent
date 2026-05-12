# Hướng dẫn nhanh cho bạn

## 1. Chạy thử trên máy

Mở terminal trong thư mục project rồi chạy:

```bash
npm install
npm run dev
```

Sau đó mở:

```bash
http://localhost:3000
```

## 2. Đẩy lên GitHub

```bash
git init
git add .
git commit -m "Initial SoSoValue Alpha Agent prototype"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sosovalue-alpha-agent.git
git push -u origin main
```

Nhớ thay `YOUR_USERNAME` bằng tài khoản GitHub của bạn.

## 3. Deploy lên Vercel

1. Vào Vercel.
2. Chọn **Add New Project**.
3. Import repo GitHub vừa tạo.
4. Framework để mặc định là **Next.js**.
5. Bấm **Deploy**.

Nếu chưa có API key thì vẫn deploy được vì app có mock demo mode.

## 4. Khi có SoSoValue API key

Tạo file `.env.local` trên máy hoặc thêm Environment Variables trên Vercel:

```bash
SOSOVALUE_API_KEY=your_api_key_here
SOSOVALUE_MARKET_URL=https://your-sosovalue-market-endpoint
SOSOVALUE_NEWS_URL=https://your-sosovalue-news-endpoint
```

Sau đó deploy lại.

## 5. Nộp Buildathon

Bạn cần chuẩn bị:

- GitHub repo public
- Link Vercel demo
- README
- Nội dung submission trong file `SUBMISSION.md`
- Video ngắn nếu có thời gian

Nếu gấp quá, chỉ cần nộp GitHub + Vercel + mô tả project rõ ràng trước.
