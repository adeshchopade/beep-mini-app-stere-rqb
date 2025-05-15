/**
 * BeepSDK Wrapper
 * This utility provides functions that choose between the real Beep SDK
 * or the mock implementation based on the environment.
 */

import MiniApp, { beep } from './beepSDK';
import { MiniAppMock, beepSDKMock } from './beepSDKMock';

/**
 * Checks if running in a browser environment without flutter_inappwebview
 * @returns {boolean} True if running in browser (mock needed), false if in app
 */
export const isBrowserEnvironment = () => {
  return typeof window !== 'undefined' && typeof window.flutter_inappwebview === 'undefined';
};

/**
 * Get the appropriate implementation (real or mock) for a specific SDK method
 * @param {string} methodName - The name of the method to get implementation for
 * @returns {Function} The appropriate method implementation
 */
export const getImplementation = (methodName) => {
  if (isBrowserEnvironment()) {
    console.log(`Using mock implementation for ${methodName}`);
    return beepSDKMock[methodName];
  } else {
    console.log(`Using real SDK implementation for ${methodName}`);
    return beep[methodName];
  }
};

/**
 * Get the appropriate MiniApp class (real or mock)
 * @returns {Class} The appropriate MiniApp class
 */
export const getMiniApp = () => {
  if (isBrowserEnvironment()) {
    console.log('Using mock MiniApp class');
    
    // Return a wrapped version of MiniAppMock that stores the instance globally
    // for easier testing and event simulation
    return function(options) {
      const instance = new MiniAppMock(options);
      
      // Store instance in window for testing access
      if (typeof window !== 'undefined') {
        window._miniAppMockInstance = instance;
      }
      
      return instance;
    };
  } else {
    console.log('Using real MiniApp class');
    return MiniApp;
  }
};

/**
 * The beepSDK object provides a unified API for both real and mock implementations.
 * It automatically selects the appropriate implementation based on the environment.
 * 
 * In browser environments, it uses mock implementations for testing and development.
 * In the Beep app WebView, it uses the real SDK implementations.
 * 
 * Note: Some methods like getCards and httpRequest are hardcoded to use mock implementations
 * in this example for demonstration purposes.
 */
export const beepSDK = {
  /**
   * Retrieves the user information.
   * @see {beep.getUser}
   */
  getUser: getImplementation('getUser'),
  
  /**
   * Retrieves the user's cards information.
   * Note: Currently using mock implementation regardless of environment.
   * @see {beepSDKMock.getCards}
   */
  // getCards: getImplementation('getCards'),
  getCards: beepSDKMock.getCards,
  
  /**
   * Requests a reference number for payment.
   * @see {beep.requestReferenceNumber}
   */
  requestReferenceNumber: getImplementation('requestReferenceNumber'),
  
  /**
   * Requests a payment transaction.
   * @see {beep.requestPayment}
   */
  requestPayment: getImplementation('requestPayment'),
  
  /**
   * Shows a dialog with confirm and dismiss options.
   * @see {beep.showDialog}
   */
  showDialog: getImplementation('showDialog'),
  
  /**
   * Allows user to choose image from file.
   * @see {beep.chooseImageFromFile}
   */
  chooseImageFromFile: getImplementation('chooseImageFromFile'),
  
  /**
   * Saves an image.
   * @see {beep.saveImage}
   */
  saveImage: getImplementation('saveImage'),
  
  /**
   * Shows a loading indicator.
   * @see {beep.showLoading}
   */
  showLoading: getImplementation('showLoading'),
  
  /**
   * Hides the loading indicator.
   * @see {beep.hideLoading}
   */
  hideLoading: getImplementation('hideLoading'),
  
  /**
   * Makes an HTTP request.
   * Note: Currently using mock implementation regardless of environment.
   * @see {beepSDKMock.httpRequest}
   */
  // httpRequest: getImplementation('httpRequest'),
  httpRequest: beepSDKMock.httpRequest,
  
  /**
   * Allows user to choose a phone number from contacts.
   * @see {beep.choosePhoneFromContact}
   */
  choosePhoneFromContact: getImplementation('choosePhoneFromContact'),
  
  /**
   * Opens a date picker.
   * @see {beep.datePicker}
   */
  datePicker: getImplementation('datePicker'),
  
  /**
   * Sets up an action button in the app bar.
   * @see {beep.actionButton}
   */
  actionButton: getImplementation('actionButton'),
  
  /**
   * Handles back button press events.
   * @see {beep.onBackPressed}
   */
  onBackPressed: getImplementation('onBackPressed'),
  
  /**
   * Closes the mini app.
   * @see {beep.closeMiniApp}
   */
  closeMiniApp: getImplementation('closeMiniApp'),
  
  /**
   * Sets the app bar title.
   * @see {beep.appBarTitle}
   */
  appBarTitle: getImplementation('appBarTitle'),
}; 