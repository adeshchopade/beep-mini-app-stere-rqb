import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const PricingDetails = ({
  basePremium,
  taxes,
  totalAmount
}) => {
  return (
    <Box sx={{ bgcolor: "white", pt: 2, pb: 1, px: 2, mb: 3 }}>
      <Typography variant="body1" sx={{ color: "#666", fontWeight: "medium", mb: 1 }}>Other details</Typography>
      
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
        <Typography variant="body2" sx={{ color: "#888" }}>Base Premium</Typography>
        <Typography variant="body2" sx={{ color: "#333" }}>{basePremium}</Typography>
      </Box>
      
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
        <Typography variant="body2" sx={{ color: "#888" }}>Taxes</Typography>
        <Typography variant="body2" sx={{ color: "#333" }}>{taxes}</Typography>
      </Box>
      
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
        <Typography variant="body2" sx={{ color: "#888" }}>Total Amount</Typography>
        <Typography variant="body2" sx={{ color: "#333" }}>{totalAmount}</Typography>
      </Box>
    </Box>
  );
};

export default PricingDetails;