import React from "react";
import { Box, Typography } from "@mui/material";

const getDisplayFieldName = (fieldName) => {
  let displayFieldName;
  if (fieldName === "userType") {
    displayFieldName = "User type";
  } else {
    displayFieldName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
  }
  return displayFieldName;
};

export const FormErrors = ({ formErrors }) => (
  <Box className="formErrors">
    {Object.keys(formErrors).map(
      (fieldName, i) =>
        formErrors[fieldName].length > 0 && (
          <Typography
            key={i}
            variant="body1"
            color="error"
            style={{ outlineWidth: "20px", outlineColor: "#FFF" }}
          >
            {getDisplayFieldName(fieldName)} {formErrors[fieldName]}
          </Typography>
        )
    )}
  </Box>
);
