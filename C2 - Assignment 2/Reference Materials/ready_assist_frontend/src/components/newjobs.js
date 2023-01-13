import React from 'react';
import "./bookings.css";
import { getUser } from './Common';
import { RenderRow } from './jobs';
import axios from 'axios';

export default class Newjobs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      jobsdata: [{
        jobid: "-1",
        servicename: "",
        expertname: "",
        customername: "",
        date: "",
        time: "",
        jobstatus: "",
        paymentstatus: "-1"
      }],

    }
    this.getHeader = this.getHeader.bind(this);
    this.getRowsData = this.getRowsData.bind(this);
    this.getKeys = this.getKeys.bind(this);

  }

  fetchdata() {

    var apiBaseUrl = "http://localhost:8000/api/core/jobs/jobs_filters?"
    if (this.props.status === "initiated") {

      apiBaseUrl = apiBaseUrl + "service_status=initiated";

    }
    fetch(apiBaseUrl)
      .then((response) => {
        return response.json();
      })
      .then(data => {
        let jobsfromapi = data.map((job) => {
          return {
            jobid: job.id,
            servicename: job.service_id,
            expertname: job.expert_id,
            customername: job.cust_id,
            date: job.start_date,
            time: job.start_time,
            jobstatus: job.job_status,
            paymentstatus: job.payment_id,
          }
        });

        this.setState({ jobsdata: this.state.jobsdata.concat(jobsfromapi) });

      }).catch(error => {
        console.log(error);
      });
  }
  componentDidMount() {
    this.fetchdata();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.jobsdata !== this.state.jobsdata) {

      console.log('state has changed.');
    }

  }
  getKeys = function () {
    return Object.keys(this.state.jobsdata[0]);
  }

  getHeader = function () {
    var keys = this.getKeys();

    return keys.map((key, index) => {
      return <th key={key}>{key.toUpperCase()}</th>
    }
    )
  }

  getRowsData = function () {
    var items = this.props.jobsdata;
    
    var keys = this.getKeys();
    return items.map((row, index) => {
      return <tr key={index}><RenderRow key={index} data={row} keys={keys} /></tr>
    })
  }

  handleClick(index) {
    
    const user = getUser();

    var payload = {
      "cust_id": this.state.jobsdata[index].customername,
      "expert_id": user.id,
      "start_date": this.state.jobsdata[index].date,
      "start_time": this.state.jobsdata[index].time,
      "job_status": "Active"
    }
    
    var jobid = this.state.jobsdata[index].jobid;
    var apiBaseUrl = "http://localhost:8000/api/core/jobs/" + jobid;
    var self = this;
    axios.put(apiBaseUrl, payload)
      .then(function (response) {
        console.log(response);

        if (response.status === 200) {
          console.log("Job updated successfully");
          alert("Job update Successfully");
          

          let newState = Object.assign({}, self.state);
          delete newState.jobsdata[index];
          self.setState(newState);
         
        }
        else if (response.data.code === 204) {
          console.log("Servie not updated");
          alert("Servie not updated")
        }

      })
      .catch(function (error) {

        console.log(error);
      });

  };
  render() {

    var info = this.state.jobsdata;
    var keys = this.getKeys();

    var items = info.map((row, index) => {


      return <tr key={index}><RenderRow key={index} data={row} keys={keys} />
        <td><button onClick={() => this.handleClick(index)}>Accept</button>
        </td>
      </tr>
    })


    return (
      <div>
        <div className="bookingslist">
          <h3>Service Available</h3>
          <table>
            <thead>
              <tr>{this.getHeader()}</tr>

            </thead>
            <tbody>
              {items}
            </tbody>
          </table>
        </div>

      </div>
    );
  }
}






