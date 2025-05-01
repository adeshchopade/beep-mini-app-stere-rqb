import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AppProvider } from './context/AppContext';
import { BeepProvider } from './context/BeepContext';
import './styles/index.css';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('Application starting...');
  
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error('Root element not found');
    return;
  }
  
  try {
    const root = createRoot(rootElement);
    
    root.render(
      <React.StrictMode>
        <BeepProvider>
          <AppProvider>
            <App />
          </AppProvider>
        </BeepProvider>
      </React.StrictMode>
    );
    
    console.log('Application rendered successfully');
  } catch (error) {
    console.error('Error rendering application:', error);
  }
});

// Log when the window has fully loaded
window.addEventListener('load', () => {
  console.log('Window fully loaded');
  
  // Check if running in WebView
  const isWebView = /(WebView|iPhone|iPod|iPad|Android)/.test(navigator.userAgent);
  console.info(`Running in ${isWebView ? 'WebView' : 'Browser'}`);
}); 