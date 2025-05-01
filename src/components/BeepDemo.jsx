import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useBeep } from "../context/BeepContext";
import ENV from "../utils/env";

const BeepDemo = () => {
	const { isReady, user, cards, fetchUser, fetchCards, showDialog, setActionButton, setAppBarTitle, closeMiniApp, appName } = useBeep();

	// Manual debug check
	const debugModeFromEnv = process.env.REACT_APP_DEBUG_MODE === "true";
	console.log("Manual conversion result:", debugModeFromEnv);

	// Setup the UI once when the app is ready
	// The flags in BeepContext will prevent multiple calls
	useEffect(() => {
		if (isReady) {
			console.log("BeepDemo: SDK is ready, setting up UI");
			// Setup action button
			setActionButton("Done", () => {
				showDialog("BeepMiniApp", "Do you want to close the mini app?", "Yes", "No", closeMiniApp, () => console.log("Dialog dismissed"));
			});

			// Set app bar title
			setAppBarTitle(appName);

			// Fetch user data
			fetchUser();
		} else {
			console.log("BeepDemo: SDK is not ready yet, waiting...");
		}
	}, [isReady, setActionButton, setAppBarTitle, fetchUser, closeMiniApp, showDialog, appName]);

	const handleGetCards = () => {
		fetchCards();
	};

	// Helper function to manually force the SDK ready state for debugging
	const forceSDKReady = () => {
		console.log("BeepDemo: Manually forcing SDK ready state");
		// Try to access the window.miniAppInstance that might be set in BeepContext
		if (window.miniAppInstance && typeof window.miniAppInstance.manuallyTriggerReady === "function") {
			window.miniAppInstance.manuallyTriggerReady();
			console.log("BeepDemo: Called manuallyTriggerReady on miniAppInstance");
		} else {
			console.warn("BeepDemo: No miniAppInstance found on window, can't manually trigger ready event");

			// Try to force flutter_inappwebview setup if it exists
			if (typeof window.flutter_inappwebview !== "undefined") {
				console.log("BeepDemo: window.flutter_inappwebview exists, trying to dispatch event manually");

				// Create and dispatch a manual event
				try {
					const readyEvent = new Event("flutterInAppWebViewPlatformReady");
					window.dispatchEvent(readyEvent);
					console.log("BeepDemo: Manually dispatched flutterInAppWebViewPlatformReady event");
				} catch (error) {
					console.error("BeepDemo: Error dispatching manual event:", error);
				}
			} else {
				console.error("BeepDemo: window.flutter_inappwebview is not defined, can't proceed with SDK initialization");
			}
		}
	};

	return (
		<Card elevation={0}>
			<CardContent>
				<Box sx={{ mb: 2 }}>
					<Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
						SDK Status:
						<Box
							component="span"
							sx={{
								ml: 1,
								fontWeight: "medium",
								color: isReady ? "success.main" : "error.main",
							}}
						>
							{isReady ? "Ready" : "Not Ready"}
						</Box>
					</Typography>

					{!isReady && (
						<Button 
							onClick={() => {
								console.log("Button clicked: Force SDK Ready (Debug)");
								forceSDKReady();
							}} 
							variant="contained" 
							color="error" 
							size="small" 
							sx={{ mt: 1, m: 1 }}
						>
							Force SDK Ready (Debug)
						</Button>
					)}
				</Box>

				<Card variant="outlined" sx={{ mb: 2, bgcolor: "grey.50" }}>
					<CardContent>
						<Typography variant="body2" component="div" sx={{ fontFamily: "monospace", fontSize: "0.75rem" }}>
							<Box component="p">BEEP API URL: {ENV.BEEP_API_URL}</Box>
							<Box component="p">Debug Mode: {String(ENV.DEBUG_MODE)}</Box>
							<Box component="p">REACT_APP_ENVIRONMENT: {ENV.ENVIRONMENT}</Box>
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
								Name: {user.firstName} {user.lastName}
							</Typography>
							<Typography variant="body2">Email: {user.email}</Typography>
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

				<Stack spacing={1} direction="column">
					<Button 
						onClick={() => {
							console.log("Button clicked: Get Cards");
							handleGetCards();
						}} 
						variant="contained" 
						color="primary" 
						fullWidth
						sx={{ m: 1 }}
					>
						Get Cards
					</Button>

					<Button
						onClick={() => {
							console.log("Button clicked: Show Dialog");
							showDialog(
								"BeepMiniApp",
								"This is a sample dialog from the BeepMiniApp SDK",
								"OK",
								"Cancel",
								() => console.log("Dialog confirmed"),
								() => console.log("Dialog dismissed")
							);
						}}
						variant="contained"
						color="secondary"
						fullWidth
						sx={{ m: 1 }}
					>
						Show Dialog
					</Button>
				</Stack>
			</CardContent>
		</Card>
	);
};

export default BeepDemo;
