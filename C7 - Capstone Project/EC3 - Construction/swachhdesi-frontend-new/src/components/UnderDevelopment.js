import React from "react";
import "./UnderDevelopment.css";
import { Container, Typography, Paper } from "@mui/material";

class UnderDevelopment extends React.Component {
  render() {
    return (
      <Container style={{ marginTop: "45px" }} maxWidth="100%">
        <Paper
          elevation={3}
          style={{ padding: "20px", backgroundColor: "#F3F0CA" }}
        >
          <Typography
            fontFamily="monospace"
            variant="h4"
            align="center"
            gutterBottom
          >
            About Us
          </Typography>
          <Typography fontFamily="monospace" variant="body1" paragraph>
            The Objective of this project is to provide a Service-learning
            (Wikipedia defines Service-learning as an educational approach that
            combines learning objectives with community service to provide a
            pragmatic, progressive learning experience while meeting societal
            needs) application to Indians who are interested in keeping their
            city clean. In our day-to-day life we find several places in our
            communities which are unorganized/unclean, hence they require
            special attention from the government. But our government may not be
            able to address all the issues/concerns all by itself, hence our
            idea is to build an application where people own these problems and
            try to find solutions to these generic problems.
          </Typography>
          <Typography variant="body1" paragraph>
            This application offers service to two parties,
          </Typography>
          <Typography variant="body1" fontFamily="monospace" paragraph>
            1. Swachh Citizen - In our use case these are the reporters of a
            problem. If any responsible citizen finds any place not clean
            whether it can be a place, building, government property like
            railway station etc. can report the problem by creating a new
            incident with details like description of the problem, place of the
            problem, directions to the place, pictures of the place, number of
            people the service needs to fix it and the cost it may involve.
            Additionally, they can fix a date to resolve the issue and list down
            the details of tools/resources needed to fix the problem. Once the
            problem is solved, they may want to upload the latest photos after
            providing the service and close the incident.
          </Typography>
          <Typography variant="body1" fontFamily="monospace" paragraph>
            2. Swachh Volunteer - These are the responders to a reported
            problem. Any interested/registered volunteers can see current
            Incidents by entering the location and see the details of it. If
            they are interested, they can sign up for it and provide what kind
            of help they can provide to fix it.
          </Typography>
        </Paper>
      </Container>
    );
  }
}

export default UnderDevelopment;
