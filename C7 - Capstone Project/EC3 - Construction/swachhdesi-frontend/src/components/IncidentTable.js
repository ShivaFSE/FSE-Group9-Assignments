import React from 'react';
import "./Incidents.css";
export default class IncidentTable extends React.Component {

  constructor(props) {

    super(props);
    this.getHeader = this.getHeader.bind(this);
    this.getRowsData = this.getRowsData.bind(this);
    this.getKeys = this.getKeys.bind(this);
    this.state = {
      search: 'All',
     
    };
  }

  searchIncidents = (event) => {
    let keyword = event.target.value;
    console.log("in searchIncidents");
    this.setState({ search: keyword })
  }

  getKeys = function () {
    return Object.keys(this.props.data[0]);
  }

  getHeader = function () {
    var keys = this.getKeys();
    return keys.map((key, index) => {
      return <th key={key}>{key.toUpperCase()}</th> 
    })
  }

  getRowsData = function () {
    var items = this.props.data;
    console.log(items);
    var keys = this.getKeys();
    return items.map((row, index) => {
      return <tr key={index}><RenderRow key={index} data={row} keys={keys} /></tr>
    })
  }

  render() {
    var info1 = this.props.data;
    var keys = this.getKeys();
    
    var items1 = info1.filter((data) => {
      if (this.state.search === 'All')
        return data
      else if(this.state.search !== 'All' && (data["Place"]).toLowerCase().includes(this.state.search.toLowerCase()))
         return data
      else if (((data["Place"]).toLowerCase().includes(this.state.search.toLowerCase())) || ((data["Type"]).toLowerCase().includes(this.state.search.toLowerCase()))) 
        return data        
      return false
    
    }).map((row, index) => {
      return <tr key={index}><RenderRow key={index} data={row} keys={keys} /></tr>
    })

    return (
      <div>
          <div className="incidents-list">
          <input type="text" placeholder="Filter by Incident Place or Type" onChange={(e) => this.searchIncidents(e)} />
          <table className="incident-table">
            <thead>
              <tr>{this.getHeader()}</tr>
            </thead>
            <tbody>
                {items1}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const RenderRow = (props) => {
  let url="./IncidentDetails?id=" + props.data["id"];
  return props.keys.map((key, index) => {
    if(key === "id")
    {//details={props.data}
        return <td key={props.data[key]}><a href={url}>{props.data[key]}</a></td>
    }
    else
      return <td key={props.data[key]}>{props.data[key]}</td>
  })
}


