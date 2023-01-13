import React from 'react';
import "./bookings.css";
import { getUser } from './Common';

export default class Jobs extends React.Component {

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
        paymentstatus: "",
      }],
    }
    this.getHeader = this.getHeader.bind(this);
    this.getRowsData = this.getRowsData.bind(this);
    this.getKeys = this.getKeys.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  fetchdata() {
    const user = getUser();
    var apiBaseUrl = "http://localhost:8000/api/core/jobs/jobs_filters?"
    if (this.props.role === "Customer") {
      var customer_id = user.id;

      apiBaseUrl = apiBaseUrl + "customer_id=" + customer_id;

    }
    else if (this.props.role === "expert") {
      var expert_id = user.id;

      apiBaseUrl = apiBaseUrl + "expert_id=" + expert_id;

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
        this.setState({ jobsdata: jobsfromapi });

      }).catch(error => {
        console.log(error);
      });

  }
  componentDidMount() {
    this.fetchdata();
  }

  handleClick = (index) => {
    this.props.history.push({
      pathname:'/UpdateService',
      state: { service: this.state.jobsdata[index] }
    });

  }
  getKeys = function () {
    return Object.keys(this.state.jobsdata[0]);
  }

  getHeader = function () {
    var keys = this.getKeys();
    return keys.map((key) => {
      return <th key={key}>{key.toUpperCase()}</th>
    })
  }

  getRowsData = function () {
    var items = this.props.jobsdata;
    var keys = this.getKeys();
    return items.map((row, index) => {
        return <tr key={index}><RenderRow key={index} data={row} keys={keys} /></tr>
    })
  }

  render() {

    var info = this.state.jobsdata;
    var keys = this.getKeys();
    var items = info.map((row, index) => {
      return <tr key={index}><RenderRow key={index} data={row} keys={keys} />
                <td><button onClick={() => this.handleClick(index)}>Update</button>
        </td>
                </tr>
    })
    
    return (
      <div>
        <div className="bookingslist">
          <h3>My Bookings</h3>
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

export const RenderRow = (props) => {
  let url = "./UpdateService";
  return props.keys.map((key) => {  
    let keyid;  
        if (key === "jobid") {
      keyid="jobid"+props.data[key];
      return <td key={keyid}><a href={url}>{props.data[key]}</a></td>
    } 
    else{
      keyid=key+props.data[key];
      return <td key={keyid}>{props.data[key]}</td>
    }      
  })
}


