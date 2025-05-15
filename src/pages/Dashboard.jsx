import React from "react";
import Container from "@mui/material/Container";
import { useApp } from "../context/AppContext";
import { Box, Typography, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Banner from "../components/Banner";
import LoadingScreen from "../components/LoadingScreen";
import ErrorMessage from "../components/ErrorMessage";
import BeepCard from "../components/BeepCard";
import { useDashboard } from "../hooks/useDashboard";
import { beepSDK } from "../utils/beepSDKWrapper";

const Dashboard = () => {
	const { navigateTo } = useApp();
	const {
		loading,
		error,
		userData,
		cards,
		expandedCards,
		toggleCardExpansion
	} = useDashboard(navigateTo);

	const handleFAQClick = () => {
		navigateTo("faq");
	};

	const handleBackClick = () => {
		beepSDK.closeMiniApp();
	};

	// Show loading state
	if (loading) {
		return (
			<>
				<Banner />
				<Container maxWidth="sm">
					<LoadingScreen message="Loading your beep™ Protect information..." />
				</Container>
			</>
		);
	}

	// Show error state
	if (error) {
		return (
			<>
				<Banner />
				<Container maxWidth="sm">
					<ErrorMessage 
						message={error} 
						onRetry={() => window.location.reload()} 
					/>
				</Container>
			</>
		);
	}

	return (
		<>
			<Banner />

			<Container maxWidth="sm" sx={{ pb: 4 }}>
				{/* Welcome Message */}
				<Typography
					variant="h5"
					component="h1"
					sx={{
						mb: 3,
						fontWeight: "bold",
						textAlign: "center",
					}}
				>
					beep™ Protect dashboard
				</Typography>
				<Typography
					variant="h6"
					component="h2"
					sx={{
						mb: 4,
						textAlign: "center",
					}}
				>
					Good day, {userData?.firstName || "User"}!
				</Typography>

				{/* Cards Section */}
				<Box sx={{ mb: 4 }}>
					{cards.length > 0 ? (
						cards.map((card) => (
							<BeepCard
								key={card.rawCardNumber}
								card={card}
								isExpanded={expandedCards[card.rawCardNumber] || false}
								onToggleExpand={() => toggleCardExpansion(card.rawCardNumber)}
							/>
						))
					) : (
						<Typography variant="body1" sx={{ textAlign: "center", py: 2 }}>
							No existing beep™ Protect subscription.
						</Typography>
					)}
				</Box>

				{/* Add another card link */}
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						mb: 4,
					}}
				>
					<Typography
						variant="body1"
						color="primary"
						sx={{
							textDecoration: "underline",
							fontWeight: "medium",
							cursor: "pointer",
						}}
						onClick={() => navigateTo("application-form")}
					>
						{cards.length > 0 ? "Add beep™ Protect to another card" : "Register for beep™ Protect now!"}
					</Typography>
				</Box>

				{/* FAQ Button */}
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						mb: 2,
					}}
				>
					<Button
						variant="contained"
						sx={{
							width: "200px",
							borderRadius: 1,
							bgcolor: "#1a237e",
							py: 1.5,
						}}
						onClick={handleFAQClick}
					>
						FAQ
					</Button>
				</Box>

				{/* Manage text */}
				<Typography
					variant="body2"
					sx={{
						textAlign: "center",
						mb: 2,
						color: "text.secondary",
					}}
				>
					Manage my beep™ Protect
				</Typography>

				{/* Back Button */}
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
					}}
				>
					<Button
						variant="contained"
						sx={{
							width: "100%",
							maxWidth: "500px",
							py: 1.5,
							bgcolor: "#42a5f5",
						}}
						startIcon={<ArrowBackIcon />}
						onClick={handleBackClick}
					>
						Back
					</Button>
				</Box>
			</Container>
		</>
	);
};

export default Dashboard;
