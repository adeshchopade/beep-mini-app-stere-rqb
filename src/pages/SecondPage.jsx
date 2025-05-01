import React, { useEffect } from "react";
import Button from "../components/Button";
import { useApp } from "../context/AppContext";

const SecondPage = () => {
	const { navigateTo } = useApp();

	useEffect(() => {
		console.log("Second page loaded");
	}, []);

	return (
		<div className="page-container">
			<h1 className="page-title">Second Page</h1>

			<p className="page-description">This is the second page of our mini-app. You can navigate back to the home page from here.</p>

			<div className="button-group">
				<Button onClick={() => navigateTo("home")}>Go Back to Home</Button>
			</div>
		</div>
	);
};

export default SecondPage;
