import React, { createContext, useState, useContext, useEffect, useCallback, useRef } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ENV from "../utils/env";
// Import from wrapper instead of direct SDK
import { beepSDK, getMiniApp, isBrowserEnvironment } from "../utils/beepSDKWrapper";

const BeepDemo = () => {
	const [user, setUser] = useState(null);
	const [cards, setCards] = useState(null);
	const [referenceNumber, setReferenceNumber] = useState(null);
	const [referenceNumberError, setReferenceNumberError] = useState(null);
	const [paymentResponse, setPaymentResponse] = useState(null);
	const [httpResponse, setHttpResponse] = useState(null);
	const [httpError, setHttpError] = useState(null);
	const [contactSelected, setContactSelected] = useState(null);
	const [dateSelected, setDateSelected] = useState(null);
	const [isInBrowser, setIsInBrowser] = useState(false);

	// Setup the UI once when the app is ready
	useEffect(() => {
		// Check if we're in browser environment
		setIsInBrowser(isBrowserEnvironment());

		// Initialize app with proper MiniApp implementation
		const MiniAppImpl = getMiniApp();
		new MiniAppImpl({
			onReady: () => {
				console.log("App is ready!");
				// Fetch user data
				fetchUser();
			},
			onResume: () => {
				console.log("App resumed!");
			},
			onPaused: () => {
				console.log("App paused!");
			},
			onStop: () => {
				console.log("App stopped!");
			}
		});
	}, []);

	// Method to fetch user data
	const fetchUser = useCallback(() => {
		console.log("BeepDemo: Fetching user data");

		beepSDK.getUser({
			onSuccess: (userData) => {
				setUser(userData);
				console.log("BeepDemo: User data fetched successfully:", userData);
			},
			onFail: (error) => {
				console.error("BeepDemo: Failed to fetch user:", error);
			},
		});
	}, []);

	// Method to fetch cards data
	const fetchCards = useCallback(() => {
		console.log("BeepDemo: Fetching cards data");

		beepSDK.getCards({
			onSuccess: (cardsData) => {
				setCards(cardsData);
				console.log("BeepDemo: Cards data fetched successfully:", cardsData);
			},
			onFail: (error) => {
				console.error("BeepDemo: Failed to fetch cards:", error);
			},
		});
	}, []);

	// Method to request reference number
	const handleRequestReferenceNumber = useCallback(() => {
		console.log("BeepDemo: Requesting reference number");
		
		// Reset previous errors or success
		setReferenceNumber(null);
		setReferenceNumberError(null);

		beepSDK.requestReferenceNumber({
			merchantCode: "M-04282025-000003528",
			product: "Test Product",
			amount: 100,
			notifyUrl: "https://example.com/notify",
			onSuccess: (response) => {
				setReferenceNumber(response);
				console.log("BeepDemo: Reference number received:", response);
			},
			onFail: (error) => {
				setReferenceNumberError(error);
				console.error("BeepDemo: Failed to get reference number:", error);
			}
		});
	}, []);

	// Method to request payment
	const handleRequestPayment = useCallback(() => {
		console.log("BeepDemo: Requesting payment");

		beepSDK.requestPayment({
			type: "CHECKOUT",
			amount: 100,
			processingFee: 0,
			referenceNumber: referenceNumber?.referenceNumber || "REF-TEST-12345",
			onSuccess: (response) => {
				setPaymentResponse(response);
				console.log("BeepDemo: Payment response received:", response);
			}
		});
	}, [referenceNumber]);

	// Method to show dialog
	const handleShowDialog = useCallback(() => {
		console.log("BeepDemo: Showing dialog");

		beepSDK.showDialog({
			title: "Test Dialog",
			description: "This is a test dialog from BeepSDK mock implementation",
			confirmButtonTitle: "Confirm",
			dismissButtonTitle: "Cancel",
			onConfirmPressed: () => {
				console.log("BeepDemo: Dialog confirmed");
			},
			onDismissPressed: () => {
				console.log("BeepDemo: Dialog dismissed");
			}
		});
	}, []);

	// Method to test HTTP request
	const handleHttpRequest = useCallback(() => {
		console.log("BeepDemo: Making HTTP request");
		
		// Reset previous response or error
		setHttpResponse(null);
		setHttpError(null);

		// Using the same format as the app developer's example
		beepSDK.showLoading({
			onSuccess: () => {
				console.log("BeepDemo: Loading shown for HTTP request");
				
				beepSDK.httpRequest({
					method: "GET",
					baseUrl: "jsonplaceholder.typicode.com", // No https:// prefix, matching app developer's example
					path: "/users",
					onSuccess: (response) => {
						setHttpResponse(response);
						console.log("BeepDemo: HTTP response received:", response);
						
						// Parse JSON body if available
						if (response.body) {
							try {
								const parsedBody = JSON.parse(response.body);
								console.log("BeepDemo: Parsed response body:", parsedBody);
							} catch (e) {
								console.error("BeepDemo: Failed to parse response body:", e);
							}
						}
						
						beepSDK.hideLoading({
							onSuccess: () => {
								console.log("BeepDemo: Loading hidden after HTTP request");
							}
						});
					},
					onFail: (error) => {
						setHttpError(error);
						console.error("BeepDemo: HTTP request failed", error);
						
						beepSDK.hideLoading({
							onSuccess: () => {
								console.log("BeepDemo: Loading hidden after HTTP request error");
							}
						});
					}
				});
			}
		});
	}, []);

	// Method to test HTTP request with different URL/path
	const handleAlternativeHttpRequest = useCallback(() => {
		console.log("BeepDemo: Making HTTP request with different URL");
		
		// Reset previous response or error
		setHttpResponse(null);
		setHttpError(null);

		beepSDK.showLoading();
		beepSDK.httpRequest({
			method: "GET",
			baseUrl: "jsonplaceholder.typicode.com",
			path: "/posts/1",
			onSuccess: function (resp) {
				console.log(resp.statusCode + " " + resp.body);
				setHttpResponse(resp);
				beepSDK.hideLoading();
			},
			onFail: function (resp) {
				console.log(resp.statusCode + " " + resp.errorMessage);
				setHttpError(resp);
				beepSDK.hideLoading();
			},
		});
	}, []);

	// Method to choose phone from contact
	const handleChoosePhoneFromContact = useCallback(() => {
		console.log("BeepDemo: Choosing phone from contact");

		beepSDK.choosePhoneFromContact({
			onSuccess: (contact) => {
				setContactSelected(contact);
				console.log("BeepDemo: Contact selected:", contact);
			},
			onFail: (error) => {
				console.error("BeepDemo: Failed to select contact:", error);
			}
		});
	}, []);

	// Method to show date picker
	const handleDatePicker = useCallback(() => {
		console.log("BeepDemo: Opening date picker");

		beepSDK.datePicker({
			format: "yyyy-MM-dd",
			minimumDate: "2022-01-01",
			maximumDate: "2024-12-31",
			onSuccess: (dateData) => {
				setDateSelected(dateData);
				console.log("BeepDemo: Date selected:", dateData);
			},
			onFail: (error) => {
				console.error("BeepDemo: Failed to select date:", error);
			}
		});
	}, []);

	// Method to test loading indicator
	const handleTestLoading = useCallback(() => {
		console.log("BeepDemo: Testing loading indicator");

		beepSDK.showLoading({
			onSuccess: () => {
				console.log("BeepDemo: Loading shown");
				
				// Hide loading after 2 seconds
				setTimeout(() => {
					beepSDK.hideLoading({
						onSuccess: () => {
							console.log("BeepDemo: Loading hidden");
						}
					});
				}, 2000);
			}
		});
	}, []);

	// Method to set app bar title
	const handleSetAppBarTitle = useCallback(() => {
		console.log("BeepDemo: Setting app bar title");

		beepSDK.appBarTitle({
			title: "BeepSDK Demo"
		});
	}, []);

	// Method to close mini app
	const handleCloseMiniApp = useCallback(() => {
		console.log("BeepDemo: Closing mini app");
		beepSDK.closeMiniApp();
	}, []);

	// Method to simulate lifecycle events (only in browser)
	const handleSimulateResume = useCallback(() => {
		if (window.mockTriggerActionButton) {
			window.mockTriggerActionButton();
		}

		// Access MiniAppMock directly when in browser for testing
		if (isInBrowser && window._miniAppMockInstance) {
			window._miniAppMockInstance.simulateResume();
		}
	}, [isInBrowser]);

	return (
		<Card elevation={0}>
			<CardContent>
				<Card variant="outlined" sx={{ mb: 2, bgcolor: "grey.50" }}>
					<CardContent>
						<Typography variant="body2" component="div" sx={{ fontFamily: "monospace", fontSize: "0.75rem" }}>
							<Box component="p">BEEP API URL: {ENV.BEEP_API_URL}</Box>
							<Box component="p">Debug Mode: {String(ENV.DEBUG_MODE)}</Box>
							<Box component="p">REACT_APP_ENVIRONMENT: {ENV.ENVIRONMENT}</Box>
							<Box component="p">Is Mock: {String(isInBrowser)}</Box>
						</Typography>
					</CardContent>
				</Card>

				{user && (
					<Card variant="outlined" sx={{ mb: 2, bgcolor: "grey.50" }}>
						<CardContent>
							<Typography variant="subtitle2" sx={{ mb: 1 }}>
								User Information
							</Typography>
							<Typography variant="body2">ID: {user.id}</Typography>
							<Typography variant="body2">
								Name: {user.firstName || "N/A"} {user.lastName || ""}
							</Typography>
							<Typography variant="body2">Email: {user.email || "N/A"}</Typography>
							{user.phoneNumber && (
								<Typography variant="body2">Phone: {user.phoneNumber}</Typography>
							)}
						</CardContent>
					</Card>
				)}

				{cards && (
					<Card variant="outlined" sx={{ mb: 2, bgcolor: "grey.50" }}>
						<CardContent>
							<Typography variant="subtitle2" sx={{ mb: 1 }}>
								Cards
							</Typography>
							<Stack spacing={1}>
								{cards.cards.map((card, index) => (
									<Card key={index} variant="outlined">
										<CardContent sx={{ py: 1, "&:last-child": { pb: 1 } }}>
											<Typography variant="body2">Card: {card.can}</Typography>
											<Typography variant="body2">Expiry: {new Date(card.expiry).toLocaleDateString()}</Typography>
											<Typography variant="body2">Status: {card.status}</Typography>
											<Typography variant="body2">Balance: ₱{card.balance.toFixed(2)}</Typography>
										</CardContent>
									</Card>
								))}
							</Stack>
						</CardContent>
					</Card>
				)}

				{referenceNumberError && (
					<Card variant="outlined" sx={{ mb: 2, bgcolor: "error.light" }}>
						<CardContent>
							<Typography variant="subtitle2" sx={{ mb: 1 }}>
								Reference Number Error
							</Typography>
							<Typography variant="body2">
								Code: {referenceNumberError.error?.code}
							</Typography>
							<Typography variant="body2">
								Message: {referenceNumberError.error?.errorMessage}
							</Typography>
						</CardContent>
					</Card>
				)}

				{referenceNumber && (
					<Card variant="outlined" sx={{ mb: 2, bgcolor: "grey.50" }}>
						<CardContent>
							<Typography variant="subtitle2" sx={{ mb: 1 }}>
								Reference Number
							</Typography>
							<Typography variant="body2">Ref: {referenceNumber.referenceNumber}</Typography>
							<Typography variant="body2">Message: {referenceNumber.message}</Typography>
						</CardContent>
					</Card>
				)}

				{paymentResponse && (
					<Card variant="outlined" sx={{ mb: 2, bgcolor: "grey.50" }}>
						<CardContent>
							<Typography variant="subtitle2" sx={{ mb: 1 }}>
								Payment Response
							</Typography>
							<Typography variant="body2">Status: {paymentResponse.status}</Typography>
							<Typography variant="body2">Message: {paymentResponse.message}</Typography>
							{paymentResponse.transactionId && (
								<Typography variant="body2">Transaction ID: {paymentResponse.transactionId}</Typography>
							)}
						</CardContent>
					</Card>
				)}

				{httpError && (
					<Card variant="outlined" sx={{ mb: 2, bgcolor: "error.light" }}>
						<CardContent>
							<Typography variant="subtitle2" sx={{ mb: 1 }}>
								HTTP Error
							</Typography>
							<Typography variant="body2">Code: {httpError.code}</Typography>
							<Typography variant="body2">Message: {httpError.errorMessage}</Typography>
						</CardContent>
					</Card>
				)}

				{httpResponse && (
					<Card variant="outlined" sx={{ mb: 2, bgcolor: "grey.50" }}>
						<CardContent>
							<Typography variant="subtitle2" sx={{ mb: 1 }}>
								HTTP Response
							</Typography>
							<Typography variant="body2">Status: {httpResponse.statusCode}</Typography>
							<Typography variant="body2" sx={{ fontFamily: "monospace", fontSize: "0.7rem", wordBreak: "break-all" }}>
								{httpResponse.body}
							</Typography>
						</CardContent>
					</Card>
				)}

				{contactSelected && (
					<Card variant="outlined" sx={{ mb: 2, bgcolor: "grey.50" }}>
						<CardContent>
							<Typography variant="subtitle2" sx={{ mb: 1 }}>
								Contact Selected
							</Typography>
							<Typography variant="body2">Name: {contactSelected.name}</Typography>
							<Typography variant="body2">Phone: {contactSelected.phoneNumber}</Typography>
						</CardContent>
					</Card>
				)}

				{dateSelected && (
					<Card variant="outlined" sx={{ mb: 2, bgcolor: "grey.50" }}>
						<CardContent>
							<Typography variant="subtitle2" sx={{ mb: 1 }}>
								Date Selected
							</Typography>
							<Typography variant="body2">Date: {dateSelected.date}</Typography>
						</CardContent>
					</Card>
				)}

				<Stack spacing={1} direction="column">
					<Button
						onClick={fetchUser}
						variant="contained"
						color="primary"
						fullWidth
						sx={{ m: 1 }}
					>
						Get User
					</Button>

					<Button
						onClick={fetchCards}
						variant="contained"
						color="primary"
						fullWidth
						sx={{ m: 1 }}
					>
						Get Cards
					</Button>

					<Button
						onClick={handleRequestReferenceNumber}
						variant="contained"
						color="primary"
						fullWidth
						sx={{ m: 1 }}
					>
						Request Reference Number
					</Button>

					<Button
						onClick={handleRequestPayment}
						variant="contained"
						color="primary"
						fullWidth
						sx={{ m: 1 }}
						disabled={!referenceNumber && !isInBrowser}
					>
						Request Payment
					</Button>

					<Button
						onClick={handleShowDialog}
						variant="contained"
						color="primary"
						fullWidth
						sx={{ m: 1 }}
					>
						Show Dialog
					</Button>

					<Button
						onClick={handleHttpRequest}
						variant="contained"
						color="primary"
						fullWidth
						sx={{ m: 1 }}
					>
						Test HTTP Request
					</Button>

					<Button
						onClick={handleAlternativeHttpRequest}
						variant="contained"
						color="primary"
						fullWidth
						sx={{ m: 1 }}
					>
						Test Alternative HTTP Request
					</Button>

					<Button
						onClick={handleChoosePhoneFromContact}
						variant="contained"
						color="primary"
						fullWidth
						sx={{ m: 1 }}
					>
						Choose Phone Contact
					</Button>

					<Button
						onClick={handleDatePicker}
						variant="contained"
						color="primary"
						fullWidth
						sx={{ m: 1 }}
					>
						Open Date Picker
					</Button>

					<Button
						onClick={handleTestLoading}
						variant="contained"
						color="primary"
						fullWidth
						sx={{ m: 1 }}
					>
						Test Loading Indicator
					</Button>

					<Button
						onClick={handleSetAppBarTitle}
						variant="contained"
						color="primary"
						fullWidth
						sx={{ m: 1 }}
					>
						Set App Bar Title
					</Button>

					{isInBrowser && (
						<Button
							onClick={handleSimulateResume}
							variant="contained"
							color="warning"
							fullWidth
							sx={{ m: 1 }}
						>
							Simulate Resume Event
						</Button>
					)}

					<Button
						onClick={handleCloseMiniApp}
						variant="contained"
						color="secondary"
						fullWidth
						sx={{ m: 1 }}
					>
						Close Mini App
					</Button>
				</Stack>
			</CardContent>
		</Card>
	);
};

export default BeepDemo;
