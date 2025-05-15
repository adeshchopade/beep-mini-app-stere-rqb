import React from "react";
import Container from "@mui/material/Container";
import { useApp } from "../context/AppContext";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Banner from "../components/Banner";

const faqItems = [
	{
		question: "What is beep™ Protect?",
		answer: "beep™ Protect is a comprehensive insurance service that offers coverage for your beep card against loss, theft, or damage. It ensures that your card balance is secure and can be recovered in case of any unfortunate events.",
	},
	{
		question: "How do I file a claim?",
		answer: "You can file a claim directly from the dashboard by selecting your card and clicking on the 'FILE A CLAIM' button. You'll be guided through the process of submitting necessary information and documentation required for your claim.",
	},
	{
		question: "What is a COC Number?",
		answer: "COC stands for Certificate of Coverage. The COC Number is a unique identifier for your insurance coverage period. It is used to verify your insurance status and is required when filing claims.",
	},
	{
		question: "Can I add multiple cards to beep™ Protect?",
		answer: "Yes, you can add multiple beep™ cards to the Protect service. Each card will have its own coverage and can be managed separately within the dashboard.",
	},
	{
		question: "How do I unregister a card from beep™ Protect?",
		answer: "To unregister a card, simply expand the card details on the dashboard and toggle the 'Unregister beep™ Protect' switch. You will receive a confirmation prompt before the card is unregistered from the service.",
	},
];

const FAQ = () => {
	const { navigateTo } = useApp();

	const handleBackClick = () => {
		navigateTo("dashboard");
	};

	return (
		<>
			<Banner />

			<Container sx={{ pb: 4 }}>
				{/* Page Title */}
				<Typography
					variant="h5"
					component="h1"
					sx={{
						mb: 4,
						fontWeight: "bold",
						textAlign: "center",
					}}
				>
					Frequently Asked Questions
				</Typography>

				{/* FAQ Accordions */}
				<Box sx={{ mb: 4 }}>
					{faqItems.map((item, index) => (
						<Accordion key={index} sx={{ mb: 2 }}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index}-content`} id={`panel${index}-header`}>
								<Typography fontWeight="medium">{item.question}</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>{item.answer}</Typography>
							</AccordionDetails>
						</Accordion>
					))}
				</Box>

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
						Back to Dashboard
					</Button>
				</Box>
			</Container>
		</>
	);
};

export default FAQ;
