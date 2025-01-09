# Overview
Crypto Price Viewer is a real-time cryptocurrency price tracking Local Web Application that aggregates data from major exchanges (Binance, OKX, and Bybit). Built with Node.js, TypeScript, React, and Vite, this application leverages the CCXT library to provide users with up-to-date cryptocurrency price information in a clean, user-friendly interface.

# Features
The application offers a comprehensive set of features designed to provide real-time cryptocurrency market data:

- Real-time price tracking for multiple cryptocurrency pairs (BTC, ETH, XRP, SOL, DOGE) against USDT
- Data aggregation from three major exchanges (Binance, OKX, Bybit)
- Automatic price updates every 5 seconds
- Responsive design for optimal viewing on all devices
- Robust error handling and loading states
- Clean and intuitive user interface

# Tech Stack
### Frontend:
- React (TypeScript)
- Vite
- Axios

### Backend:
- Node.js
- Express
- CCXT

# Project Directory

```
crypto-price-viewer/
├── src/
│   ├── components/
│   ├── services/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
├── server/
│   └── server.ts
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```
