/**
 * BeepSDK Mock Implementation
 * This file provides mock implementations for all BeepSDK methods
 * to enable testing in browser environments where flutter_inappwebview is not available.
 */

// Mock data for getUser
const mockUser = {
  id: 1403,
  firstName: "Test",
  lastName: "User",
  phoneNumber: "09123456789",
  email: "user@test.com",
};

// Mock data for getCards
const mockCards = {
  cards: [
    {
      can: "6378059900462120",
      expiry: "2024-12-31 00:00:00.000Z",
      status: "ACTIVE",
      balance: 6197.49,
    },
    {
      can: "6378059900462121",
      expiry: "2025-01-31 00:00:00.000Z",
      status: "INACTIVE",
      balance: 1500.00,
    },
  ],
};

// Mock reference number for requestReferenceNumber
const mockReferenceNumber = {
  referenceNumber: "REF-12345-67890",
  message: "Success",
};

/**
 * Mock implementation of all BeepSDK methods
 */
export const beepSDKMock = {
  getUser: ({ onSuccess, onFail }) => {
    console.log("BeepSDK Mock: getUser called");
    setTimeout(() => {
      onSuccess ? onSuccess(mockUser) : null;
      console.log("BeepSDK Mock: Returned mock user data", mockUser);
    }, 500);
  },

  getCards: ({ onSuccess, onFail }) => {
    console.log("BeepSDK Mock: getCards called");
    setTimeout(() => {
      onSuccess ? onSuccess(mockCards) : null;
      console.log("BeepSDK Mock: Returned mock cards data", mockCards);
    }, 500);
  },

  requestReferenceNumber: ({ merchantCode, product, amount, notifyUrl, onSuccess, onFail }) => {
    console.log("BeepSDK Mock: requestReferenceNumber called", { merchantCode, product, amount, notifyUrl });
    setTimeout(() => {
      onSuccess ? onSuccess(mockReferenceNumber) : null;
      console.log("BeepSDK Mock: Returned mock reference number", mockReferenceNumber);
    }, 500);
  },

  requestPayment: ({ type = 'CHECKOUT', amount, processingFee, referenceNumber, onSuccess }) => {
    console.log("BeepSDK Mock: requestPayment called", { type, amount, processingFee, referenceNumber });
    setTimeout(() => {
      const result = { status: "SUCCESS", message: "Payment successful", transactionId: "TXN-" + Date.now() };
      onSuccess ? onSuccess(result) : null;
      console.log("BeepSDK Mock: Returned mock payment result", result);
    }, 1000);
  },

  showDialog: ({ title, description, confirmButtonTitle, dismissButtonTitle, onConfirmPressed, onDismissPressed }) => {
    console.log("BeepSDK Mock: showDialog called", { title, description, confirmButtonTitle, dismissButtonTitle });
    // Simulate user clicking confirm after a delay
    setTimeout(() => {
      console.log("BeepSDK Mock: Dialog confirmed");
      onConfirmPressed ? onConfirmPressed() : null;
    }, 1000);
  },

  chooseImageFromFile: ({ allowMultiple, onSuccess, onFail }) => {
    console.log("BeepSDK Mock: chooseImageFromFile called", { allowMultiple });
    setTimeout(() => {
      const result = allowMultiple ? 
        ["data:image/png;base64,mockImageData1", "data:image/png;base64,mockImageData2"] :
        "data:image/png;base64,mockImageData";
      onSuccess ? onSuccess(result) : null;
      console.log("BeepSDK Mock: Returned mock image data");
    }, 1000);
  },

  saveImage: ({ url, onSuccess, onFail }) => {
    console.log("BeepSDK Mock: saveImage called", { url });
    setTimeout(() => {
      onSuccess ? onSuccess(true) : null;
      console.log("BeepSDK Mock: Image saved successfully (mock)");
    }, 500);
  },

  showLoading: ({ onSuccess, onFail } = {}) => {
    console.log("BeepSDK Mock: showLoading called");
    setTimeout(() => {
      onSuccess ? onSuccess(true) : null;
      console.log("BeepSDK Mock: Loading shown (mock)");
    }, 200);
  },

  hideLoading: ({ onSuccess, onFail } = {}) => {
    console.log("BeepSDK Mock: hideLoading called");
    setTimeout(() => {
      onSuccess ? onSuccess(true) : null;
      console.log("BeepSDK Mock: Loading hidden (mock)");
    }, 200);
  },

  httpRequest: ({ 
    method = "GET", 
    baseUrl, 
    path = "", 
    queryParameters = {}, 
    headers = { 'content-type': 'application/json' }, 
    requestBody = {}, 
    onSuccess, 
    onFail 
  }) => {
    console.log("BeepSDK Mock: httpRequest called", { method, baseUrl, path, queryParameters, headers });
    setTimeout(() => {
      const mockResponse = {
        statusCode: 200,
        body: JSON.stringify({ 
          success: true, 
          message: "Mock API Response", 
          data: { 
            id: 123,
            timestamp: new Date().toISOString() 
          }
        }),
        headers: {
          'content-type': 'application/json'
        }
      };
      onSuccess ? onSuccess(mockResponse) : null;
      console.log("BeepSDK Mock: Returned mock HTTP response", mockResponse);
    }, 800);
  },

  choosePhoneFromContact: ({ onSuccess, onFail } = {}) => {
    console.log("BeepSDK Mock: choosePhoneFromContact called");
    setTimeout(() => {
      const phoneData = {
        phoneNumber: "09123456789",
        name: "John Doe"
      };
      onSuccess ? onSuccess(phoneData) : null;
      console.log("BeepSDK Mock: Returned mock phone contact", phoneData);
    }, 1000);
  },

  datePicker: ({ format, minimumDate, maximumDate, onSuccess, onFail }) => {
    console.log("BeepSDK Mock: datePicker called", { format, minimumDate, maximumDate });
    setTimeout(() => {
      const dateResult = {
        date: new Date().toISOString().split('T')[0]
      };
      onSuccess ? onSuccess(dateResult) : null;
      console.log("BeepSDK Mock: Returned mock date", dateResult);
    }, 800);
  },

  actionButton: ({ title, onTap }) => {
    console.log("BeepSDK Mock: actionButton called", { title });
    // Register for later manual triggering if needed
    window.mockTriggerActionButton = () => {
      console.log("BeepSDK Mock: actionButton tapped (mock trigger)");
      onTap ? onTap() : null;
    };
  },

  onBackPressed: ({ onTap }) => {
    console.log("BeepSDK Mock: onBackPressed called");
    // Register for later manual triggering if needed
    window.mockTriggerBackButton = () => {
      console.log("BeepSDK Mock: Back button pressed (mock trigger)");
      onTap ? onTap() : null;
    };
  },

  closeMiniApp: () => {
    console.log("BeepSDK Mock: closeMiniApp called");
    console.log("BeepSDK Mock: App would be closed in a real environment");
  },
  
  appBarTitle: ({ title }) => {
    console.log("BeepSDK Mock: appBarTitle called", { title });
    console.log("BeepSDK Mock: App bar title would be set to:", title);
  }
};

