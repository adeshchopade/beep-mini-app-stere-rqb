import React, { useEffect, useState } from "react";
import { useBeep } from "../context/BeepContext";
import Button from "./Button";
import ENV from "../utils/env";

const BeepDemo = () => {
	const { isReady, user, cards, fetchUser, fetchCards, showDialog, setActionButton, setAppBarTitle, closeMiniApp, appName, version } = useBeep();
	const [showEnvDetails, setShowEnvDetails] = useState(false);

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
		<div className="beep-demo p-4 bg-white rounded-lg shadow-md">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-lg font-bold">{appName}</h2>
				<span className="text-xs text-gray-500">v{version}</span>
			</div>

			<div className="mb-4">
				<p className="text-sm text-gray-500 mb-2">
					SDK Status: <span className={`font-medium ${isReady ? "text-green-600" : "text-red-600"}`}>{isReady ? "Ready" : "Not Ready"}</span>
				</p>

				{!isReady && (
					<Button onClick={forceSDKReady} variant="danger">
						Force SDK Ready (Debug)
					</Button>
				)}
			</div>

			<div className="mb-4">
				<div className="mt-2 p-3 bg-gray-100 rounded text-xs font-mono">
					<p>BEEP API URL: {ENV.BEEP_API_URL}</p>
					<p>Debug Mode: {String(ENV.DEBUG_MODE)}</p>
					<p>Debug Mode (raw): {process.env.REACT_APP_DEBUG_MODE}</p>
					<p>REACT_APP_ENVIRONMENT: {ENV.ENVIRONMENT}</p>
					<p>NODE_ENV: {process.env.NODE_ENV}</p>
				</div>
			</div>

			{user && (
				<div className="mb-4 p-3 bg-gray-100 rounded-md">
					<h3 className="font-medium mb-2">User Information</h3>
					<p>ID: {user.id}</p>
					<p>
						Name: {user.firstName} {user.lastName}
					</p>
					<p>Email: {user.email}</p>
				</div>
			)}

			{cards && (
				<div className="mb-4 p-3 bg-gray-100 rounded-md">
					<h3 className="font-medium mb-2">Cards</h3>
					{cards.cards.map((card, index) => (
						<div key={index} className="mb-2 p-2 bg-white rounded border border-gray-200">
							<p>Card: {card.can}</p>
							<p>Expiry: {new Date(card.expiry).toLocaleDateString()}</p>
							<p>Status: {card.status}</p>
							<p>Balance: ₱{card.balance.toFixed(2)}</p>
						</div>
					))}
				</div>
			)}

			<div className="flex flex-col space-y-2">
				<Button onClick={handleGetCards} variant="primary">
					Get Cards
				</Button>

				<Button
					onClick={() =>
						showDialog(
							"BeepMiniApp",
							"This is a sample dialog from the BeepMiniApp SDK",
							"OK",
							"Cancel",
							() => console.log("Dialog confirmed"),
							() => console.log("Dialog dismissed")
						)
					}
					variant="secondary"
				>
					Show Dialog
				</Button>
			</div>
		</div>
	);
};

export default BeepDemo;
