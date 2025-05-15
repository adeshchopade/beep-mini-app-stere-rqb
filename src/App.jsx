import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./styles/theme";
import { useApp } from "./context/AppContext";
import ApplicationForm from "./pages/ApplicationForm";
import Checkout from "./pages/Checkout";
import Terms from "./pages/Terms";
import Console from "./components/Console";
import { getMiniApp, beepSDK } from "./utils/beepSDKWrapper";
import Dashboard from "./pages/Dashboard";
import FAQ from "./pages/FAQ";
import PaymentSuccess from "./pages/PaymentSuccess";

const App = () => {
	const { page, consoleVisible } = useApp();

	// Initialize Mini App when component mounts
	useEffect(() => {
		// Initialize MiniApp with lifecycle handlers
		const MiniAppImpl = getMiniApp();
		new MiniAppImpl({
			onReady: () => {
				console.log("App is ready!");
				// Set app bar title
				beepSDK.appBarTitle({
					title: "Beep Protect",
				});

				beepSDK.onBackPressed({
					onTap: function () {
						beepSDK.closeMiniApp();
					},
				});
			},
			onResume: () => {
				console.log("App resumed!");
			},
			onPaused: () => {
				console.log("App paused!");
			},
			onStop: () => {
				console.log("App stopped!");
			},
		});
	}, []);

	// Determine which page to show
	const renderPage = () => {
		switch (page) {
			case "dashboard":
				return <Dashboard />;
			case "application-form":
				return <ApplicationForm />;
			case "checkout":
				return <Checkout />;
			case "payment-success":
				return <PaymentSuccess />;
			case "terms":
				return <Terms />;
			case "faq":
				return <FAQ />;
			default:
				console.error(`Unknown page: ${page}`);
				return <Dashboard />;
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className={`${consoleVisible ? "pb-[250px]" : ""}`}>
				{/* Main content */}
				{renderPage()}

				{/* Debug Console */}
				<Console />
			</div>
		</ThemeProvider>
	);
};

export default App;