// Mock MiniApp class
export class MiniAppMock {
  constructor({ onReady, onResume, onPaused, onStop }) {
    console.log("BeepSDK Mock: MiniApp constructor called");
    this.onReadyHandler = onReady;
    this.onResumeHandler = onResume;
    this.onPausedHandler = onPaused;
    this.onStopHandler = onStop;
    
    // Trigger onReady after a short delay to simulate app initialization
    setTimeout(() => {
      console.log("BeepSDK Mock: Triggering onReady");
      if (this.onReadyHandler) {
        this.onReadyHandler();
      }
    }, 500);
  }
  
  // Method to manually trigger the ready event (for testing/debugging)
  manuallyTriggerReady() {
    console.log("BeepSDK Mock: Manually triggering ready event");
    if (this.onReadyHandler) {
      this.onReadyHandler();
    }
  }
  
  // Methods to simulate lifecycle events
  simulateResume() {
    console.log("BeepSDK Mock: Simulating resume event");
    if (this.onResumeHandler) {
      this.onResumeHandler();
    }
  }
  
  simulatePause() {
    console.log("BeepSDK Mock: Simulating pause event");
    if (this.onPausedHandler) {
      this.onPausedHandler();
    }
  }
  
  simulateStop() {
    console.log("BeepSDK Mock: Simulating stop event");
    if (this.onStopHandler) {
      this.onStopHandler();
    }
  }
} 