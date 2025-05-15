import React from "react";
import Container from "@mui/material/Container";
import { useApp } from "../context/AppContext";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Banner from "../components/Banner";

const faqGeneralQuestions = [
	{
		question: "What is beep™ Protect?",
		answer: "beep™ Protect is an insurance product which provides protection to registered beep™ Card users during a covered trip while riding various public transport providers that uses beep™ Card, subject to the terms and conditions of the policy.",
	},
	{
		question: "Which insurer underwrites beep™ Protect?",
		answer: "beep™ Protect is underwritten by AIG Philippines Insurance, Inc. (AIG Philippines) with Stere Philippines Insurance Agency Inc. as the general agent. AIG Philippines is a company duly licensed by the Insurance Commission is located at 30th Floor AIA Tower 8767 Paseo de Roxas 1226 Makati City with Registration No. 2025/26-R.",
	},
	{
		question: "Who is qualified to apply for beep™ Protect?",
		answer: "All registered beep™ app users may register up to five (5) beep™ Cards under beep™ Protect. Each beep™ Card must be assigned to one individual/customer per card. Each person must have only one active beep™ Protect. beep™ Protect is a one-time monthly recurring registration. Only the beep™ app user can register the beep™ Card for beep™ Protect and will be responsible in providing the information of each beep™ Card user. Any incorrect and/or information that don't match with the details in the ID provided may lead to the rejection of a claim. It is important that the registered beep™ app user possesses the authority from the beep™ Card user to provide their personal information for purposes of purchasing beep™ Protect.",
	},
	{
		question: "What benefits does beep™ Protect provide?",
		answer: (
			<>
				<Typography paragraph>beep™ Protect provides the following benefits:</Typography>
				<Table border={1} sx={{ mb: 2 }}>
					<TableHead>
						<TableRow sx={{ backgroundColor: "#151F6D" }}>
							<TableCell
								sx={{
									fontWeight: "bold",
									border: 1,
									borderColor: "divider",
									color: "white",
								}}
							>
								Benefits Section
							</TableCell>
							<TableCell
								colSpan={2}
								sx={{
									fontWeight: "bold",
									border: 1,
									borderColor: "divider",
									color: "white",
								}}
							>
								Maximum Benefit Amount
							</TableCell>
						</TableRow>
						<TableRow sx={{ backgroundColor: "#151F6D" }}>
							<TableCell></TableCell>
							<TableCell sx={{ fontWeight: "bold", border: 1, borderColor: "divider", color: "white" }}>Age 18-75 years old</TableCell>
							<TableCell sx={{ fontWeight: "bold", border: 1, borderColor: "divider", color: "white" }}>Age &gt;75 years old</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell>Bag Protect (due to theft and robbery)*</TableCell>
							<TableCell>Up to PHP 3,000.00 worth of credit to the beep™ Card account</TableCell>
							<TableCell>Up to PHP 3,000.00 worth of credit to the beep™ Card account</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Accidental Death</TableCell>
							<TableCell>PHP 200,000.00</TableCell>
							<TableCell>PHP 100,000.00</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Permanent Total Disablement</TableCell>
							<TableCell>PHP 200,000.00</TableCell>
							<TableCell>PHP 100,000.00</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Permanent Partial Disablement</TableCell>
							<TableCell>PHP 200,000.00</TableCell>
							<TableCell>PHP 100,000.00</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Unprovoked Murder or Assault</TableCell>
							<TableCell>PHP 200,000.00</TableCell>
							<TableCell>PHP 100,000.00</TableCell>
						</TableRow>
					</TableBody>
				</Table>
				<Typography paragraph>*For Bag Protect, there is a limit of 1 claim per cover ( i.e. 1 claim every 30 days from the start of Period of Insurance)</Typography>
				<Typography paragraph>The registered beep™ Card user will receive the benefits under beep™ Protect.</Typography>
			</>
		),
	},
	{
		question: "When will my cover start after I register for beep™ Protect?",
		answer: "Once the premium is successfully collected from the beep™ wallet, you are immediately covered under beep™ Protect. beep™ Protect shall be effective for thirty (30) consecutive days from the date of the successful premium collection and expires on the midnight of the 30th day.",
	},
	{
		question: "What if I decide to discontinue my registration under beep™ Protect?",
		answer: "If the beep™ app user decides not to continue paying the premium, the beep™ Protect protection will expire on midnight of the 30th day of the cover.\nIf the beep™ app user pays the premium for any or all of the beep™ Cards he registered under beep™ Protect, then the cover will renew immediately after the premium is successfully collected.",
	},
	{
		question: "When does coverage under beep™ Protect commences?",
		answer: "beep™ Protect cover commences when the Insured Person taps in their beep™ Card upon boarding a Public Transport and continues while travelling in the Public Transport and ceases when they taps out to alight from the same Public Transport.",
	},
	{
		question: "What is the definition of Public Transport?",
		answer: "Public Transport refers to the Metro Manila's three elevated railways, ie. LRT1, LRT2, and MRT3, select city or Point-to-Point (P2P) buses and public utility vehicles (PUV) in the Philippines operating under a valid license for the transportation of fare-paying passengers which operate under a fixed, established and regular schedules and routes and are available to the fare paying public using a beep™ Card.",
	},
	{
		question: "How do I know I am covered under beep™ Protect?",
		answer: "Upon successful premium payment of PHP 25.00, you will receive a Confirmation of Cover in your beep™ Protect dashboard in the beep™ app or in your registered email.",
	},
	{
		question: "What is the difference between Cover Effective/Expiry Date and Period of Insurance as stated in the Confirmation of Cover?",
		answer: "Cover Effective/Expiry Date is the effective and expiry date of the Group policy where beep™ is the policy holder and you, as beep™ Card registered user, is the individual insured.\nPeriod of Insurance is the period you are protected under beep™ Protect which is 30 consecutive days, provided you successfully pay the monthly premium.",
	},
	{
		question: "Will my friend or relative who uses my registered beep™ Card will also be protected?",
		answer: "beep™ Protect is non-transferrable and is exclusive to the registered beep™ Card user.",
	},
	{
		question: "Who do I contact if I have questions?",
		answer: "For queries related to beep™ app or beep™ account or beep™ Cards, you may contact beep™ customer service at Landline: (02) 8 737 9600, Globe line: 0917-512-1319, Smart line: 0998-581-9675.\nFor queries related to beep™ Protect, you may contact AIG Philippines customer service at +632 8878 5400 or email to callcenter.phl@aig.com. AIG customer service business hours is from Monday – Friday, 8:00 AM – 5:00 PM.",
	},
];

