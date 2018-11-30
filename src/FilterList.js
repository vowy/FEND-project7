import React, { Component } from 'react';



export default class FilterList extends Component {
  constructor(props) {
     super(props);
     this.state={
       filteredLocations: [],
     }
   }

   componentDidUpdate(prevProps) {
    if (this.props.filteredLocations !== prevProps.filteredLocations) {
         this.setState({filteredLocations:this.props.filteredLocations});
    } else {
      return;
    }

   }

   handleClick = (e) => {
     console.log(e);
   }

   render() {

     return (
<div className='filter-list'>
 <ul className='bm-item-list'>
  {this.state.filteredLocations.map((location,i)=>
{return <li key={i} className='bm-item' onClick={this.handleClick.bind(this)}>{location.name}</li>}
   )}
 </ul>
 </div>



     )
   }
 }
