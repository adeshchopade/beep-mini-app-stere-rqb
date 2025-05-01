import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AppProvider } from "./context/AppContext";
import "./styles/index.css";

// Flag to track if app has been initialized
let hasInitialized = false;

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
	console.log("Application starting...");

	// Skip initialization if already done (prevents duplicate initialization during hot reload)
	if (hasInitialized) {
		console.log("Application already initialized, skipping duplicate initialization");
		return;
	}

	const rootElement = document.getElementById("root");
	if (!rootElement) {
		console.error("Root element not found");
		return;
	}

	try {
		const root = createRoot(rootElement);

		root.render(
			<AppProvider>
				<App />
			</AppProvider>
		);

		hasInitialized = true;
		console.log("Application rendered successfully");
	} catch (error) {
		console.error("Error rendering application:", error);
	}
});

// Log when the window has fully loaded
window.addEventListener("load", () => {
	console.log("Window fully loaded");

	// Check if running in WebView
	const isWebView = /(WebView|iPhone|iPod|iPad|Android)/.test(navigator.userAgent);
	console.info(`Running in ${isWebView ? "WebView" : "Browser"}`);
});
