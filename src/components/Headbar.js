import React, { Component } from 'react';
import Menubar from './Menubar.js';
import './css/headbar.css';
class AddTab extends Component{
	render(){
		return(
			<div className="addTab fa-3x" onClick={this.props.onClick}>
	    		<i className="fas fa-plus-circle"/>
	    	</div>
		);
	}
}

class Headtitle extends Component{
	render(){
		return(
		  	<div className='title'>Weather App
	    		<i className='fas fa-cloud'/>
	    	</div>);
	}
}

class Headbar extends Component {
	constructor(props) {
    	super(props);
    	this.addLocation = this.addLocation.bind(this);
  	}
  	
	addLocation(){
		this.props.showOption();
	}

  render() {
    return (
    	<div className="headbar">
	    	<Menubar/>
	    	<Headtitle/>
	    	<AddTab onClick={this.addLocation}/>
    	</div>
      );
	}
}

export default Headbar;