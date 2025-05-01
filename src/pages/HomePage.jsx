import React, { useEffect } from "react";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
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
		<Container maxWidth="sm">
			<Box sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<Typography variant="h4" component="h1" gutterBottom>
					Welcome to Beep Mini App
				</Typography>

				<Typography variant="body1" align="center" paragraph>
					This is a simple demonstration of a mini-app that can run inside the Beep super app.
				</Typography>

				<Box sx={{ my: 3 }}>
					<Button 
						onClick={() => {
							console.log("Button clicked: Go to Second Page");
							navigateTo("second");
						}}
						variant="contained"
						color="primary"
						sx={{ m: 1 }}
					>
						Go to Second Page
					</Button>
				</Box>

				{/* BeepMiniApp SDK Demo */}
				<Paper elevation={2} sx={{ p: 3, width: '100%', mt: 3 }}>
					<BeepDemo />
				</Paper>
			</Box>
		</Container>
	);
};

export default HomePage;
