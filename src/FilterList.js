import React, { Component } from 'react';
import Item from './FilterItem.js'




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
    }}




   render() {

     return (
<div className='filter-list'>
 <ul role='menu' className='bm-item-list'>
  {this.state.filteredLocations.map((item,index, e)=>

<Item
   key={index}
   name={item.name}
   index={item.index}>
</Item>
 )}

 </ul>
 </div>



     )
   }
 }
