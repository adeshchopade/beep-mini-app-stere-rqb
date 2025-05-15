import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

const CardDetails = ({ 
  beepCards, 
  totalAmount, 
  onChangeCard 
}) => {
  return (
    <Box sx={{ bgcolor: "white", pt: 2, pb: 1, px: 2, mb: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
        <Typography variant="body1" sx={{ color: "#666", fontWeight: "medium" }}>Details</Typography>
        <Link 
          component="button" 
          variant="body2" 
          onClick={onChangeCard}
          sx={{ color: "#5D71E1", textDecoration: "none" }}
        >
          change card
        </Link>
      </Box>
      
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
        <Typography variant="body2" sx={{ color: "#888" }}>Card Number/s</Typography>
        <Box sx={{ textAlign: "right" }}>
          {beepCards.map((card, index) => (
            <Typography key={index} variant="body2" sx={{ color: "#333" }}>
              {`${String(card.beep_card_number).substring(0, 6)} ${String(card.beep_card_number).substring(6)}`}
            </Typography>
          ))}
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
        <Typography variant="body2" sx={{ color: "#888" }}>beep™ Protect</Typography>
        <Typography variant="body2" sx={{ color: "#333" }}>{totalAmount}</Typography>
      </Box>

      <Box 
        sx={{ 
          bgcolor: "#EFF1F9", 
          p: 2, 
          borderRadius: 1,
          my: 3,
          textAlign: "center"
        }}
      >
        <Typography variant="body2" sx={{ color: "#333C80", fontWeight: "medium" }}>
          Let's make your daily commute safer and more secure with beep™ Protect!
        </Typography>
      </Box>
    </Box>
  );
};

export default CardDetails;