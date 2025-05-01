import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import MiniApp, { beep } from '../utils/beepSDK';
import ENV from '../utils/env';

const BeepContext = createContext();

export const BeepProvider = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState(null);
  const [cards, setCards] = useState(null);
  const [isActionButtonSet, setIsActionButtonSet] = useState(false);
  const [isAppBarTitleSet, setIsAppBarTitleSet] = useState(false);
  
  useEffect(() => {
    console.log("BeepContext: Initializing SDK and WebView listeners");
    console.log("BeepContext: WebView detection - navigator.userAgent:", navigator.userAgent);
    console.log("BeepContext: flutter_inappwebview available:", typeof window.flutter_inappwebview !== 'undefined');
    

      // Check if flutter_inappwebview is defined on window
      if (typeof window.flutter_inappwebview === 'undefined') {
        console.warn("BeepContext: window.flutter_inappwebview is not defined! This should be available in the WebView.");
      } else {
        console.log("BeepContext: window.flutter_inappwebview is defined and available");
      }
      
      // Log any global event listeners
      console.log("BeepContext: Current window event listeners:", Object.keys(window).filter(key => key.startsWith('on')));
    
    
    // Initialize the BeepMiniApp
    const miniApp = new MiniApp({
      onReady: () => {
        console.log("BeepContext: flutterInAppWebViewPlatformReady event triggered - Mini App Ready");
        setIsReady(true);
        
        // Set up back button handler
        beep.onBackPressed({
          onTap: () => {
            console.log("BeepContext: Back button pressed, closing mini app");
            beep.closeMiniApp();
          },
        });
      },
      onResume: () => {
        console.log("BeepContext: onResumed event triggered - Mini App Resumed");
      },
      onPaused: () => {
        console.log("BeepContext: onPaused event triggered - Mini App Paused");
      },
      onStop: () => {
        console.log("BeepContext: onWebViewClosed event triggered - Mini App Stopped");
      },
    });
    
    // Store the miniApp instance on window for debugging
    window.miniAppInstance = miniApp;
    
    console.log("BeepContext: MiniApp instance created:", miniApp);
    
    // Manually dispatch the flutterInAppWebViewPlatformReady event for testing
    // This is just to ensure the event handler is working - should be removed in production
    const triggerReadyEvent = () => {
      // Check if the event has been triggered within 3 seconds
      if (!isReady) {
        console.log("BeepContext: Checking if flutterInAppWebViewPlatformReady event was missed");
        // Check again if window.flutter_inappwebview exists
        if (typeof window.flutter_inappwebview !== 'undefined') {
          console.log("BeepContext: window.flutter_inappwebview exists but ready event wasn't triggered. Manually setting isReady=true");
          setIsReady(true);
        }
      }
    };
    
    // Set a timeout to check if the event was missed
    const timeoutId = setTimeout(triggerReadyEvent, 3000);
    
    // For debugging in browser environment where flutter_inappwebview is not available
    if (typeof window.flutter_inappwebview === 'undefined') {
      console.log("BeepContext: Running in browser mode - WebView APIs not available, simulating ready event");
      // Simulate the ready event after a short delay
      setTimeout(() => {
        setIsReady(true);
        console.log("BeepContext: Mini App Ready (simulated)");
      }, 500);
    }
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isReady]);
  
  // Method to fetch user data
  const fetchUser = useCallback(() => {
    if (!isReady) {
      console.warn("BeepContext: SDK not ready yet, can't fetch user. isReady =", isReady);
      console.warn("BeepContext: flutter_inappwebview available =", typeof window.flutter_inappwebview !== 'undefined');
      return;
    }
    
    console.log("BeepContext: Fetching user data");
    
    if (typeof window.flutter_inappwebview === 'undefined') {
      console.log("BeepContext: Using mock user data for browser testing");
      // Mock data for browser testing
      setUser({
        id: 1403,
        firstName: "Test",
        lastName: null,
        phoneNumber: null,
        email: "user@test.com"
      });
      return;
    }
    
    try {
      console.log("BeepContext: Calling flutter_inappwebview.callHandler('getUser')");
      beep.getUser({
        onSuccess: (userData) => {
          setUser(userData);
          console.log("BeepContext: User data fetched successfully:", userData);
        },
        onFail: (error) => {
          console.error("BeepContext: Failed to fetch user:", error);
        }
      });
    } catch (error) {
      console.error("BeepContext: Exception when calling getUser:", error);
    }
  }, [isReady]);
  
  // Method to fetch cards data
  const fetchCards = useCallback(() => {
    if (!isReady) {
      console.warn("BeepContext: SDK not ready yet, can't fetch cards. isReady =", isReady);
      return;
    }

    
    console.log("BeepContext: Fetching cards data");
    
    if (typeof window.flutter_inappwebview === 'undefined') {
      console.log("BeepContext: Using mock cards data for browser testing");
      // Mock data for browser testing
      setCards({
        cards: [
          {
            can: "6378059900462120",
            expiry: "2024-12-31 00:00:00.000Z",
            status: "ACTIVE",
            balance: 6197.49
          }
        ]
      });
      return;
    }
    
    try {
      console.log("BeepContext: Calling flutter_inappwebview.callHandler('getCards')");
      beep.getCards({
        onSuccess: (cardsData) => {
          setCards(cardsData);
          console.log("BeepContext: Cards data fetched successfully:", cardsData);
        },
        onFail: (error) => {
          console.error("BeepContext: Failed to fetch cards:", error);
        }
      });
    } catch (error) {
      console.error("BeepContext: Exception when calling getCards:", error);
    }
  }, [isReady]);
  
  // Method to show dialog
  const showDialog = useCallback((title, description, confirmButtonTitle, dismissButtonTitle, onConfirm, onDismiss) => {
    if (!isReady) {
      console.warn("BeepContext: SDK not ready yet, can't show dialog. isReady =", isReady);
      return;
    }
    
    console.log("BeepContext: Showing dialog");
    
    if (typeof window.flutter_inappwebview === 'undefined') {
      console.log("BeepContext: Using browser confirm dialog for testing");
      // For browser testing, use a confirm dialog
      const confirmed = window.confirm(`${title}\n\n${description}`);
      if (confirmed && onConfirm) {
        onConfirm();
      } else if (!confirmed && onDismiss) {
        onDismiss();
      }
      return;
    }
    
    try {
      console.log("BeepContext: Calling flutter_inappwebview.callHandler('showDialog')");
      beep.showDialog({
        title,
        description,
        confirmButtonTitle,
        dismissButtonTitle,
        onConfirmPressed: onConfirm,
        onDismissPressed: onDismiss
      });
    } catch (error) {
      console.error("BeepContext: Exception when calling showDialog:", error);
    }
  }, [isReady]);
  
  // Method to set action button
  const setActionButton = useCallback((title, onTap) => {
    if (!isReady) {
      console.warn("BeepContext: SDK not ready yet, can't set action button. isReady =", isReady);
      return;
    }
    
    if (isActionButtonSet) {
      console.log("BeepContext: Action button already set, skipping");
      return;
    }
    
    console.log("BeepContext: Setting action button");
    
    if (typeof window.flutter_inappwebview === 'undefined') {
      console.log(`BeepContext: Action button "${title}" would be set (simulated)`);
      setIsActionButtonSet(true);
      return;
    }
    
    try {
      console.log("BeepContext: Calling flutter_inappwebview.callHandler('appBarAction')");
      beep.actionButton({
        title,
        onTap
      });
      setIsActionButtonSet(true);
      console.log("BeepContext: Action button set successfully");
    } catch (error) {
      console.error("BeepContext: Exception when calling actionButton:", error);
    }
  }, [isReady, isActionButtonSet]);
  
  // Method to set app bar title
  const setAppBarTitle = useCallback((title, forceReset = false) => {
    if (!isReady) {
      console.warn("BeepContext: SDK not ready yet, can't set app bar title. isReady =", isReady);
      return;
    }
    
    if (isAppBarTitleSet && !forceReset) {
      console.log("BeepContext: App bar title already set, skipping");
      return;
    }
    
    // Use environment app name if title not provided
    const finalTitle = title || ENV.APP_NAME;
    
    console.log("BeepContext: Setting app bar title");
    
    if (typeof window.flutter_inappwebview === 'undefined') {
      console.log(`BeepContext: App bar title would be set to "${finalTitle}" (simulated)`);
      setIsAppBarTitleSet(true);
      return;
    }
    
    try {
      console.log("BeepContext: Calling flutter_inappwebview.callHandler('appBarTitle')");
      beep.appBarTitle({ title: finalTitle });
      setIsAppBarTitleSet(true);
      console.log("BeepContext: App bar title set successfully");
    } catch (error) {
      console.error("BeepContext: Exception when calling appBarTitle:", error);
    }
  }, [isReady, isAppBarTitleSet]);
  
  // Memoize closeMiniApp function
  const closeMiniApp = useCallback(() => {
    console.log("BeepContext: Closing mini app");
    
    if (typeof window.flutter_inappwebview === 'undefined') {
      console.log("BeepContext: Mini app would close (simulated)");
      return;
    }
    
    try {
      console.log("BeepContext: Calling flutter_inappwebview.callHandler('closeMiniApp')");
      beep.closeMiniApp();
    } catch (error) {
      console.error("BeepContext: Exception when calling closeMiniApp:", error);
    }
  }, []);
  
  return (
    <BeepContext.Provider value={{
      isReady,
      user,
      cards,
      fetchUser,
      fetchCards,
      showDialog,
      setActionButton,
      setAppBarTitle,
      closeMiniApp,
    }}>
      {children}
    </BeepContext.Provider>
  );
};

export const useBeep = () => useContext(BeepContext);

export default BeepContext; 