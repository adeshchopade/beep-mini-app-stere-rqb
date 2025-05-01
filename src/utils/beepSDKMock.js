/**
 * BeepSDK Mock Implementation
 * This file provides mock implementations for all BeepSDK methods
 * to enable testing in browser environments where flutter_inappwebview is not available.
 */

// Mock data for getUser - updated to match actual app response
const mockUser = {
	id: 1401,
	firstName: "Test",
	lastName: null,
	phoneNumber: null,
	email: "test@test.com",
};

// Mock data for getCards - matches actual app response
const mockCards = {
	cards: [
		{
			can: "6378059900462190",
			expiry: "2024-12-31 00:00:00.000Z",
			status: "ACTIVE",
			balance: 6197.49,
		},

		{
			can: "6378059900462122",
			expiry: "2025-01-31 00:00:00.000Z",
			status: "INACTIVE",
			balance: 1500.0,
		},
	],
};

// Mock reference number success response
const mockReferenceNumber = {
	referenceNumber: "REF-12345-67890",
	message: "Success"
};

// Mock reference number error for requestReferenceNumber
const mockReferenceNumberError = {
	error: {
		code: -1,
		errorMessage: "Invalid merchant_code",
	},
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
			onFail ? onFail(mockReferenceNumberError) : null;
			console.log("BeepSDK Mock: Returned mock reference number error", mockReferenceNumberError);
		}, 500);
	},

	requestPayment: ({ type = "CHECKOUT", amount, processingFee, referenceNumber, onSuccess }) => {
		console.log("BeepSDK Mock: requestPayment called", { type, amount, processingFee, referenceNumber });
		setTimeout(() => {
			const result = { status: "SUCCESS", message: "Payment successful", transactionId: "TXN-" + Date.now() };
			onSuccess ? onSuccess(result) : null;
			console.log("BeepSDK Mock: Returned mock payment result", result);
		}, 1000);
	},

	showDialog: ({ title, description, confirmButtonTitle, dismissButtonTitle, onConfirmPressed, onDismissPressed }) => {
		console.log("BeepSDK Mock: showDialog called", { title, description, confirmButtonTitle, dismissButtonTitle });

		// Updated to randomly simulate confirm or dismiss based on real app behavior
		setTimeout(() => {
			const isConfirmed = Math.random() > 0.5;
			if (isConfirmed) {
				console.log("BeepSDK Mock: Dialog confirmed");
				onConfirmPressed ? onConfirmPressed() : null;
			} else {
				console.log("BeepSDK Mock: Dialog dismissed");
				onDismissPressed ? onDismissPressed() : null;
			}
		}, 1000);
	},

	chooseImageFromFile: ({ allowMultiple, onSuccess, onFail }) => {
		console.log("BeepSDK Mock: chooseImageFromFile called", { allowMultiple });
		setTimeout(() => {
			const result = allowMultiple ? ["data:image/png;base64,mockImageData1", "data:image/png;base64,mockImageData2"] : "data:image/png;base64,mockImageData";
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

	httpRequest: ({ method = "GET", baseUrl, path = "", queryParameters = {}, headers = { "content-type": "application/json" }, requestBody = {}, onSuccess, onFail }) => {
		console.log("BeepSDK Mock: httpRequest called", { method, baseUrl, path, queryParameters, headers, requestBody });
		
		// If baseUrl is missing protocol, add https:// to match app behavior
		let modifiedBaseUrl = baseUrl;
		if (baseUrl && !baseUrl.match(/^https?:\/\//)) {
			modifiedBaseUrl = "https://" + baseUrl;
			console.log("BeepSDK Mock: Added https:// prefix to baseUrl:", modifiedBaseUrl);
		}
		
		// Construct the full URL with path and query parameters
		const url = new URL(path, modifiedBaseUrl);
		
		// Add query parameters if any
		if (queryParameters && Object.keys(queryParameters).length > 0) {
			Object.keys(queryParameters).forEach(key => {
				url.searchParams.append(key, queryParameters[key]);
			});
		}
		
		console.log("BeepSDK Mock: Making actual API call to:", url.toString());
		
		// Set up fetch options
		const fetchOptions = {
			method: method,
			headers: headers
		};
		
		// Add request body for non-GET requests if provided
		if (method !== 'GET' && requestBody && Object.keys(requestBody).length > 0) {
			fetchOptions.body = JSON.stringify(requestBody);
		}
		
		// Make the actual API call
		fetch(url.toString(), fetchOptions)
			.then(response => {
				return response.text().then(text => {
					return {
						status: response.status,
						statusText: response.statusText,
						text,
						response
					};
				});
			})
			.then(({ status, statusText, text, response }) => {
				// Create mock response object that matches the expected format
				const mockResponse = {
					statusCode: status,
					message: statusText,
					body: text,
					headers: Object.fromEntries([...response.headers])
				};
				
				// Log and return the response
				console.log("BeepSDK Mock: API call response:", mockResponse);
				
				if (status >= 200 && status < 300) {
					onSuccess ? onSuccess(mockResponse) : null;
				} else {
					onFail ? onFail({
						code: status,
						errorMessage: statusText || "Request failed"
					}) : null;
				}
			})
			.catch(error => {
				console.error("BeepSDK Mock: API call failed:", error);
				onFail ? onFail({
					code: -1,
					errorMessage: error.message || "Network request failed"
				}) : null;
			});
	},

	choosePhoneFromContact: ({ onSuccess, onFail } = {}) => {
		console.log("BeepSDK Mock: choosePhoneFromContact called");
		setTimeout(() => {
			const phoneData = {
				phoneNumber: "09123456789",
				name: "John Doe",
			};
			onSuccess ? onSuccess(phoneData) : null;
			console.log("BeepSDK Mock: Returned mock phone contact", phoneData);
		}, 1000);
	},

	datePicker: ({ format, minimumDate, maximumDate, onSuccess, onFail }) => {
		console.log("BeepSDK Mock: datePicker called", { format, minimumDate, maximumDate });
		console.log("BeepSDK Mock: datePicker event listener registered");

		// Updated to match actual app behavior which sends the date via event
		setTimeout(() => {
			// Create a mock event that mimics the one in the app
			const dateEvent = { isTrusted: false };

			// Dispatch a mock onDatePicked event
			console.log("BeepSDK Mock: onDatePicked event received", dateEvent);

			// Call onSuccess with the date in proper format
			const dateResult = {
				date: maximumDate || "2024-12-31",
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
		setTimeout(() => {
			console.log("BeepSDK Mock: appBarTitle result received", null);
		}, 200);
	},
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

		// Simulate onResumed event after 30 seconds
		setTimeout(() => {
			console.log("BeepSDK: onResumed event received", { isTrusted: false });
			if (this.onResumeHandler) {
				this.onResumeHandler();
			}
		}, 30000);
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
		console.log("BeepSDK: onResumed event received", { isTrusted: false });
		if (this.onResumeHandler) {
			this.onResumeHandler();
		}
	}

	simulatePause() {
		console.log("BeepSDK: onPaused event received", { isTrusted: false });
		if (this.onPausedHandler) {
			this.onPausedHandler();
		}
	}

	simulateStop() {
		console.log("BeepSDK: onWebViewClosed event received", { isTrusted: false });
		if (this.onStopHandler) {
			this.onStopHandler();
		}
	}
}
