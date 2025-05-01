import React from 'react';
import { useApp } from './context/AppContext';
import HomePage from './pages/HomePage';
import SecondPage from './pages/SecondPage';
import Console from './components/Console';

const App = () => {
  const { page, consoleVisible } = useApp();

  // Determine which page to show
  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage />;
      case 'second':
        return <SecondPage />;
      default:
        console.error(`Unknown page: ${page}`);
        return <HomePage />;
    }
  };

  return (
    <div className={`${consoleVisible ? 'pb-[250px]' : ''}`}>
      {/* Main content */}
      {renderPage()}
      
      {/* Debug Console */}
      <Console />
    </div>
  );
};

export default App; 