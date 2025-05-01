// BeepMiniApp SDK wrapper for React applications

class MiniApp {
    constructor({ onReady, onResume, onPaused, onStop }) {
        console.log("BeepSDK: MiniApp constructor called");
        console.log("BeepSDK: Registering flutterInAppWebViewPlatformReady event listener");
        
        // Check if window.flutter_inappwebview exists
        if (typeof window.flutter_inappwebview === 'undefined') {
            console.warn("BeepSDK: window.flutter_inappwebview is not defined at SDK initialization");
        } else {
            console.log("BeepSDK: window.flutter_inappwebview is available at SDK initialization");
        }

        // Store event handlers for possible later manual triggering
        this.onReadyHandler = function(event) {
            console.log("BeepSDK: flutterInAppWebViewPlatformReady event received", event);
            if (onReady != null) {
                onReady();
            }
        };

        this.onResumeHandler = function(event) {
            console.log("BeepSDK: onResumed event received", event);
            if (onResume != null) {
                onResume();
            }
        };

        this.onPausedHandler = function(event) {
            console.log("BeepSDK: onPaused event received", event);
            if (onPaused != null) {
                onPaused();
            }
        };

        this.onStopHandler = function(event) {
            console.log("BeepSDK: onWebViewClosed event received", event);
            if (onStop != null) {
                onStop();
            }
        };

        // Register event listeners
        window.addEventListener("flutterInAppWebViewPlatformReady", this.onReadyHandler);
        window.addEventListener("onResumed", this.onResumeHandler);
        window.addEventListener("onPaused", this.onPausedHandler);
        window.addEventListener("onWebViewClosed", this.onStopHandler);
        
        console.log("BeepSDK: All event listeners registered");

        // Check if the event might have been triggered before we registered the listener
        if (typeof document !== 'undefined' && document.readyState === 'complete') {
            console.log("BeepSDK: Document already loaded, checking if platform ready event was missed");
            // Check if Flutter WebView is available - if so, we might have missed the event
            if (typeof window.flutter_inappwebview !== 'undefined') {
                console.log("BeepSDK: flutter_inappwebview is available but we might have missed the ready event");
                // We can't know for sure if we missed the event, but we can check at least
            }
        }
    }
    
    // Method to manually trigger the ready event (for testing/debugging)
    manuallyTriggerReady() {
        console.log("BeepSDK: Manually triggering ready event");
        this.onReadyHandler({ type: "flutterInAppWebViewPlatformReady", detail: "manually triggered" });
    }
}

class BeepMiniAppApi {
    constructor() {
        console.log("BeepSDK: BeepMiniAppApi constructor called");
    }

    onDatePickedListener = function () { };
    onActionButtonTappedListener = function () { };
    onBackPressedListener = function () { };

    getUser({ onSuccess, onFail }) {
        console.log("BeepSDK: getUser called");
        if (typeof window.flutter_inappwebview === 'undefined') {
            console.error("BeepSDK: flutter_inappwebview is not available when calling getUser");
            if (onFail) {
                onFail({ errorMessage: "WebView API not available" });
            }
            return;
        }

        window.flutter_inappwebview.callHandler('getUser')
            .then(function (result) {
                console.log("BeepSDK: getUser result received", result);
                if (result.id != null) {
                    if (onSuccess) {
                        onSuccess(result);
                    }
                } else {
                    if (onFail) {
                        onFail(result);
                    }
                }
            })
            .catch(function(error) {
                console.error("BeepSDK: Error in getUser", error);
                if (onFail) {
                    onFail({ errorMessage: error.toString() });
                }
            });
    }

    getCards({ onSuccess, onFail }) {
        console.log("BeepSDK: getCards called");
        if (typeof window.flutter_inappwebview === 'undefined') {
            console.error("BeepSDK: flutter_inappwebview is not available when calling getCards");
            if (onFail) {
                onFail({ errorMessage: "WebView API not available" });
            }
            return;
        }

        window.flutter_inappwebview.callHandler('getCards')
            .then(function (result) {
                console.log("BeepSDK: getCards result received", result);
                if (result.cards != null) {
                    if (onSuccess) {
                        onSuccess(result);
                    }
                } else {
                    if (onFail) {
                        onFail(result);
                    }
                }
            })
            .catch(function(error) {
                console.error("BeepSDK: Error in getCards", error);
                if (onFail) {
                    onFail({ errorMessage: error.toString() });
                }
            });
    }

