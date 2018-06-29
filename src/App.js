import React, { Component } from 'react';
import Dashboard from './components/Dashboard.js';
import Headbar from './components/Headbar.js';
import Footbar from './components/Footbar.js';
import './App.css';

class App extends Component {
	constructor(){
		super();
		this.state={
			showOption:false,
			blur:false
		};
		this.addLocation.bind(this);
	}

	addLocation(){
		this.setState({
			showOption:true,
			blur:true
		});
	}

	hideOption(){
		this.setState({
			showOption:false,
			blur:false
		});
	}

  render() {
    return (
    	<div>
    	<Headbar showOption={this.addLocation.bind(this)}/>
    	<Dashboard blur={this.state.blur} addNew={this.state.showOption} hideOption={this.hideOption.bind(this)}/>
    	<Footbar/>
    	</div>
      );
	}
}

export default App;
