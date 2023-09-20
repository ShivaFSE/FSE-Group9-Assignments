import React from "react";
import { Container, Typography, Grid, Paper, Icon } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
const sectionStyle = {
  padding: "50px",
  textAlign: "center",
  color: "#333", // Text color
  backgroundColor: "#f5f5f5", // Background color
};

const iconStyle = {
  fontSize: "78px",
  marginBottom: "16px", // Spacing between icon and text
};

const ContactUsPage = () => {
  return (
    <Container style={{ marginTop: "55px" }}>
      <Typography
        marginBottom={"45px"}
        variant="h4"
        align="center"
        gutterBottom
        fontFamily={"monospace"}
      >
        Contact Us
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Paper style={sectionStyle}>
            <EmailIcon style={iconStyle}>email</EmailIcon>
            <Typography variant="h5">Contact by Email</Typography>
            <Typography variant="body1">
              Email: contact@swachhdesi.com
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper style={sectionStyle}>
            <PhoneIcon style={iconStyle}>phone</PhoneIcon>
            <Typography variant="h5">Contact by Phone</Typography>
            <Typography variant="body1">Phone: +91 12345-67890</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper style={sectionStyle}>
            <BusinessIcon style={iconStyle}>location_on</BusinessIcon>
            <Typography variant="h5">Address</Typography>
            <Typography variant="body1">
              Whitefield, Bengaluru, India
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactUsPage;
