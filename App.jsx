import React, { useState } from 'react';
import ProductList from './components/ProductList';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  return (
    <div className="app">
      {!showProductList ? (
        <div className="landing-page">
          <div className="landing-container">
            <h1>Paradise Nursery</h1>
            <p>
              Welcome to your premier online destination for beautiful houseplants. 
              Bring nature indoors and transform your living space into a green sanctuary. 
              Explore our wide variety of air-purifying, aromatic, and low-maintenance plants.
            </p>
            <button className="get-started-btn" onClick={handleGetStartedClick}>
              Get Started
            </button>
          </div>
        </div>
      ) : (
        <ProductList />
      )}
    </div>
  );
}

export default App;
