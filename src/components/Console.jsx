import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useApp } from '../context/AppContext';

const ConsoleContainer = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  zIndex: 50,
  borderTop: `1px solid ${theme.palette.divider}`,
  borderRadius: 0
}));

const ConsoleHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0.5, 1),
  backgroundColor: theme.palette.grey[100],
  borderBottom: `1px solid ${theme.palette.divider}`
}));

const ConsoleContent = styled(Box)(({ theme }) => ({
  height: '150px',
  overflowY: 'auto',
  padding: theme.spacing(1),
  fontFamily: 'monospace',
  fontSize: '0.75rem'
}));

const ConsoleToggleButton = styled(Button)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  right: 0,
  fontSize: '0.75rem',
  padding: theme.spacing(0.5, 1),
  backgroundColor: theme.palette.grey[100],
  borderRadius: 0,
  borderTop: `1px solid ${theme.palette.divider}`,
  borderLeft: `1px solid ${theme.palette.divider}`,
  textTransform: 'none',
  minWidth: 'auto'
}));

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

  // Helper to get color based on log type
  const getLogColor = (type) => {
    switch(type) {
      case 'error': return 'error.main';
      case 'warn': return 'warning.main';
      case 'info': return 'info.main';
      default: return 'text.primary';
    }
  };

  return (
    <>
      {consoleVisible ? (
        <ConsoleContainer elevation={3}>
          <ConsoleHeader>
            <Button 
              onClick={clearLogs} 
              size="small" 
              variant="text"
            >
              Clear
            </Button>
            <Button 
              onClick={toggleConsoleVisibility} 
              size="small"
              variant="text"
            >
              Hide
            </Button>
          </ConsoleHeader>
          <ConsoleContent
            ref={consoleRef}
          >
            {logs.map((log, index) => (
              <Box key={index} sx={{ mb: 0.5 }}>
                <Typography component="span" variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                  {log.time}
                </Typography>
                <Typography component="span" variant="caption" sx={{ mr: 1, color: getLogColor(log.type) }}>
                  [{log.type}]
                </Typography>
                <Typography component="span" variant="caption">
                  {formatLogContent(log.content)}
                </Typography>
              </Box>
            ))}
          </ConsoleContent>
        </ConsoleContainer>
      ) : (
        <ConsoleToggleButton
          onClick={toggleConsoleVisibility}
          variant="outlined"
          size="small"
        >
          Show Console
        </ConsoleToggleButton>
      )}
    </>
  );
};

export default Console; 