    requestReferenceNumber({ merchantCode, product, amount, notifyUrl, onSuccess, onFail }) {
        console.log("BeepSDK: requestReferenceNumber called", { merchantCode, product, amount, notifyUrl });
        if (typeof window.flutter_inappwebview === 'undefined') {
            console.error("BeepSDK: flutter_inappwebview is not available when calling requestReferenceNumber");
            if (onFail) {
                onFail({ errorMessage: "WebView API not available" });
            }
            return;
        }

        window.flutter_inappwebview.callHandler('requestReferenceNumber', merchantCode, product, amount, notifyUrl)
            .then(function (result) {
                console.log("BeepSDK: requestReferenceNumber result received", result);
                if (result.referenceNumber != null) {
                    if (onSuccess) {
                        onSuccess(result);
                    }
                } else {
                    if (onFail) {
                        onFail(result)
                    }
                }
            })
            .catch(function(error) {
                console.error("BeepSDK: Error in requestReferenceNumber", error);
                if (onFail) {
                    onFail({ errorMessage: error.toString() });
                }
            });
    }

    requestPayment({ type = 'CHECKOUT', amount, processingFee, referenceNumber, onSuccess }) {
        console.log("BeepSDK: requestPayment called", { type, amount, processingFee, referenceNumber });
        if (typeof window.flutter_inappwebview === 'undefined') {
            console.error("BeepSDK: flutter_inappwebview is not available when calling requestPayment");
            if (onSuccess) {
                onSuccess({ status: "ERROR", message: "WebView API not available" });
            }
            return;
        }

        window.flutter_inappwebview.callHandler('requestPayment', amount, processingFee, referenceNumber, type)
            .then(function (result) {
                console.log("BeepSDK: requestPayment result received", result);
                if (onSuccess) {
                    onSuccess(result);
                }
            })
            .catch(function(error) {
                console.error("BeepSDK: Error in requestPayment", error);
                if (onSuccess) {
                    onSuccess({ status: "ERROR", message: error.toString() });
                }
            });
    }

    showDialog({ title, description, confirmButtonTitle, dismissButtonTitle, onConfirmPressed, onDismissPressed }) {
        console.log("BeepSDK: showDialog called", { title, description, confirmButtonTitle, dismissButtonTitle });
        if (typeof window.flutter_inappwebview === 'undefined') {
            console.error("BeepSDK: flutter_inappwebview is not available when calling showDialog");
            if (onDismissPressed) {
                onDismissPressed();
            }
            return;
        }

        window.flutter_inappwebview.callHandler('showDialog', title, description, confirmButtonTitle, dismissButtonTitle)
            .then(function (result) {
                console.log("BeepSDK: showDialog result received", result);
                if (result == true) {
                    if (onConfirmPressed) {
                        onConfirmPressed();
                    }
                } else {
                    if (onDismissPressed) {
                        onDismissPressed();
                    }
                }
            })
            .catch(function(error) {
                console.error("BeepSDK: Error in showDialog", error);
                if (onDismissPressed) {
                    onDismissPressed();
                }
            });
    }

    chooseImageFromFile({ allowMultiple, onSuccess, onFail }) {
        console.log("BeepSDK: chooseImageFromFile called", { allowMultiple });
        if (typeof window.flutter_inappwebview === 'undefined') {
            console.error("BeepSDK: flutter_inappwebview is not available when calling chooseImageFromFile");
            if (onFail) {
                onFail();
            }
            return;
        }

        window.flutter_inappwebview.callHandler('chooseImageFromFile', allowMultiple)
            .then(function (result) {
                console.log("BeepSDK: chooseImageFromFile result received", result);
                if (result != null) {
                    if (onSuccess) {
                        onSuccess();
                    }
                } else {
                    if (onFail) {
                        onFail();
                    }
                }
            })
            .catch(function(error) {
                console.error("BeepSDK: Error in chooseImageFromFile", error);
                if (onFail) {
                    onFail();
                }
            });
    }

