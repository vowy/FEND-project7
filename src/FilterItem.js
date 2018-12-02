import React, { Component } from 'react';



export default class Item extends Component {
  constructor(props) {
     super(props);
     this.state={
       filteredLocations: [],
     }
   }

   render() {
     return (
<div id='filter-items'>
 <li className='bm-item' onClick={(e)=>this.props.onItemClick(e)}>{this.props.name}</li>
</div>


     )
   }
 }
