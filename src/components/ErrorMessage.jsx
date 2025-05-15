import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

const ErrorMessage = ({ 
  message = "An error occurred. Please try again.", 
  onRetry = null 
}) => {
  return (
    <Box sx={{ 
      display: "flex", 
      flexDirection: "column",
      justifyContent: "center", 
      alignItems: "center", 
      py: 4
    }}>
      <Alert severity="error" sx={{ mb: 2, width: "100%" }}>
        {message}
      </Alert>
      
      {onRetry && (
        <Button 
          variant="contained" 
          onClick={onRetry}
          sx={{ mt: 2 }}
        >
          Retry
        </Button>
      )}
    </Box>
  );
};

export default ErrorMessage; 