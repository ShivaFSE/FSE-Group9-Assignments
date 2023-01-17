import React from 'react';
import "./Orders.css";
export default class OrdersTable extends React.Component {

  constructor(props) {

    super(props);
    this.getHeader = this.getHeader.bind(this);
    this.getRowsData = this.getRowsData.bind(this);
    this.getKeys = this.getKeys.bind(this);
    this.state = {
      search: 'All',
     
    };
  }

  searchOrders = (event) => {
    let keyword = event.target.value;
    console.log("in searchOrders");
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
      else if(this.state.search !== 'All' && (data["Order Status"]).toLowerCase().includes(this.state.search.toLowerCase()))
         return data
      else if (((data["Order Status"]).toLowerCase().includes(this.state.search.toLowerCase()))) 
        return data        
      return false
    
    }).map((row, index) => {

      return <tr key={index}><RenderRow key={index} data={row} keys={keys} /></tr>

    })

    return (
      <div>
          <div className="orders-list">
          <input type="text" placeholder="Filter by Order Status" onChange={(e) => this.searchOrders(e)} />
          <table className="order-table">
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
    if(key==="Order ID" || key==="Restaurant Name")
    {
        return <td key={props.data[key]}><a href={url}>{props.data[key]}</a></td>
    }
    else
      return <td key={props.data[key]}>{props.data[key]}</td>
  })
}


