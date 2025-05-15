import React from "react";
import { Container, Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button } from "@mui/material";
import { useApp } from "../context/AppContext";
import logo from "../assets/images/beep-protect.png";

const Terms = () => {
    const { navigateTo } = useApp();
    
    const handleGoBack = () => {
        // Use navigateTo to go back to application form
        // No need to pass state as it's already stored in context
        navigateTo("application-form");
    };
    
	return (
		<Container maxWidth="md" sx={{ py: 4 }}>
			<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 4 }}>
				<img src={logo} alt="logo" style={{ width: "100px", height: "100px", borderRadius: "12px" }} />
			</Box>

			<Typography variant="h4" component="h1" gutterBottom>
				Terms and Conditions
			</Typography>

			<Box mb={3}>
				<Typography paragraph>1. The beep™ Protect insurance cover consists of two (2) protections, as follows:</Typography>

				<Box ml={2} mb={2}>
					<Typography paragraph>
						<strong>A. Bag Protect</strong>
						<br />
						If the Insured Person is a victim of a robbery or theft, you will be reimbursed up to PHP 3,000 worth of credit to the beepTM Card account for your
						stolen or damaged bag or bag contents, subject to the terms and conditions of the policy.
					</Typography>

					<Typography paragraph>
						<strong>B. Personal Accident Insurance</strong>
						<br />
						In case an Insured Person you suffer from an accident which results in death or permanent disability including murder and assault, you will be paid
						with the following benefit, subject to the terms and conditions of the policy:
					</Typography>

					<Paper sx={{ width: "100%", overflow: "hidden", mb: 3 }}>
						<Table sx={{ border: 1, borderColor: "divider" }}>
							<TableHead>
								<TableRow sx={{ backgroundColor: "#151F6D" }}>
									<TableCell
										rowSpan={2}
										sx={{
											fontWeight: "bold",
											border: 1,
											borderColor: "divider",
											color: "white",
										}}
									>
										Personal Accident Benefits
									</TableCell>
									<TableCell
										align="center"
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
									<TableCell
										align="center"
										sx={{
											fontWeight: "bold",
											border: 1,
											borderColor: "divider",
											color: "white",
										}}
									>
										Age 18-75 years old
									</TableCell>
									<TableCell
										align="center"
										sx={{
											fontWeight: "bold",
											border: 1,
											borderColor: "divider",
											color: "white",
										}}
									>
										Age &gt;75 years old
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow>
									<TableCell sx={{ border: 1, borderColor: "divider" }}>Accidental Death</TableCell>
									<TableCell align="center" sx={{ border: 1, borderColor: "divider" }}>
										PHP 200,000
									</TableCell>
									<TableCell align="center" sx={{ border: 1, borderColor: "divider" }}>
										PHP 100,000
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell sx={{ border: 1, borderColor: "divider" }}>Permanent Total Disablement</TableCell>
									<TableCell align="center" sx={{ border: 1, borderColor: "divider" }}>
										PHP 200,000
									</TableCell>
									<TableCell align="center" sx={{ border: 1, borderColor: "divider" }}>
										PHP 100,000
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell sx={{ border: 1, borderColor: "divider" }}>Permanent Partial Disablement</TableCell>
									<TableCell align="center" sx={{ border: 1, borderColor: "divider" }}>
										PHP 200,000
									</TableCell>
									<TableCell align="center" sx={{ border: 1, borderColor: "divider" }}>
										PHP 100,000
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell sx={{ border: 1, borderColor: "divider" }}>Unprovoked Murder or Assault</TableCell>
									<TableCell align="center" sx={{ border: 1, borderColor: "divider" }}>
										PHP 200,000
									</TableCell>
									<TableCell align="center" sx={{ border: 1, borderColor: "divider" }}>
										PHP 100,000
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</Paper>
				</Box>

				<Typography paragraph>
					2. beep™ Protect commences when the Insured Person taps in their beep™ Card upon boarding a Public Transport, and continues until the Insured Person taps
					out to alights from the same Public Transport. Public Transport means Metro Manila's three (3) elevated railways, ie. LRT1, LRT2, and MRT3, select city or
					Point-to-Point (P2P) buses and public utility vehicles (PUV) in the Philippines operating under a valid license for the transportation of fare-paying
					passengers using beepTM Card that has a fixed, established and regular schedules and routes and are available to the fare paying public using a beep™ Card.
				</Typography>

				<Typography paragraph>
					3. You need to be a registered beep™ app user before you can register and avail of beep™ Protect. A beep™ app user can register up to five (5) beep™ Cards
					that must be assigned to one individual/customer per card. Each person must have only one active beepTM Protect. Only the beep™ app user can register the
					beep™ Card for beep™ Protect and will be responsible in providing the information of each beepTM Card user. Any incorrect and/or information that don't
					match with the details in the ID provided may lead to the rejection of a claim.
				</Typography>

				<Typography paragraph>
					4. The beep™ app user may unregister any beep™ Card from beep™ Protect by clicking "Unregister beep™ Protect" radio button located in the beep™ Protect
					dashboard. Once unregistered, existing beepTM Protect coverage will expires on midnight of the 30th day of the existing cover.
				</Typography>

				<Typography paragraph>
					5. Upon successful registration to beep™ Protect, you will have to pay premium PHP 25.00 for each registered beepTM Card thru your beepTM wallet. Please
					make sure you have sufficient balance in your beepTM wallet to purchase beepTM protect. Once the premium is successfully collected, the registered beep™
					Card user will be covered for thirty (30) consecutive days from the date of the premium is successfully deducted from the beepTM wallet. A Confirmation of
					Cover will be issued for each beepTM Card user who successfully availed of beepTM Protect. beep™ Protect is non-transferrable and is exclusive to the
					registered beepTM Card user.
				</Typography>

				<Typography paragraph>
					6. Prior to the end of every thirty (30) day period, there will be a reminder to the beep™ app user thru pop up in the beep™ app or email to renew beep™
					Protect for each beepTM Card. There will be a monthly reminder to renew beepTM Protect for each beepTM Card unless the registered beepTM app user cancel
					beepTM Protect cover. beepTM Protect is renewed upon successful payment of premium from the beepTM wallet.
				</Typography>

				<Typography paragraph>
					7. By purchasing beep™ Protect you agree and consent to AIG Philippines, it's affiliates, if any, and their third-party service providers to collect, use,
					process, and disclose your personal data and further attest and warrant that the agreement and consent has also been secured from the other individuals
					nominated with regard to their personal data, for the purposes described in the AIG Philippines Privacy Policy.
				</Typography>
			</Box>
			{/* go back button */}
			<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 4 }}>
				<Button variant="contained" color="primary" onClick={handleGoBack}>
					Go Back
				</Button>
			</Box>
		</Container>
	);
};

export default Terms;
