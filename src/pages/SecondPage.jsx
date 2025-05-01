import React, { useEffect } from "react";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useApp } from "../context/AppContext";

const SecondPage = () => {
	const { navigateTo, pageParams } = useApp();

	useEffect(() => {
		console.log("Second page loaded", pageParams);
	}, [pageParams]);

	return (
		<Container maxWidth="sm">
			<Box sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<Typography variant="h4" component="h1" gutterBottom>
					Second Page
				</Typography>

				<Typography variant="body1" align="center" paragraph>
					This is the second page of our mini-app. You can navigate back to the home page from here.
				</Typography>

				{/* Display passed parameters */}
				{Object.keys(pageParams).length > 0 && (
					<Paper elevation={3} sx={{ p: 2, mb: 3, width: '100%' }}>
						<Typography variant="h6" gutterBottom>
							Received Data:
						</Typography>
						<pre style={{ overflow: 'auto', maxHeight: '200px' }}>
							{JSON.stringify(pageParams, null, 2)}
						</pre>
					</Paper>
				)}

				<Box sx={{ my: 3 }}>
					<Button 
						onClick={() => {
							console.log("Button clicked: Go Back to Home");
							navigateTo("home");
						}}
						variant="contained"
						color="secondary"
						sx={{ m: 1 }}
					>
						Go Back to Home
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default SecondPage;