    saveImage({ url, onSuccess, onFail }) {
        console.log("BeepSDK: saveImage called", { url });
        if (typeof window.flutter_inappwebview === 'undefined') {
            console.error("BeepSDK: flutter_inappwebview is not available when calling saveImage");
            if (onFail) {
                onFail();
            }
            return;
        }

        window.flutter_inappwebview.callHandler('saveImage', url)
            .then(function (result) {
                console.log("BeepSDK: saveImage result received", result);
                if (result) {
                    if (onSuccess) {
                        onSuccess();
                    }
                } else {
                    if (onFail) {
                        onFail();
                    }
                }
            })
            .catch(function(error) {
                console.error("BeepSDK: Error in saveImage", error);
                if (onFail) {
                    onFail();
                }
            });
    }

    showLoading({ onSuccess, onFail } = {}) {
        console.log("BeepSDK: showLoading called");
        if (typeof window.flutter_inappwebview === 'undefined') {
            console.error("BeepSDK: flutter_inappwebview is not available when calling showLoading");
            if (onFail) {
                onFail();
            }
            return;
        }

        window.flutter_inappwebview.callHandler('showLoading')
            .then(function (result) {
                console.log("BeepSDK: showLoading result received", result);
                if (result == true) {
                    if (onSuccess) {
                        onSuccess();
                    }
                } else {
                    if (onFail) {
                        onFail();
                    }
                }
            })
            .catch(function(error) {
                console.error("BeepSDK: Error in showLoading", error);
                if (onFail) {
                    onFail();
                }
            });
    }

    hideLoading({ onSuccess, onFail } = {}) {
        console.log("BeepSDK: hideLoading called");
        if (typeof window.flutter_inappwebview === 'undefined') {
            console.error("BeepSDK: flutter_inappwebview is not available when calling hideLoading");
            if (onFail) {
                onFail();
            }
            return;
        }

        window.flutter_inappwebview.callHandler('hideLoading')
            .then(function (result) {
                console.log("BeepSDK: hideLoading result received", result);
                if (result == true) {
                    if (onSuccess) {
                        onSuccess();
                    }
                } else {
                    if (onFail) {
                        onFail();
                    }
                }
            })
            .catch(function(error) {
                console.error("BeepSDK: Error in hideLoading", error);
                if (onFail) {
                    onFail();
                }
            });
    }

    httpRequest({ method = "GET", baseUrl, path = "", queryParameters = {}, headers = { 'content-type': 'application/json' }, requestBody = {}, onSuccess, onFail, }) {
        console.log("BeepSDK: httpRequest called", { method, baseUrl, path, queryParameters, headers });
        if (typeof window.flutter_inappwebview === 'undefined') {
            console.error("BeepSDK: flutter_inappwebview is not available when calling httpRequest");
            if (onFail) {
                onFail();
            }
            return;
        }

        window.flutter_inappwebview
            .callHandler('httpRequest', method, baseUrl, path, queryParameters, headers, requestBody)
            .then(function (result) {
                console.log("BeepSDK: httpRequest result received", result);
                if (result.statusCode >= 200 && result.statusCode <= 299) {
                    if (onSuccess) {
                        onSuccess(result);
                    }
                } else {
                    if (onFail) {
                        onFail();
                    }
                }
            })
            .catch(function(error) {
                console.error("BeepSDK: Error in httpRequest", error);
                if (onFail) {
                    onFail();
                }
            });
    }

    choosePhoneFromContact({ onSuccess, onFail } = {}) {
        console.log("BeepSDK: choosePhoneFromContact called");
        if (typeof window.flutter_inappwebview === 'undefined') {
            console.error("BeepSDK: flutter_inappwebview is not available when calling choosePhoneFromContact");
            if (onFail) {
                onFail({ errorMessage: "WebView API not available" });
            }
            return;
        }

        window.flutter_inappwebview.callHandler('choosePhoneFromContact')
            .then(function (result) {
                console.log("BeepSDK: choosePhoneFromContact result received", result);
                if (result.errorMessage == null) {
                    if (onSuccess) {
                        onSuccess(result);
                    }
                } else {
                    if (onFail) {
                        onFail(result);
                    }
                }
            })
            .catch(function(error) {
                console.error("BeepSDK: Error in choosePhoneFromContact", error);
                if (onFail) {
                    onFail({ errorMessage: error.toString() });
                }
            });
    }

