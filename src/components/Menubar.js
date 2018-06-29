import React, { Component } from 'react';

class Menubtn extends Component {
	constructor(){
		super();
		this.state={
			click:false
		};
	}

	onclick(){
		this.setState({
			click:!this.state.click
		});
	}

  	render() {

    return (
    	<div className={this.state.click?"change":""}>
    	<div className="menubtn" onClick={this.onclick.bind(this)}>
		  <div className="bar1"></div>
		  <div className="bar2"></div>
		  <div className="bar3"></div>
		</div>
		</div>
      );
	}
}

class Menubar extends Component{
	render(){
		return(<Menubtn/>);
	}
}

export default Menubar;