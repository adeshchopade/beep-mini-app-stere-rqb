import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useApp } from "../context/AppContext";
import { beepSDK } from "../utils/beepSDKWrapper";

const PaymentSuccess = () => {
	const { navigateTo, pageParams } = useApp();

	useEffect(() => {
		// Set app bar title
		beepSDK.appBarTitle({
			title: "Payment Success",
		});
		
		// Log payment details if available
		if (pageParams && pageParams.paymentDetails) {
			console.log("Payment details:", pageParams.paymentDetails);
		}
	}, [pageParams]);

	const handleGoToDashboard = () => {
		navigateTo("dashboard");
	};

	return (
		<Container maxWidth="sm">
			<Box
				sx={{
					py: 6,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					textAlign: "center",
				}}
			>
				<CheckCircleOutlineIcon
					sx={{ fontSize: 80, color: "#4CAF50", mb: 2 }}
				/>

				<Typography
					variant="h5"
					component="h1"
					gutterBottom
					sx={{ fontWeight: "bold", color: "#333" }}
				>
					Congratulations!
				</Typography>

				<Typography
					variant="body1"
					paragraph
					sx={{ mb: 4, px: 2, color: "#555" }}
				>
					You are now protected during your daily commute with beep™ Protect!
					<br />
					Worry Free Travel for work, school, or anywhere around the city now!
				</Typography>

				<Box
					sx={{
						bgcolor: "#EFF1F9",
						p: 3,
						borderRadius: 1,
						mb: 4,
						width: "100%",
					}}
				>
					<Typography
						variant="body1"
						sx={{ color: "#1E2562", fontWeight: "medium" }}
					>
						Your beep™ Protect Confirmation of Cover has been sent to your email
					</Typography>
				</Box>

				<Button
					fullWidth
					variant="contained"
					onClick={handleGoToDashboard}
					sx={{
						py: 1.5,
						backgroundColor: "#1E2562",
						borderRadius: 1,
						textTransform: "none",
						"&:hover": {
							backgroundColor: "#161c4d",
						},
					}}
				>
					Go to beep™ Protect Dashboard
				</Button>
			</Box>
		</Container>
	);
};

export default PaymentSuccess;