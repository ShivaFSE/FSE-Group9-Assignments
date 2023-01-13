import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { getUser } from './Common';
class CreateService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      selectedCity: '',
      selectedCityid: '',
      services: [],
      selectedservice: '',
      selectedserviceid: '',
      selectedsubservice: '',
      selectedsubserviceid: '',
      start_date: "",
      start_time: " ",
      date: new Date()
    };
  }

  /*fetch cities*/
  componentDidMount() {

    fetch("http://localhost:8000/api/core/cities")
      .then((response) => {
        return response.json();
      })
      .then(data => {
        let citiesFromApi = data.map((city) => {
          return { id: city.id, name: city.name }
        });
        this.setState({
          cities: [{ id: '', name: '(Select your City)', }].concat(citiesFromApi)
        });
        
      }).catch(error => {
        console.log(error);
      });
  }

  fetchServices=(e)=> {

    let obj = JSON.parse(e.target.value)  
    this.setState({
      selectedCityid: obj.key,
      selectedCity: obj.value,
      validationError:
        e.target.value === ""
          ? "You must select your city"
          : ""
    })
    fetch("http://localhost:8000/api/core/cities/services")
      .then((response) => {
        return response.json();
      })
      .then(data => {
        
        let cityservicelist = data.filter((service) => {
          if (service.city_id === this.state.selectedCityid)
            return service
          else
          return false
        }).map((service) => {
          return { cityid: service.city_id, servicename: service.service_id, subservicename: service.subservice_id }
        })
       
        this.setState({
          services: [{ cityid: '', servicename: '(Select the Service)', subservicename: 'Select the subservice' }].concat(cityservicelist)
        });
        
      }).catch(error => {
        console.log(error);
      });
  }


  ChangeService = (e) => {
    let obj = JSON.parse(e.target.value) 
    console.log("serverice"+obj.key+obj.value);
    this.setState({
      selectedserviceid: obj.key,
      selectedservice: obj.value,
      validationError:
        e.target.value === ""
          ? "You must select service"
          : ""
    });

  }
  ChangesubService = (e) => {
    let obj = JSON.parse(e.target.value) 
    this.setState({
      selectedsubserviceid: obj.key,
      selectedsubservice: obj.value,
      validationError:
        e.target.value === ""
          ? "You must select sub service"
          : ""
    });

  }

  onChangedate = (e) => {

    let start_date = e.target.value;
    e.target.value=start_date;    
    this.setState({ start_date: start_date });   
    e.preventDefault();
  }
  
  onChangetime = (e) => {
    let start_time = e.target.value;
    e.target.value=start_time;
    this.setState({ start_time: start_time });
     e.preventDefault();
  }
  
  handleSubmit = (e) => {
    const user=getUser()
    var payload = {
      "cust_id": user.id,
      "service_id": this.state.selectedservice,
      "subservice_id": this.state.selectedsubservice,
      "city_id": this.state.selectedCityid,
      "address": user.address,
      "start_date": this.state.start_date,
      "start_time": this.state.start_time
    }
    var apiBaseUrl = "http://localhost:8000/api/core/";
    var self = this;
    axios.post(apiBaseUrl + 'jobs', payload)
      .then(function (response) {
      
        if (response.status === 201) {
          console.log("Service Booked successfully");

          alert("Service Booked Successfully");
          self.props.history.push('/dashboardC');
         
        }
        else if (response.data.code === 204) {
          console.log("Service not booked");
          alert("Service not booked")
        }

      })
      .catch(function (error) {
       
        console.log(error);
      });

    e.preventDefault();
  }
  render() {
    return (
      <div>
        <fieldset>
          <legend> Book a Service</legend>
          <form
            name="ServiceDetails"
            onSubmit={this.handleSubmit}
            method="post"
          >
            <select
              onChange={this.fetchServices}
            >
              {this.state.cities.map((city) => <option key={city.id} value={JSON.stringify({key:city.id, value:city.name})}>{city.name}</option>)}
            </select>
            <br />
            <select
              onChange={this.ChangeService}
            >
              {this.state.services.map((service) => <option key={service.id} value={JSON.stringify({key:service.servicename, value:service.servicename})}>{service.servicename}</option>)}
            </select>
            <br />
            <select
              value={this.state.selectedsubService}
              onChange={this.ChangesubService}
            >
              {this.state.services.map((service) => <option key={service.id} value={JSON.stringify({key:service.subservicename, value:service.subservicename})}>{service.subservicename}</option>)}
            </select>
            <div
              style={{
                color: "red",
                marginTop: "5px"
              }}
            >
              {this.state.validationError}
            </div>
            <input type='text'
              name='description'
              value={this.state.description}
              placeholder="Description"
              maxLength={1155}
              onChange={this.handleUserInput}

            />
            <div>
                <input type="date" id="start" name="trip-start"
                onChange={this.onChangedate}
                value={this.state.start_date}
                min="2018-01-01" max="2028-12-31"></input>
             <input type="time" id="appt" name="appt"
             onChange={this.onChangetime}
             value={this.state.start_time}
             ></input>
            </div>
            <br />
            <input type='submit' value='Submit' />

          </form>
        </fieldset>
      </div>
    );
  }
 
}

export default withRouter(CreateService);