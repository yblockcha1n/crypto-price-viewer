export interface CryptoPair {
    symbol: string;
    price: number;
    timestamp: number;
  }
  
  export interface ExchangeData {
    [pair: string]: CryptoPair;
  }
  
  export interface ExchangePrices {
    binance: ExchangeData;
    okx: ExchangeData;
    bybit: ExchangeData;
  }