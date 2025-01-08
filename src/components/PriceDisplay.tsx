import React, { useEffect, useState } from 'react';
import { ExchangePrices } from '../types/types';
import { fetchPrices } from '../services/exchangeService';

const PriceDisplay: React.FC = () => {
  const [prices, setPrices] = useState<ExchangePrices | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const updatePrices = async () => {
      try {
        const data = await fetchPrices();
        setPrices(data);
        setError(null);
      } catch (err) {
        setError('価格の取得に失敗');
      }
    };

    updatePrices();
    const interval = setInterval(updatePrices, 5000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!prices) {
    return <div>読み込み中...</div>;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }).format(price);
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('ja-JP');
  };

  const ExchangeCard: React.FC<{ 
    exchangeName: string, 
    data: Record<string, { symbol: string; price: number; timestamp: number; }> 
  }> = ({ exchangeName, data }) => (
    <div className="exchange-card">
      <h3>{exchangeName.toUpperCase()}</h3>
      <div className="pairs-grid">
        {Object.entries(data).map(([_, pairData]) => (
          <div key={pairData.symbol} className="pair-info">
            <h4>{pairData.symbol}</h4>
            <p className="price">{formatPrice(pairData.price)}</p>
            <p className="timestamp">最終更新: {formatTime(pairData.timestamp)}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="price-display">
      <h2>各取引所一覧</h2>
      <div className="exchanges-grid">
        {Object.entries(prices).map(([exchange, data]) => (
          <ExchangeCard 
            key={exchange} 
            exchangeName={exchange} 
            data={data} 
          />
        ))}
      </div>
    </div>
  );
};

export default PriceDisplay;