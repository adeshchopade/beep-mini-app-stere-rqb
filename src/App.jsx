import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={`${consoleVisible ? 'pb-[250px]' : ''}`}>
        {/* Main content */}
        {renderPage()}
        
        {/* Debug Console */}
        <Console />
      </div>
    </ThemeProvider>
  );
};

export default App; 