    datePicker({ format, minimumDate, maximumDate, onSuccess, onFail }) {
        console.log("BeepSDK: datePicker called", { format, minimumDate, maximumDate });
        if (typeof window.flutter_inappwebview === 'undefined') {
            console.error("BeepSDK: flutter_inappwebview is not available when calling datePicker");
            if (onFail) {
                onFail({ errorMessage: "WebView API not available" });
            }
            return;
        }

        window.flutter_inappwebview.callHandler('datePicker', format, minimumDate, maximumDate);
        
        window.removeEventListener("onDatePicked", this.onDatePickedListener);
        
        this.onDatePickedListener = function (event) {
            console.log("BeepSDK: onDatePicked event received", event);
            if (event.detail.date) {
                onSuccess(event.detail);
            } else {
                onFail(event.detail);
            }
        }
        
        window.addEventListener("onDatePicked", this.onDatePickedListener, false);
        console.log("BeepSDK: datePicker event listener registered");
    }

    actionButton({ title, onTap }) {
        console.log("BeepSDK: actionButton called", { title });
        if (typeof window.flutter_inappwebview === 'undefined') {
            console.error("BeepSDK: flutter_inappwebview is not available when calling actionButton");
            return;
        }

        window.flutter_inappwebview.callHandler('appBarAction', title)
            .then(result => {
                console.log("BeepSDK: actionButton result received", result);
            })
            .catch(error => {
                console.error("BeepSDK: Error in actionButton", error);
            });
            
        window.removeEventListener("onActionButtonTapped", this.onActionButtonTappedListener);
        
        this.onActionButtonTappedListener = function () {
            console.log("BeepSDK: onActionButtonTapped event received");
            onTap();
        }
        
        window.addEventListener("onActionButtonTapped", this.onActionButtonTappedListener, false);
        console.log("BeepSDK: actionButton event listener registered");
    }

    onBackPressed({ onTap }) {
        console.log("BeepSDK: onBackPressed called");
        if (typeof window.flutter_inappwebview === 'undefined') {
            console.error("BeepSDK: flutter_inappwebview is not available when calling onBackPressed");
            return;
        }

        window.flutter_inappwebview.callHandler('onBackPressed')
            .then(result => {
                console.log("BeepSDK: onBackPressed result received", result);
            })
            .catch(error => {
                console.error("BeepSDK: Error in onBackPressed", error);
            });
            
        window.removeEventListener('onBackButtonPressed', this.onBackPressedListener);
        
        this.onBackPressedListener = function () {
            console.log("BeepSDK: onBackButtonPressed event received");
            onTap();
        }
        
        window.addEventListener('onBackButtonPressed', this.onBackPressedListener, false);
        console.log("BeepSDK: onBackPressed event listener registered");
    }

    closeMiniApp() {
        console.log("BeepSDK: closeMiniApp called");
        if (typeof window.flutter_inappwebview === 'undefined') {
            console.error("BeepSDK: flutter_inappwebview is not available when calling closeMiniApp");
            return;
        }

        window.flutter_inappwebview.callHandler('closeMiniApp')
            .then(result => {
                console.log("BeepSDK: closeMiniApp result received", result);
            })
            .catch(error => {
                console.error("BeepSDK: Error in closeMiniApp", error);
            });
    }
    
    appBarTitle({ title }) {
        console.log("BeepSDK: appBarTitle called", { title });
        if (typeof window.flutter_inappwebview === 'undefined') {
            console.error("BeepSDK: flutter_inappwebview is not available when calling appBarTitle");
            return;
        }

        window.flutter_inappwebview.callHandler('appBarTitle', title)
            .then(result => {
                console.log("BeepSDK: appBarTitle result received", result);
            })
            .catch(error => {
                console.error("BeepSDK: Error in appBarTitle", error);
            });
    }
}

// Create and export a singleton instance of the API
console.log("BeepSDK: Creating BeepMiniAppApi instance");
export const beep = new BeepMiniAppApi();

// Export the MiniApp class for initialization
console.log("BeepSDK: Exporting MiniApp class");
export default MiniApp; 