const faqRegistrationQuestions = [
	{
		question: "Is there a minimum and maximum age requirement to purchase beep™ Protect?",
		answer: "Anyone who is at least 18 years of age can purchase beep™ Protect. There is no maximum age to be eligible to purchase beep™ Protect but anyone who is above 75 years old shall be entitled to 50% of the benefits provided for Accidental Death, Disablement and Murder or Assault cover.",
	},
	{
		question: "Who are eligible to purchase beep™ Protect?",
		answer: (
			<>
				<Typography paragraph>The following are eligible to purchase beep™ Protect:</Typography>
				<ul>
					<li>At least 18 years of age;</li>
					<li>A legal resident of the Philippines;</li>
					<li>A registered beep™ app user.</li>
				</ul>
			</>
		),
	},
	{
		question: "How much does beep™ Protect cost?",
		answer: "Premium for beep™ Protect is PHP 25.00 for 30 consecutive days of protection per beep™ Card.",
	},
	{
		question: "How do I pay the premium?",
		answer: "beep™ Protect premium can be paid thru your beep™ wallet. If you are not a beep™ wallet user, you need to register for beep™ wallet before you can pay the premium and activate the beep™ Protect coverage.",
	},
	{
		question: "Can I register for two or more beep™ Protect?",
		answer: "No, because each person is entitled to one beep™ Protect only.",
	},
];

const faqFreeLookQuestions = [
	{
		question: "Is there a free look period?",
		answer: "There is no free look period for beep™ Protect. Once the premium is paid, you are immediately covered under beep™ Protect.",
	},
];

const faqUnregisterQuestions = [
	{
		question: "Can I unregister from beep™ Protect?",
		answer: 'Yes, you can unregister from beep™ Protect anytime thru beep™ app by clicking "Unregister beep™ Protect" radio button in beep™ Protect dashboard.',
	},
	{
		question: "Will I receive a refund if I unregister from beep™ Protect?",
		answer: "No, because once the premium is successfully collected, you become automatically covered under beep™ Protect. Unregister will become effective only after the existing thirty (30) days of cover expires.",
	},
];

