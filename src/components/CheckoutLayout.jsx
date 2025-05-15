import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const CheckoutLayout = ({ 
  children, 
  loading, 
  error,
  title = "Preview details",
  subtitle = "Review your detail before proceeding to buy a beep™ Protect."
}) => {
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ pb: 6 }}>
      <Box sx={{ pt: 3, pb: 2 }}>
        <Typography 
          variant="body1" 
          component="h1" 
          sx={{ 
            mb: 1, 
            fontWeight: "medium", 
            color: "#333",
            fontSize: "1.1rem"
          }}
        >
          {title}
        </Typography>
        
        <Typography 
          variant="body2" 
          sx={{ 
            color: "#666",
            mb: 3,
            fontSize: "0.9rem"
          }}
        >
          {subtitle}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {children}
      </Box>
    </Container>
  );
};

export default CheckoutLayout;