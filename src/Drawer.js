import React, { Component } from 'react';
import FilterList from './FilterList.js';


export default class Drawer extends Component {
  constructor(props) {
     super(props);
     this.state={
       query: '',
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

updateQuery = (input) => {

if (input==='' || !input) {
  this.props.clearFilter();
}
 else {
  this.props.onQueryUpdate(input);
  return;
}
}



  render() {


     let {query} = this.state.query;


    return (

<div id='menuBody'>
      <div className='searchbar'>
        <input
          type='search'
          id='search'
          name='filterLocations'
          placeholder='Filter map markers'
          value={query}
          onChange={(event) => this.updateQuery(event.target.value)}/>
      </div>

<div id="showing-results-text">Showing {this.state.filteredLocations.length} Results:</div>
<hr></hr>

<FilterList filteredLocations={this.state.filteredLocations}/>
</div>





    )
  }
}
