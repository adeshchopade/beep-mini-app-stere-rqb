import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import BeepDemo from "../components/BeepDemo";
import { useApp } from "../context/AppContext";

const HomePage = () => {
	const { navigateTo } = useApp();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
	});

	useEffect(() => {
		console.log("Home page loaded");

		// Log user agent to help with debugging webview issues
		console.info("User Agent:", navigator.userAgent);

		// Log screen dimensions
		console.info(`Screen size: ${window.innerWidth}x${window.innerHeight}`);
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Simulate API response with form data and additional info
		const responseData = {
			...formData,
			timestamp: new Date().toISOString(),
			id: Math.floor(Math.random() * 1000),
		};
		console.log("Form submitted:", responseData);
		navigateTo("second", responseData);
	};

	return (
		<Container maxWidth="sm">
			<Box sx={{ py: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
				<Typography variant="h4" component="h1" gutterBottom>
					Welcome to Beep Mini App
				</Typography>

				<Typography variant="body1" align="center" paragraph>
					This is a simple demonstration of a mini-app that can run inside the Beep super app.
				</Typography>

				{/* Sample Form */}
				<Paper elevation={2} sx={{ p: 3, width: "100%", mb: 3 }}>
					<Typography variant="h6" gutterBottom>
						Sample Form
					</Typography>
					<form onSubmit={handleSubmit}>
						<TextField fullWidth margin="normal" label="Name" name="name" value={formData.name} onChange={handleChange} required />
						<TextField fullWidth margin="normal" label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
						<Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} fullWidth>
							Submit & Navigate
						</Button>
					</form>
				</Paper>

				<Box sx={{ my: 3 }}>
					<Button
						onClick={() => {
							console.log("Button clicked: Go to Second Page");
							navigateTo("second");
						}}
						variant="outlined"
						color="primary"
						sx={{ m: 1 }}
					>
						Go to Second Page (No Params)
					</Button>
				</Box>

				{/* BeepMiniApp SDK Demo */}
				<Paper elevation={2} sx={{ p: 3, width: "100%", mt: 3 }}>
					<BeepDemo />
				</Paper>
			</Box>
		</Container>
	);
};

export default HomePage;
