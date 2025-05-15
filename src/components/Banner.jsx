import React from "react";
import { Box, Container } from "@mui/material";
import bannerImage from "../assets/images/banner.png";

const Banner = () => {
	return (
		<Container maxWidth="sm" sx={{ p: 0 }}>
			<Box sx={{ width: "100%", height: "auto", mb: 2 }}>
				<img src={bannerImage} alt="Beep Protect" style={{ width: "100%", height: "auto" }} />
			</Box>
		</Container>
	);
};

export default Banner;
