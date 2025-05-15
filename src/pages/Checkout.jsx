import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useApp } from "../context/AppContext";
import { useCheckout } from "../hooks/useCheckout";
import CheckoutLayout from "../components/CheckoutLayout";
import CheckoutForm from "../components/CheckoutForm";

const Checkout = () => {
	const { navigateTo, pageParams } = useApp();
	const {
		loading,
		error,
		quote,
		beepCards,
		totalAmount,
		basePremium,
		taxes,
		isProcessing,
		handleNavigateBack,
		handleContinuePayment
	} = useCheckout(pageParams, navigateTo);

	// If no data available or quote not generated, show error message
	if (loading) {
		return <CheckoutLayout loading={loading} />;
	}

	// If no quote is found
	if (!quote) {
		return (
			<Container maxWidth="sm">
				<Box sx={{ py: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
					<Typography variant="h5" component="h1" gutterBottom>
						No Data Available
					</Typography>

					<Typography variant="body1" align="center" paragraph>
						No submission data available. Please go back and complete the registration form.
					</Typography>

					<Button
						onClick={handleNavigateBack}
						variant="contained"
						sx={{
							mt: 2,
							backgroundColor: "#f39c12",
							"&:hover": {
								backgroundColor: "#e67e22",
							},
						}}
					>
						Back to Registration
					</Button>
				</Box>
			</Container>
		);
	}
	
	// If quote is not in generated status
	if (quote.status !== "generated") {
		return (
			<Container maxWidth="sm">
				<Box sx={{ py: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
					<Typography variant="h5" component="h1" gutterBottom>
						Quote Not Available
					</Typography>

					<Typography variant="body1" align="center" paragraph>
						Quote is not generated yet. Please try again later.
					</Typography>

					<Button
						onClick={handleNavigateBack}
						variant="contained"
						sx={{
							mt: 2,
							backgroundColor: "#f39c12",
							"&:hover": {
								backgroundColor: "#e67e22",
							},
						}}
					>
						Back to Registration
					</Button>
				</Box>
			</Container>
		);
	}

	return (
		<CheckoutLayout error={error}>
			<CheckoutForm
				beepCards={beepCards}
				totalAmount={totalAmount}
				basePremium={basePremium}
				taxes={taxes}
				isProcessing={isProcessing}
				onChangeCard={handleNavigateBack}
				onContinuePayment={handleContinuePayment}
			/>
		</CheckoutLayout>
	);
};

export default Checkout;