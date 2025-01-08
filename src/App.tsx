import React from 'react';
import PriceDisplay from './components/PriceDisplay';

const App: React.FC = () => {
  return (
    <div className="app">
      <header>
        <h1>暗号資産価格監視 👀</h1>
      </header>
      <main>
        <PriceDisplay />
      </main>
    </div>
  );
};

export default App;