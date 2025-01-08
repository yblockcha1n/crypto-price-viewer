import express from 'express';
import cors from 'cors';
import ccxt from 'ccxt';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const binance = new ccxt.binance();
const okx = new ccxt.okx();
const bybit = new ccxt.bybit();

// 取得する通貨ペアのリスト
const TRADING_PAIRS = [
  'BTC/USDT',
  'ETH/USDT',
  'XRP/USDT',
  'SOL/USDT',
  'DOGE/USDT'
];

app.get('/prices', async (req, res) => {
  try {
    const exchanges = [
      { instance: binance, name: 'binance' },
      { instance: okx, name: 'okx' },
      { instance: bybit, name: 'bybit' }
    ];

    const exchangeData = await Promise.all(
      exchanges.map(async ({ instance, name }) => {
        const pairData = await Promise.all(
          TRADING_PAIRS.map(async (pair) => {
            try {
              const ticker = await instance.fetchTicker(pair);
              return [pair, {
                symbol: pair,
                price: ticker.last,
                timestamp: Date.now()
              }];
            } catch (error) {
              console.error(`${name}での${pair}の取得に失敗: ${error.message}`);
              return [pair, null];
            }
          })
        );

        // null以外のデータのみを含むオブジェクトを作成
        const validPairData = Object.fromEntries(
          pairData.filter(([_, data]) => data !== null)
        );

        return [name, validPairData];
      })
    );

    const response = Object.fromEntries(exchangeData);
    res.json(response);
  } catch (error) {
    console.error('価格の取得に失敗:', error);
    res.status(500).json({ error: '価格の取得に失敗' });
  }
});

app.listen(PORT, () => {
  console.log(`サーバーが${PORT}番ポートで起動`);
});