import React from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import CardDetails from "./CardDetails";
import PricingDetails from "./PricingDetails";

const CheckoutForm = ({
  beepCards,
  premium,
  totalAmount,
  basePremium,
  taxes,
  isProcessing,
  onChangeCard,
  onContinuePayment
}) => {
  return (
    <>
      <CardDetails 
        beepCards={beepCards} 
        totalAmount={totalAmount} 
        onChangeCard={onChangeCard} 
      />
      
      <PricingDetails 
        basePremium={basePremium}
        taxes={taxes}
        totalAmount={totalAmount}
      />

      <Button
        fullWidth
        variant="contained"
        onClick={onContinuePayment}
        disabled={isProcessing}
        sx={{
          py: 1.5,
          backgroundColor: "#1E2562",
          borderRadius: 1,
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#161c4d",
          },
        }}
      >
        {isProcessing ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Continue to Payment"
        )}
      </Button>
    </>
  );
};

export default CheckoutForm;