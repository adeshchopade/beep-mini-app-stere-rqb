import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useApp } from "../context/AppContext";
import { useBeepCards } from "../hooks/useBeepCards";
import { submissionService } from "../services/submissionService";
import ApplicationFormLayout from "../components/ApplicationFormLayout";
import BeepCardForm from "../components/BeepCardForm";

const ApplicationForm = () => {
	const { navigateTo, applicationFormState, saveApplicationFormState } = useApp();
	const [termsAccepted, setTermsAccepted] = useState(applicationFormState.termsAccepted || false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [shouldSaveState, setShouldSaveState] = useState(false);
	
	// Use the custom hook to manage beep cards
	const {
		loading,
		error,
		setError,
		cards,
		selectedCards,
		formData,
		fetchUserAndCards,
		handleCardSelection,
		handleInputChange,
		handleDateChange,
		getSelectedCardDetails,
		getSelectedFormData,
		isFormValid,
	} = useBeepCards(applicationFormState);

	useEffect(() => {
		// If there's saved state with cards, the hook will set loading=false
		// Otherwise, fetch the cards data
		if (!applicationFormState.cards || applicationFormState.cards.length === 0) {
			fetchUserAndCards();
		}
	}, []);  // Empty dependency array to run only once on mount

	// Track state changes and flag for saving
	useEffect(() => {
		if (!loading && cards.length > 0) {
			setShouldSaveState(true);
		}
	}, [cards, selectedCards, formData, termsAccepted, loading]);

	// Only save state when the flag is set
	useEffect(() => {
		if (shouldSaveState) {
			saveApplicationFormState({
				cards,
				selectedCards,
				formData,
				termsAccepted
			});
			setShouldSaveState(false);
		}
	}, [shouldSaveState]);

	const validateFullForm = () => {
		return isFormValid() && termsAccepted;
	};

	const handleSubmit = async () => {
		if (!validateFullForm()) {
			setError("Please complete all required fields and accept the terms and conditions");
			return;
		}

		setIsSubmitting(true);
		setError(null);

		const beepCardDetails = getSelectedCardDetails();
		
		// Use the submission service to handle the form submission
		submissionService.submit(
			beepCardDetails,
			(quotesResponse) => {
				// Success callback
				setIsSubmitting(false);

				// Navigate to checkout with all necessary data
				navigateTo("checkout", {
					submissionData: quotesResponse,
					formData: getSelectedFormData(),
				});
			},
			(error) => {
				// Error callback
				console.error("Submission error:", error);
				setError(typeof error === "string" ? error : "An unexpected error occurred. Please try again.");
				setIsSubmitting(false);
			}
		);
	};

	return (
		<ApplicationFormLayout loading={loading} error={error}>
			{cards.length === 0 ? (
				<Alert severity="error">No beep cards found in your account. Please add a beep card to continue.</Alert>
			) : (
				<>
					{cards.map((card, index) => (
						<React.Fragment key={card.can}>
							<BeepCardForm
								card={card}
								index={index}
								isSelected={selectedCards[card.can] || false}
								formData={formData[card.can]}
								onToggleSelection={handleCardSelection}
								onInputChange={handleInputChange}
								onDateClick={handleDateChange}
							/>
							
							{cards.length > 1 && index === 0 && (
								<Typography
									variant="subtitle1"
									sx={{
										mt: 4,
										mb: 2,
										textAlign: "center",
										color: "text.secondary",
										fontWeight: "medium",
									}}
								>
									Add beep™ Protect to your other beep™ Card/s
								</Typography>
							)}
						</React.Fragment>
					))}

					<Box sx={{ mt: 4, mb: 2 }}>
						<FormControlLabel
							control={<Checkbox checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />}
							label={
								<Typography variant="body1">
									I confirm that I have read, consent and agree to beep™ Protect's terms and conditions
								</Typography>
							}
						/>
					</Box>

					{/* Read Terms and Conditions */}
					<Box sx={{ mt: 2, mb: 2, display: "flex", justifyContent: "center" }}>
						<Typography variant="body1" sx={{ color: "#2196f3", cursor: "pointer" }} onClick={() => navigateTo("terms")}>
							Read Terms and Conditions
						</Typography>
					</Box>

					<Button
						fullWidth
						variant="contained"
						disabled={!validateFullForm() || isSubmitting}
						onClick={handleSubmit}
						sx={{
							py: 1.5,
							backgroundColor: validateFullForm() ? "#2196f3" : "#9e9e9e",
							"&:hover": {
								backgroundColor: validateFullForm() ? "#2196f3" : "#9e9e9e",
							},
						}}
					>
						{isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Proceed"}
					</Button>
				</>
			)}
		</ApplicationFormLayout>
	);
};

export default ApplicationForm;
