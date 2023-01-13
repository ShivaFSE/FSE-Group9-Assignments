import React from 'react';
import "./bookings.css";
export default class BookingsTable extends React.Component {

  constructor(props) {

    super(props);
    this.getHeader = this.getHeader.bind(this);
    this.getRowsData = this.getRowsData.bind(this);
    this.getKeys = this.getKeys.bind(this);
    this.state = {
      search: 'All',
      search1: 'All',
     
    };
  }

  searchSpace1 = (event) => {
    let keyword = event.target.value;
    this.setState({ search1: keyword })
  }
  searchSpace = (event) => {
    let keyword = event.target.value;
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
      if (this.state.search === 'All' && this.state.search1 === 'All')
        return data
      else if(this.state.search !== 'All' && this.state.search1 === 'All' && data.JobStatus.toLowerCase().includes(this.state.search.toLowerCase()))
         return data
      else if ((data.JobStatus.toLowerCase().includes(this.state.search.toLowerCase())) && (data.PaymentStatus.toLowerCase().includes(this.state.search1.toLowerCase()))) 
        return data        
      return false
    
    }).map((row, index) => {

      return <tr key={index}><RenderRow key={index} data={row} keys={keys} /></tr>

    })
    return (
      <div>
          <div className="bookingslist">
          <input type="text" placeholder="Filter on JobStatus" onChange={(e) => this.searchSpace(e)} />
          <input type="text" placeholder="Filter on PaymentSatus" onChange={(e) => this.searchSpace1(e)} />
          <table>
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
  let url="./createService";
  return props.keys.map((key, index) => {
    if(key==="JobID" || key==="Feedback")
    {
        return <td key={props.data[key]}><a href={url}>{props.data[key]}</a></td>
    }
    else
    return <td key={props.data[key]}>{props.data[key]}</td>
  })
}


