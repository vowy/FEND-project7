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
  <ul>
 <li className='bm-item' role='menuitem'>
   {this.props.name}
 </li>
  </ul>
</div>



     )
   }
 }
