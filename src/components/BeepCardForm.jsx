import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";

const BeepCardForm = ({ 
  card, 
  index, 
  isSelected, 
  formData, 
  onToggleSelection, 
  onInputChange, 
  onDateClick 
}) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        mb: 3,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <FormControlLabel
          control={<Checkbox checked={isSelected} onChange={() => onToggleSelection(card.can)} />}
          label={<Typography sx={{ fontWeight: "bold" }}>{card.can}</Typography>}
        />
        {index === 0 && (
          <Box sx={{ ml: "auto" }}>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              —
            </Typography>
          </Box>
        )}
        {index > 0 && (
          <Box sx={{ ml: "auto" }}>
            <Typography variant="body1" sx={{ color: "#2196f3", cursor: "pointer" }} onClick={() => onToggleSelection(card.can)}>
              +
            </Typography>
          </Box>
        )}
      </Box>

      {isSelected && (
        <Box>
          <Divider sx={{ mt: 2, mb: 3 }} />

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item size={4}>
              <Typography variant="body1" sx={{ lineHeight: "40px" }}>
                First Name
              </Typography>
            </Grid>
            <Grid item size={8}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                value={formData?.applicant_first_name || ""}
                onChange={(e) => onInputChange(card.can, "applicant_first_name", e.target.value)}
                placeholder="First Name"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item size={4}>
              <Typography variant="body1" sx={{ lineHeight: "40px" }}>
                Last Name
              </Typography>
            </Grid>
            <Grid item size={8}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                value={formData?.applicant_last_name || ""}
                onChange={(e) => onInputChange(card.can, "applicant_last_name", e.target.value)}
                placeholder="Last Name"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item size={4}>
              <Typography variant="body1" sx={{ lineHeight: "40px" }}>
                Phone #
              </Typography>
            </Grid>
            <Grid item size={8}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                value={formData?.applicant_mobile || ""}
                onChange={(e) => onInputChange(card.can, "applicant_mobile", e.target.value)}
                placeholder="Phone Number"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item size={4}>
              <Typography variant="body1" sx={{ lineHeight: "40px" }}>
                Email
              </Typography>
            </Grid>
            <Grid item size={8}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                type="email"
                value={formData?.applicant_email_address || ""}
                onChange={(e) => onInputChange(card.can, "applicant_email_address", e.target.value)}
                placeholder="user@example.com"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item size={4}>
              <Typography variant="body1" sx={{ lineHeight: "40px" }}>
                Birthday
              </Typography>
            </Grid>
            <Grid item size={8}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                value={formData?.applicant_dob || ""}
                placeholder="dd/mm/yyyy"
                onClick={() => onDateClick(card.can)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Box component="span" sx={{ cursor: "pointer" }}>
                        📅
                      </Box>
                    </InputAdornment>
                  ),
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>

          <Typography variant="caption" sx={{ display: "block", mt: 2, color: "text.secondary" }}>
            Please ensure name and date of birth are exactly the same as what is written in the ID. Unmatched information could cause
            rejection in claim.
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default BeepCardForm; 