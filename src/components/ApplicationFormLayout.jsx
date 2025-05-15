import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Banner from "./Banner";

const ApplicationFormLayout = ({ 
  children, 
  loading, 
  error 
}) => {
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Banner />

      <Container maxWidth="sm" sx={{ pb: 6 }}>
        <Box sx={{ py: 2 }}>
          <Typography variant="h5" component="h1" gutterBottom align="center" sx={{ color: "#f39c12" }}>
            Register to beep™ Protect
          </Typography>

          <Box sx={{ my: 2 }}>
            <Typography variant="body1" align="center">
              Only 1 time enrollment needed.
            </Typography>
            <Typography variant="body1" align="center">
              Be protected from your daily commute for only PHP 25.00 for 30 days per beep™ Card.
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ my: 2 }}>
              {error}
            </Alert>
          )}

          {children}
        </Box>
      </Container>
    </>
  );
};

export default ApplicationFormLayout; 