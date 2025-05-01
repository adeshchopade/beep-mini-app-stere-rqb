import React, { useEffect } from "react";
import Button from "../components/Button";
import BeepDemo from "../components/BeepDemo";
import { useApp } from "../context/AppContext";

const HomePage = () => {
	const { navigateTo } = useApp();

	useEffect(() => {
		console.log("Home page loaded");

		// Log user agent to help with debugging webview issues
		console.info("User Agent:", navigator.userAgent);

		// Log screen dimensions
		console.info(`Screen size: ${window.innerWidth}x${window.innerHeight}`);
	}, []);

	return (
		<div className="page-container">
			<h1 className="page-title">Welcome to Beep Mini App</h1>

			<p className="page-description">This is a simple demonstration of a mini-app that can run inside the Beep super app.</p>

			<div className="button-group">
				<Button onClick={() => navigateTo("second")}>Go to Second Page</Button>
			</div>

			{/* BeepMiniApp SDK Demo */}
			<div className="mt-6">
				<BeepDemo />
			</div>
		</div>
	);
};

export default HomePage;
