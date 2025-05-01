import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

const Console = () => {
  const { consoleEnabled, consoleVisible, toggleConsoleVisibility } = useApp();
  const [logs, setLogs] = useState([]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (!consoleEnabled) return;
    
    // Store original console methods
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    const originalInfo = console.info;

    // Override console methods
    console.log = (...args) => {
      setLogs(prev => [...prev, { type: 'log', content: args, time: new Date().toLocaleTimeString() }]);
      originalLog.apply(console, args);
    };
    
    console.error = (...args) => {
      setLogs(prev => [...prev, { type: 'error', content: args, time: new Date().toLocaleTimeString() }]);
      originalError.apply(console, args);
    };
    
    console.warn = (...args) => {
      setLogs(prev => [...prev, { type: 'warn', content: args, time: new Date().toLocaleTimeString() }]);
      originalWarn.apply(console, args);
    };
    
    console.info = (...args) => {
      setLogs(prev => [...prev, { type: 'info', content: args, time: new Date().toLocaleTimeString() }]);
      originalInfo.apply(console, args);
    };

    // Cleanup function to restore original console methods
    return () => {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
      console.info = originalInfo;
    };
  }, [consoleEnabled]);

  // Auto scroll to bottom when new logs appear
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  if (!consoleEnabled) return null;

  const clearLogs = () => {
    setLogs([]);
  };

  const formatLogContent = (content) => {
    return content.map((item, index) => {
      if (typeof item === 'object') {
        try {
          return <span key={index}>{JSON.stringify(item, null, 2)} </span>;
        } catch (e) {
          return <span key={index}>[Object] </span>;
        }
      }
      return <span key={index}>{String(item)} </span>;
    });
  };

  return (
    <>
      {consoleVisible ? (
        <div className="console-container">
          <div className="console-header">
            <button 
              onClick={clearLogs} 
              className="console-btn"
            >
              Clear
            </button>
            <button 
              onClick={toggleConsoleVisibility} 
              className="console-btn"
            >
              Hide
            </button>
          </div>
          <div
            ref={consoleRef}
            className="console-content"
          >
            {logs.map((log, index) => (
              <div key={index} className={`console-log console-type-${log.type}`}>
                <span className="console-time">{log.time}</span>
                <span className="console-type">[{log.type}]</span>
                {formatLogContent(log.content)}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <button
          onClick={toggleConsoleVisibility}
          className="console-toggle-btn"
        >
          Show Console
        </button>
      )}
    </>
  );
};

export default Console; 