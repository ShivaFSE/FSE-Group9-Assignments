import React from "react";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

export default class IncidentTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "All",
    };
  }

  searchIncidents = (event) => {
    let keyword = event.target.value;
    this.setState({ search: keyword });
  };

  render() {
    var info1 = this.props.data;

    var items1 = info1
      .filter((data) => {
        if (this.state.search === "All") return data;
        else if (
          this.state.search !== "All" &&
          data["Place"].toLowerCase().includes(this.state.search.toLowerCase())
        )
          return data;
        else if (
          data["Place"]
            .toLowerCase()
            .includes(this.state.search.toLowerCase()) ||
          data["Type"].toLowerCase().includes(this.state.search.toLowerCase())
        )
          return data;
        return false;
      })
      .map((row, index) => {
        return (
          <TableRow key={index}>
            {Object.keys(row).map((key, index) => {
              if (key === "id") {
                let url = "./IncidentDetails?id=" + row["id"];
                return (
                  <TableCell key={index}>
                    <a href={url}>{row[key]}</a>
                  </TableCell>
                );
              } else {
                return <TableCell key={index}>{row[key]}</TableCell>;
              }
            })}
          </TableRow>
        );
      });

    return (
      <div style={{ padding: "20px" }}>
        <div>
          <TextField
            variant="outlined"
            placeholder="Filter by Incident Place or Type"
            fullWidth
            onChange={(e) => this.searchIncidents(e)}
          />
          <br></br>
          <TableContainer component={Paper}>
            <Table className="incident-table">
              <TableHead>
                <TableRow>
                  {Object.keys(info1[0]).map((key, index) => (
                    <TableCell key={index}>
                      <Typography variant="subtitle1">
                        {key.toUpperCase()}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>{items1}</TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }
}