const faqClaimsQuestions = [
	{
		question: "What documents do I need to file a claim?",
		answer: (
			<>
				<Typography paragraph>Below are the list of documents required when submitting your claim:</Typography>
				<Table border={1} sx={{ mb: 2 }}>
					<TableHead>
						<TableRow sx={{ backgroundColor: "#151F6D" }}>
							<TableCell sx={{ fontWeight: "bold", border: 1, borderColor: "divider", color: "white" }}>Accidental Death, Permanent Disablement or Unprovoked Murder or Assault claim</TableCell>
							<TableCell sx={{ fontWeight: "bold", border: 1, borderColor: "divider", color: "white" }}>Bag Protect claim</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell colSpan={2}>
								1. Government issued ID
								<br />
								2. Confirmation of Cover of your current active insurance coverage
								<br />
								3. Incident report from competent authority, ie. Police report
								<br />
								4. Screenshot of your beep™ Card transaction summary
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								5. NSO Certified of Birth Certificate and Certified True Copy of Death Certificate of the Insured beep™ Protect user.
								<br />
								6. NSO Certified Marriage Certificate (if married) or NSO Certified CENOMAR (if single)
								<br />
								7. Proof of Relationship to Beneficiary.
								<br />
								8. Attending Physician's Report.
								<br />
								9. Autopsy Report of Medico-Legal
							</TableCell>
							<TableCell>
								5. Receipt of government ID replacement fee (if with claim)
								<br />
								6. Official police report of the theft or robbery with detailed list of items lost and year/date of purchase
								<br />
								7. All other relevant documents we may ask you to provide
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</>
		),
	},
	{
		question: "How do I file a claim",
		answer: "You can submit your claim along with the required documents through the claims portal found in the beep™ app.",
	},
	{
		question: "How will I receive claims payments?",
		answer: (
			<>
				<ul>
					<li>
						For Bap protect, AIG will process the claim within 10 working days after AIG receives a complete claim submission. AIG will pay the claim to beep™
						which beep™ will credited back to the registered beep™ Card account.
					</li>
					<li>
						For Accidental Death / Disablement, AIG will process the claim within 30 working days after AIG receive a complete claim submission. AIG will pay the
						claim to the bank account of the legal beneficiary of the deceased.
					</li>
				</ul>
			</>
		),
	},
	{
		question: "Who do I contact if I have additional questions?",
		answer: "For queries related to your claim, you may contact AIG customer service at +632 8878 5400 or email to AIGConsumerClaimsPH@aig.com or the Insurance Commission at www. Insurance.gov.ph. AIG claims service business hours is from Monday – Friday, 8:00 AM – 5:00 PM.",
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

				{/* GENERAL QUESTIONS Section */}
				<Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: "bold" }}>
					GENERAL QUESTIONS
				</Typography>
				<Box sx={{ mb: 4 }}>
					{faqGeneralQuestions.map((item, index) => (
						<Accordion key={index} sx={{ mb: 2 }}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel-general-${index}-content`} id={`panel-general-${index}-header`}>
								<Typography fontWeight="medium">{item.question}</Typography>
							</AccordionSummary>
							<AccordionDetails>{typeof item.answer === "string" ? <Typography>{item.answer}</Typography> : item.answer}</AccordionDetails>
						</Accordion>
					))}
				</Box>

				{/* PURCHASE, REGISTRATION & ELIGIBILITY Section */}
				<Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: "bold" }}>
					PURCHASE, REGISTRATION & ELIGIBILITY
				</Typography>
				<Box sx={{ mb: 4 }}>
					{faqRegistrationQuestions.map((item, index) => (
						<Accordion key={index} sx={{ mb: 2 }}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel-registration-${index}-content`} id={`panel-registration-${index}-header`}>
								<Typography fontWeight="medium">{item.question}</Typography>
							</AccordionSummary>
							<AccordionDetails>{typeof item.answer === "string" ? <Typography>{item.answer}</Typography> : item.answer}</AccordionDetails>
						</Accordion>
					))}
				</Box>

				{/* FREE LOOK Section */}
				<Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: "bold" }}>
					FREE LOOK
				</Typography>
				<Box sx={{ mb: 4 }}>
					{faqFreeLookQuestions.map((item, index) => (
						<Accordion key={index} sx={{ mb: 2 }}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel-freelook-${index}-content`} id={`panel-freelook-${index}-header`}>
								<Typography fontWeight="medium">{item.question}</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>{item.answer}</Typography>
							</AccordionDetails>
						</Accordion>
					))}
				</Box>

				{/* UNREGISTER Section */}
				<Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: "bold" }}>
					UNREGISTER FROM beep™ Protect
				</Typography>
				<Box sx={{ mb: 4 }}>
					{faqUnregisterQuestions.map((item, index) => (
						<Accordion key={index} sx={{ mb: 2 }}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel-unregister-${index}-content`} id={`panel-unregister-${index}-header`}>
								<Typography fontWeight="medium">{item.question}</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>{item.answer}</Typography>
							</AccordionDetails>
						</Accordion>
					))}
				</Box>

				{/* CLAIMS Section */}
				<Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: "bold" }}>
					CLAIMS
				</Typography>
				<Box sx={{ mb: 4 }}>
					{faqClaimsQuestions.map((item, index) => (
						<Accordion key={index} sx={{ mb: 2 }}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel-claims-${index}-content`} id={`panel-claims-${index}-header`}>
								<Typography fontWeight="medium">{item.question}</Typography>
							</AccordionSummary>
							<AccordionDetails>{typeof item.answer === "string" ? <Typography>{item.answer}</Typography> : item.answer}</AccordionDetails>
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
