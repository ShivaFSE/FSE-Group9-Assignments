import React from 'react';
import { getUser, removeUserSession } from './Common';
import { withRouter } from "react-router-dom";
import BookingsTable from "./Table";
import './dashboard.css';
import Jobs from './jobs.js';

class DashboardC extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // currentbooking: this.props.location.state.detail,
      tableData: [
        {
          JobID: "PL12342",
          ServiceName: "Plumbing",
          ExpertName: "Satish",
          Date: "2020-08-03",
          Time: "14:00",
          JobStatus: "Active",
          PaymentStatus: "Pending",
          Feedback: "SubmitFeedback"
        },
        {
          JobID: "PC32342",
          ServiceName: "PestControl",
          ExpertName: "John",
          Date: "2020-09-03",
          Time: "16:00",
          JobStatus: "Active",
          PaymentStatus: "Paid",
          Feedback: "SubmitFeedback"

        },
        {
          JobID: "AC32342",
          ServiceName: "ACrepair",
          ExpertName: "Suresh",
          Date: "2020-08-10",
          Time: "10:00",
          JobStatus: "Completed",
          PaymentStatus: "Paid",
          Feedback: "ViewFeedback"
        },
        {
          JobID: "PL12342",
          ServiceName: "ElectricInstallation",
          ExpertName: "David",
          Date: "2020-08-29",
          Time: "18:00",
          JobStatus: "Active",
          PaymentStatus: "Pending",
          Feedback: "SubmitFeedback"
        }
      ]
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleClick = (e) => {
    this.props.history.push('/CreateService');
    console.log("hi in cre");
    e.preventDefault();
  }

  handleLogout = (e) => {
    removeUserSession();
    this.props.history.push('/');
    e.preventDefault();
  }

  render() {
    const user = getUser();
    
    return (
      <div className="dashboard-container">
        <div className="Greeting">
          <h3>Welcome {user.name} !</h3>
        </div>
        <div className="Jobs">                  
          <Jobs role="Customer" history={this.props.history} />
          <BookingsTable data={this.state.tableData} />
        </div>
        <div className="search-container">
          <fieldset>
            <legend>Book a Service</legend>
            <input type='submit' value='Book' onClick={this.handleClick} />
          </fieldset>

        </div>
        <div className='user-menu'>
          <input type="button" onClick={this.handleLogout} value="Logout" />
        </div>
      </div>
    );
  }
}

export default withRouter(DashboardC);