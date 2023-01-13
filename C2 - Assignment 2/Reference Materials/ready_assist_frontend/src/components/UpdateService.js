import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class UpdateService extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

      jobid: "",
      servicename: "",
      expertname: "",
      customername: "",
      date: "",
      time: "",
      jobstatus: "",
      paymentstatus: "-1",
      end_date: "",
      end_time: "",
      updated_by: " ",
      updated_by_type: ""
    };
    this.ChangeServiceStatus = this.ChangeServiceStatus.bind(this);
  }

  onChangedate = (e) => {

    let end_date = e.target.value;
    e.target.value = end_date;
    this.setState({ end_date: end_date });

    e.preventDefault();
  }

  onChangetime = (e) => {

    let end_time = e.target.value;
    e.target.value = end_time;

    this.setState({ end_time: end_time });

    e.preventDefault();
  }

  ChangeServiceStatus = (e) => {
    let ServiceStatus = e.target.value;
    e.target.value = ServiceStatus;
    this.setState({ jobstatus: ServiceStatus });
    e.preventDefault();
  }
  ChangePaymentStatus = (e) => {
    let PaymentStatus = e.target.value;
    e.target.value = PaymentStatus;
    this.setState({ payment: PaymentStatus });
    e.preventDefault();
  }

  handleSubmit = (e) => {
    var servicedata = this.props.location.state.service;
    var payload = {
      "cust_id": servicedata.customername,
      "expert_id": servicedata.expertname,
      "start_date": servicedata.date,
      "start_time": servicedata.time,
      "job_status": this.state.jobstatus,
      "end_date": this.state.end_date,
      "end_time": this.state.end_time,
      "payment_id": 200,
      "updated_by": servicedata.expertname,
    }
    var apiBaseUrl = "http://localhost:8000/api/core/";
    var self = this;
    var jobid = servicedata.jobid;
    apiBaseUrl = "http://localhost:8000/api/core/jobs/" + jobid;
    axios.put(apiBaseUrl, payload)
      .then(function (response) {

        if (response.status === 200) {
          console.log("Service Updated successfully");

          alert("Service updated Successfully");
          self.props.history.push('/dashboardE');

        }
        else if (response.data.code === 204) {
          console.log("Service not updated");
          alert("Servie  not updated")
        }

      })
      .catch(function (error) {
        console.log("")
        console.log(error);
      });

    e.preventDefault();
  }
  render() {
    var servicedata = this.props.location.state.service;
    return (
      <div >

        <form
          name="ServiceDetails"
          onSubmit={this.handleSubmit}
          method="post"
        >
          <label>Job Id: {servicedata.jobid} </label>
          <br />
          <label>Customer Name: {servicedata.customername}</label>
          <br />
          <label>Expert Name: {servicedata.expertname}</label>
          <br />
          <label>Service Status</label>
          <select
            value={this.state.ServiceStatus}
            onChange={this.ChangeServiceStatus}
          >
            <option> Select Status </option>
            <option key="completed"> Completed </option>
            <option key="pending"> Pending </option>
          </select>
          <br />
          <label>Payment Status</label>
          <select
            value={this.state.PaymentStatus}
            onChange={this.ChangePaymentStatus}
          >
            <option> Select Payment Status </option>
            <option key="paid"> Paid </option>
            <option key="pending"> Pending </option>
          </select>
          <div
            style={{
              color: "red",
              marginTop: "5px"
            }}
          >
            {this.state.validationError}
          </div>
          <div>
            <label>Enter Service completion Date and Time</label>
            <input type="date" id="start" name="trip-start"
              onChange={this.onChangedate}
              value={this.state.start_date}
              min="2018-01-01" max="2028-12-31"></input>
            <input type="time" id="appt" name="appt"
              onChange={this.onChangetime}
              value={this.state.start_time}
            ></input>
            <div>
              <label>Enter Description/Remarks</label>
              <input type='text'
                name='description'
                value={this.state.description}
                placeholder="Description"
                maxLength={1155}
                onChange={this.handleUserInput}

              />
            </div>
          </div>

          <input type='submit' value='Submit' />

        </form>

      </div>
    );
  }

}

export default withRouter(UpdateService);