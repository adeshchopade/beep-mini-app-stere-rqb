import React, { createContext, useState, useContext, useEffect, useCallback, useRef } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ENV from "../utils/env";
import MiniApp, { beep } from "../utils/beepSDK";

const BeepDemo = () => {
	const [user, setUser] = useState(null);
	const [cards, setCards] = useState(null);

	// Setup the UI once when the app is ready
	// The flags in BeepContext will prevent multiple calls
	useEffect(() => {
		// Fetch user data
		fetchUser();
	}, [fetchUser]);

	const handleGetCards = () => {
		fetchCards();
	};

	// Method to fetch user data
	const fetchUser = useCallback(() => {
		console.log("BeepContext: Fetching user data");

		if (typeof window.flutter_inappwebview === "undefined") {
			console.log("BeepContext: Using mock user data for browser testing");
			// Mock data for browser testing
			setUser({
				id: 1403,
				firstName: "Test",
				lastName: null,
				phoneNumber: null,
				email: "user@test.com",
			});
			return;
		}

		try {
			console.log("BeepContext: Calling flutter_inappwebview.callHandler('getUser')");
			beep.getUser({
				onSuccess: (userData) => {
					setUser(userData);
					console.log("BeepContext: User data fetched successfully:", userData);
				},
				onFail: (error) => {
					console.error("BeepContext: Failed to fetch user:", error);
				},
			});
		} catch (error) {
			console.error("BeepContext: Exception when calling getUser:", error);
		}
	}, []);

	// Method to fetch cards data
	const fetchCards = useCallback(() => {
		console.log("BeepContext: Fetching cards data");

		if (typeof window.flutter_inappwebview === "undefined") {
			console.log("BeepContext: Using mock cards data for browser testing");
			// Mock data for browser testing
			setCards({
				cards: [
					{
						can: "6378059900462120",
						expiry: "2024-12-31 00:00:00.000Z",
						status: "ACTIVE",
						balance: 6197.49,
					},
				],
			});
			return;
		}

		try {
			console.log("BeepContext: Calling flutter_inappwebview.callHandler('getCards')");
			beep.getCards({
				onSuccess: (cardsData) => {
					setCards(cardsData);
					console.log("BeepContext: Cards data fetched successfully:", cardsData);
				},
				onFail: (error) => {
					console.error("BeepContext: Failed to fetch cards:", error);
				},
			});
		} catch (error) {
			console.error("BeepContext: Exception when calling getCards:", error);
		}
	}, []);

	return (
		<Card elevation={0}>
			<CardContent>
				<Card variant="outlined" sx={{ mb: 2, bgcolor: "grey.50" }}>
					<CardContent>
						<Typography variant="body2" component="div" sx={{ fontFamily: "monospace", fontSize: "0.75rem" }}>
							<Box component="p">BEEP API URL: {ENV.BEEP_API_URL}</Box>
							<Box component="p">Debug Mode: {String(ENV.DEBUG_MODE)}</Box>
							<Box component="p">REACT_APP_ENVIRONMENT: {ENV.ENVIRONMENT}</Box>
						</Typography>
					</CardContent>
				</Card>

				{user && (
					<Card variant="outlined" sx={{ mb: 2, bgcolor: "grey.50" }}>
						<CardContent>
							<Typography variant="subtitle2" sx={{ mb: 1 }}>
								User Information
							</Typography>
							<Typography variant="body2">ID: {user.id}</Typography>
							<Typography variant="body2">
								Name: {user.firstName} {user.lastName}
							</Typography>
							<Typography variant="body2">Email: {user.email}</Typography>
						</CardContent>
					</Card>
				)}

				{cards && (
					<Card variant="outlined" sx={{ mb: 2, bgcolor: "grey.50" }}>
						<CardContent>
							<Typography variant="subtitle2" sx={{ mb: 1 }}>
								Cards
							</Typography>
							<Stack spacing={1}>
								{cards.cards.map((card, index) => (
									<Card key={index} variant="outlined">
										<CardContent sx={{ py: 1, "&:last-child": { pb: 1 } }}>
											<Typography variant="body2">Card: {card.can}</Typography>
											<Typography variant="body2">Expiry: {new Date(card.expiry).toLocaleDateString()}</Typography>
											<Typography variant="body2">Status: {card.status}</Typography>
											<Typography variant="body2">Balance: ₱{card.balance.toFixed(2)}</Typography>
										</CardContent>
									</Card>
								))}
							</Stack>
						</CardContent>
					</Card>
				)}

				<Stack spacing={1} direction="column">
					<Button
						onClick={() => {
							console.log("Button clicked: Get Cards");
							handleGetCards();
						}}
						variant="contained"
						color="primary"
						fullWidth
						sx={{ m: 1 }}
					>
						Get Cards
					</Button>
				</Stack>
			</CardContent>
		</Card>
	);
};

export default BeepDemo;
