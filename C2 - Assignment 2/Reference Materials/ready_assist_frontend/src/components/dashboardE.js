import React from 'react';
import { getUser, removeUserSession } from './Common';
import { withRouter } from "react-router-dom";
import './dashboard.css';
import Jobs from './jobs';
import Newjobs from './newjobs';

class DashboardE extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
        }

      ]
    }
    this.handleLogout = this.handleLogout.bind(this);

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
          <h3>Welcome {user} !</h3>
        </div>

        <div className="Jobs">
          <Newjobs status="initiated" />
          <Jobs role="expert" history={this.props.history} />
        </div>
        <div className='user-menu'>
          <input type="button" onClick={this.handleLogout} value="Logout" />
        </div>
      </div>
    );
  }


}


export default withRouter(DashboardE);