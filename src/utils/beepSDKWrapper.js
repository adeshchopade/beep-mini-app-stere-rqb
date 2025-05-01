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
    return MiniAppMock;
  } else {
    console.log('Using real MiniApp class');
    return MiniApp;
  }
};

// Export individual method implementations for easy access
export const getUserImplementation = getImplementation('getUser');
export const getCardsImplementation = getImplementation('getCards');
export const requestReferenceNumberImplementation = getImplementation('requestReferenceNumber');
export const requestPaymentImplementation = getImplementation('requestPayment');
export const showDialogImplementation = getImplementation('showDialog');
export const chooseImageFromFileImplementation = getImplementation('chooseImageFromFile');
export const saveImageImplementation = getImplementation('saveImage');
export const showLoadingImplementation = getImplementation('showLoading');
export const hideLoadingImplementation = getImplementation('hideLoading');
export const httpRequestImplementation = getImplementation('httpRequest');
export const choosePhoneFromContactImplementation = getImplementation('choosePhoneFromContact');
export const datePickerImplementation = getImplementation('datePicker');
export const actionButtonImplementation = getImplementation('actionButton');
export const onBackPressedImplementation = getImplementation('onBackPressed');
export const closeMiniAppImplementation = getImplementation('closeMiniApp');
export const appBarTitleImplementation = getImplementation('appBarTitle');

// Export an object with all method implementations
export const beepSDK = {
  getUser: getUserImplementation,
  getCards: getCardsImplementation,
  requestReferenceNumber: requestReferenceNumberImplementation,
  requestPayment: requestPaymentImplementation,
  showDialog: showDialogImplementation,
  chooseImageFromFile: chooseImageFromFileImplementation,
  saveImage: saveImageImplementation,
  showLoading: showLoadingImplementation,
  hideLoading: hideLoadingImplementation,
  httpRequest: httpRequestImplementation,
  choosePhoneFromContact: choosePhoneFromContactImplementation,
  datePicker: datePickerImplementation,
  actionButton: actionButtonImplementation,
  onBackPressed: onBackPressedImplementation,
  closeMiniApp: closeMiniAppImplementation,
  appBarTitle: appBarTitleImplementation,
}; 