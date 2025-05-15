import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { beepSDK } from "../utils/beepSDKWrapper";

const BeepCard = ({ 
  card, 
  isExpanded, 
  onToggleExpand 
}) => {
  const handleViewCOC = (downloadUrl) => {
    if (!downloadUrl) {
      console.error("No download URL available");
      return;
    }

    // Open the PDF in a new window/tab
    window.open(downloadUrl, "_blank");
  };

  return (
    <Paper
      elevation={0}
      sx={{
        mb: 2,
        border: "1px solid #eee",
        borderRadius: 1,
        overflow: "hidden",
      }}
    >
      {/* Card Header - Always visible */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={onToggleExpand}
      >
        <Box>
          <Typography variant="body2" color="text.secondary">
            beep™ Card #:
          </Typography>
          <Typography variant="body1" component="div">
            {card.cardNumber}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Insured Name:
          </Typography>
          <Typography variant="body1" component="div">
            {card.insuredName}
          </Typography>
        </Box>
        {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Box>

      {/* Expandable Content */}
      {isExpanded && (
        <Box sx={{ px: 2, pb: 2 }}>
          <Divider sx={{ mb: 2 }} />

          {card.cocs.length > 0 && card.cocs[0].downloadUrl && (
            <Button
              variant="text"
              sx={{
                mb: 2,
                textDecoration: "underline",
                color: "primary.main",
                p: 0,
              }}
              onClick={() => handleViewCOC(card.cocs[0].downloadUrl)}
            >
              View Confirmation of Cover
            </Button>
          )}

          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", mb: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  minWidth: "120px",
                  color: "text.secondary",
                }}
              >
                COC Number
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  minWidth: "200px",
                  color: "text.secondary",
                }}
              >
                Period of Insurance
              </Typography>
            </Box>

            {card.cocs.map((coc, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  mb: 0.5,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    minWidth: "120px",
                  }}
                >
                  {coc.cocNumber}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    minWidth: "200px",
                  }}
                >
                  {coc.periodOfInsurance}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" sx={{ mr: 2 }}>
              Unregister beep™ Protect
            </Typography>
            <Box
              sx={{
                width: 36,
                height: 20,
                bgcolor: "#e0e0e0",
                borderRadius: 10,
                position: "relative",
                cursor: "pointer",
              }}
            >
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  bgcolor: "white",
                  borderRadius: "50%",
                  position: "absolute",
                  top: "2px",
                  left: "2px",
                  transition: "all 0.2s ease",
                }}
              />
            </Box>
            <Box sx={{ flex: 1 }} />
            <Button
              variant="outlined"
              sx={{
                borderRadius: 20,
                px: 3,
              }}
            >
              FILE A CLAIM
            </Button>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default BeepCard; 