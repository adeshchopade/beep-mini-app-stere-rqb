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
			can: Math.floor(Math.random() * 10000000000000000),
			expiry: "2024-12-31 00:00:00.000Z",
			status: "ACTIVE",
			balance: 6197.49,
		},

		{
			can: Math.floor(Math.random() * 10000000000000000),
			expiry: "2025-01-31 00:00:00.000Z",
			status: "INACTIVE",
			balance: 1500.0,
		},
	],
};

// Mock reference number success response
const mockReferenceSuccess = {
	referenceNumber: "REF-12345-67890",
	processingFee: 15,
	totalAmount: 515,
	paymentId: "",
};

// Mock reference number error for requestReferenceNumber
const mockReferenceError = {
	error: {
		code: -1,
		errorMessage: "Invalid merchant_code",
	},
};

/**
 * Mock implementation of all BeepSDK methods
 */
export const beepSDKMock = {
	/**
     * Retrieves the user information.
     * @param {Object} options - The options for the request.
     * @param {Function} options.onSuccess - The callback function called when the request is successful.
     * @param {Function} options.onFail - The callback function called when the request fails.
     * 
     * @example
     * // Success response sample:
     * {
     *   "id": 1403,
     *   "firstName": "Adesh",
     *   "lastName": "Chopade",
     *   "phoneNumber": "9686812672",
     *   "email": "adesh@culvli.com"
     * }
     */
	getUser: ({ onSuccess, onFail }) => {
		console.log("BeepSDK Mock: getUser called");
		setTimeout(() => {
			onSuccess ? onSuccess(mockUser) : null;
			console.log("BeepSDK Mock: Returned mock user data", mockUser);
		}, 500);
	},

	/**
     * Retrieves the user's cards information.
     * @param {Object} options - The options for the request.
     * @param {Function} options.onSuccess - The callback function called when the request is successful.
     * @param {Function} options.onFail - The callback function called when the request fails.
     * 
     * @example
     * // Success response sample:
     * {
     *   "cards": [
     *     {
     *       "can": "6378059900462120",
     *       "expiry": "2024-12-31 00:00:00.000Z",
     *       "status": "ACTIVE",
     *       "balance": 6197.49
     *     }
     *   ]
     * }
     */
	getCards: ({ onSuccess, onFail }) => {
		console.log("BeepSDK Mock: getCards called");
		setTimeout(() => {
			onSuccess ? onSuccess(mockCards) : null;
			console.log("BeepSDK Mock: Returned mock cards data", mockCards);
		}, 500);
	},

	/**
     * Requests a reference number for payment.
     * @param {Object} options - The options for the request.
     * @param {string} options.merchantCode - The merchant code.
     * @param {string} options.product - The product description.
     * @param {number} options.amount - The payment amount.
     * @param {string} options.notifyUrl - The URL to notify after payment.
     * @param {Function} options.onSuccess - The callback function called when the request is successful.
     * @param {Function} options.onFail - The callback function called when the request fails.
     * 
     * @example
     * // Success response sample:
     * {
     *   "referenceNumber": "2505159J2B89nq",
     *   "processingFee": 15,
     *   "totalAmount": 515,
     *   "paymentId": ""
     * }
     * 
     * // Error response sample:
     * {
     *   "error": {
     *     "code": -1,
     *     "errorMessage": "Invalid merchant_code"
     *   }
     * }
     */
	requestReferenceNumber: ({ merchantCode, product, amount, notifyUrl, onSuccess, onFail }) => {
		console.log("BeepSDK Mock: requestReferenceNumber called", { merchantCode, product, amount, notifyUrl });
		setTimeout(() => {
			onSuccess ? onSuccess(mockReferenceSuccess) : null;
			//onFail ? onFail(mockReferenceError) : null;
			console.log("BeepSDK Mock: Returned mock reference number error", mockReferenceError);
		}, 500);
	},

	/**
     * Requests a payment transaction.
     * @param {Object} options - The options for the request.
     * @param {string} [options.type='CHECKOUT'] - The payment type.
     * @param {number} options.amount - The payment amount.
     * @param {number} options.processingFee - The processing fee amount.
     * @param {string} options.referenceNumber - The reference number.
     * @param {Function} options.onSuccess - The callback function called when the request is successful.
     * @param {Function} options.onFail - The callback function called when the request fails.
     * 
     * @example
     * // Success response sample:
     * {
     *   "status": "success",
     *   "amount": 500,
     *   "reference_number": "AFPI-2025-05-14-REFNO-1747249931442",
     *   "balance": 703643.51
     * }
     * 
     * // Error response sample:
     * {
     *   "status": "failed",
     *   "amount": 500,
     *   "reference_number": null,
     *   "balance": 0
     * }
     */
	requestPayment: ({ type = "CHECKOUT", amount, processingFee, referenceNumber, onSuccess, onFail }) => {
		console.log("BeepSDK Mock: requestPayment called", { type, amount, processingFee, referenceNumber });
		setTimeout(() => {
			const result = { status: "success", amount: amount, reference_number: referenceNumber, balance: Math.floor(Math.random() * 10000) };
			const error = { status: "failed", amount: amount, reference_number: referenceNumber, balance: 0 };
			onSuccess ? onSuccess(result) : null;
			//onFail ? onFail(error) : null;
			console.log("BeepSDK Mock: Returned mock payment result", result);
		}, 1000);
	},

	/**
     * Shows a dialog with confirm and dismiss options.
     * @param {Object} options - The options for the dialog.
     * @param {string} options.title - The dialog title.
     * @param {string} options.description - The dialog description.
     * @param {string} options.confirmButtonTitle - The confirm button text.
     * @param {string} options.dismissButtonTitle - The dismiss button text.
     * @param {Function} options.onConfirmPressed - The callback function called when confirm is pressed.
     * @param {Function} options.onDismissPressed - The callback function called when dismiss is pressed.
     * 
     * @example
     * // Result is a boolean: true for confirm, false for dismiss
     * // For example, when user confirms:
     * true
     * 
     * // For example, when user dismisses:
     * false
     */
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

	/**
     * Shows a loading indicator.
     * @param {Object} [options] - The options for the request.
     * @param {Function} [options.onSuccess] - The callback function called when the request is successful.
     * @param {Function} [options.onFail] - The callback function called when the request fails.
     * 
     * @example
     * // Success response sample:
     * true
     */
	showLoading: ({ onSuccess, onFail } = {}) => {
		console.log("BeepSDK Mock: showLoading called");
		// create a loading indicator
		const loadingIndicator = document.createElement("div");
		loadingIndicator.classList.add("loading-indicator");
		loadingIndicator.style.position = "fixed";
		loadingIndicator.style.top = "0";
		loadingIndicator.style.left = "0";
		loadingIndicator.style.width = "100%";
		loadingIndicator.style.height = "100%";
		loadingIndicator.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
		loadingIndicator.style.zIndex = "1000";
		loadingIndicator.style.display = "flex";
		loadingIndicator.style.justifyContent = "center";
		loadingIndicator.style.alignItems = "center";
		loadingIndicator.style.color = "#fff";
		loadingIndicator.style.fontSize = "24px";
		loadingIndicator.style.fontWeight = "bold";
		loadingIndicator.style.backdropFilter = "blur(10px)";
		loadingIndicator.style.webkitBackdropFilter = "blur(10px)";
		loadingIndicator.style.padding = "20px";
		loadingIndicator.style.boxShadow = "0 0 10px 0 rgba(0, 0, 0, 0.5)";
		loadingIndicator.style.animation = "spin 1s linear infinite";
		loadingIndicator.style.webkitAnimation = "spin 1s linear infinite";
		loadingIndicator.innerHTML = "Loading...";
		document.body.appendChild(loadingIndicator);

		setTimeout(() => {
			onSuccess ? onSuccess(true) : null;
			console.log("BeepSDK Mock: Loading shown (mock)");
		}, 200);
	},

	/**
     * Hides the loading indicator.
     * @param {Object} [options] - The options for the request.
     * @param {Function} [options.onSuccess] - The callback function called when the request is successful.
     * @param {Function} [options.onFail] - The callback function called when the request fails.
     * 
     * @example
     * // Success response sample:
     * true
     */
	hideLoading: ({ onSuccess, onFail } = {}) => {
		// remove the loading indicator
		const loadingIndicator = document.querySelector(".loading-indicator");
		if (loadingIndicator) {
			loadingIndicator.remove();
		}
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

		// Properly construct the full URL with path
		// Use string manipulation instead of URL constructor to preserve full base URL path
		let fullUrl = modifiedBaseUrl;

		// Ensure we don't have double slashes when joining paths
		if (path) {
			if (path.startsWith("/")) {
				// If baseUrl ends with / and path starts with /, remove one
				if (fullUrl.endsWith("/")) {
					fullUrl = fullUrl + path.substring(1);
				} else {
					fullUrl = fullUrl + path;
				}
			} else {
				// If path doesn't start with / and baseUrl doesn't end with /, add one
				if (!fullUrl.endsWith("/")) {
					fullUrl = fullUrl + "/" + path;
				} else {
					fullUrl = fullUrl + path;
				}
			}
		}

		// Create URL object to handle query parameters
		const url = new URL(fullUrl);

		// Add query parameters if any
		if (queryParameters && Object.keys(queryParameters).length > 0) {
			Object.keys(queryParameters).forEach((key) => {
				url.searchParams.append(key, queryParameters[key]);
			});
		}

		console.log("BeepSDK Mock: Making actual API call to:", url.toString());

		// Set up fetch options
		const fetchOptions = {
			method: method,
			headers: headers,
		};

		// Add request body for non-GET requests if provided
		if (method !== "GET" && requestBody) {
			fetchOptions.body = typeof requestBody === "string" ? requestBody : JSON.stringify(requestBody);
		}

		// Make the actual API call
		fetch(url.toString(), fetchOptions)
			.then((response) => {
				return response.text().then((text) => {
					return {
						status: response.status,
						statusText: response.statusText,
						text,
						response,
					};
				});
			})
			.then(({ status, statusText, text, response }) => {
				// Create mock response object that matches the expected format
				const mockResponse = {
					statusCode: status,
					message: statusText,
					body: text,
					headers: Object.fromEntries([...response.headers]),
				};

				// Log and return the response
				console.log("BeepSDK Mock: API call response:", mockResponse);

				if (status >= 200 && status < 300) {
					onSuccess ? onSuccess(mockResponse) : null;
				} else {
					onFail
						? onFail({
								code: status,
								errorMessage: statusText || "Request failed",
						  })
						: null;
				}
			})
			.catch((error) => {
				console.error("BeepSDK Mock: API call failed:", error);
				onFail
					? onFail({
							code: -1,
							errorMessage: error.message || "Network request failed",
					  })
					: null;
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

	/**
     * Opens a date picker.
     * @param {Object} options - The options for the date picker.
     * @param {string} options.format - The date format (e.g., 'yyyy-MM-dd').
     * @param {string} options.minimumDate - The minimum selectable date.
     * @param {string} options.maximumDate - The maximum selectable date.
     * @param {Function} options.onSuccess - The callback function called when date is selected.
     * @param {Function} options.onFail - The callback function called when selection fails.
     * 
     * @example
     * // Success response sample:
     * {
     *   "date": "2024-01-31"
     * }
     */
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

	/**
     * Sets the app bar title.
     * @param {Object} options - The options for the app bar title.
     * @param {string} options.title - The title text.
     * 
     * @example
     * // Response sample:
     * null
     */
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
