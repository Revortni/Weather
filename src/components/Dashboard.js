import React, { Component } from 'react';
import Tab from './Tab.js'
import LocationList from './LocationList.js';
import './css/dashboard.css';
class Loading extends Component{
	render(){
    var show=this.props.show?"block":"none";
		return(
      <div className="loading" style={{display:show}}>
          <div className='fa-2x loading'>
              <i className="fas fa-cog fa-spin"/>
          </div>
          <div className='fa-6x loading'>
              <i className="fas fa-cog fa-spin"/>
          </div>
      </div>
		);
	}
}


class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state={
      addNew:false,
      hasLocation:false,
      datalist:[],
      blur:false
    };
  }

  componentDidUpdate(){
    if(this.state.addNew!==this.props.addNew){
        this.setState({
          addNew:this.props.addNew
        });
      }
  }

  handleClose(){
    this.props.hideOption();
  }

  getLocation(data){ 
    let datalist= this.state.datalist;
    datalist.push(data);   
		this.setState({
      datalist:datalist,
      hasLocation:true,
    });
  }

  closeTab(data){
    let datalist =this.state.datalist;
    datalist.pop(data);
    let hasLocation=(datalist.length>0)?true:false;
    this.setState({
      datalist:datalist,
      hasLocation:hasLocation
    });
  }

  render() {
    let data = this.state.datalist;
    let datalist = (data.length>0)?data.map(info=><Tab data={info} key={info.id} closeTab={this.closeTab.bind(this)}/>):null;
    // let background = this.props.blur?"blury":"notblury";
    return (
    	<div className="dashboard">
        {!this.state.hasLocation && <Loading show={true}/>}
        {this.state.hasLocation && datalist}
        {this.state.addNew && <LocationList close={this.handleClose.bind(this)} getLocation={this.getLocation.bind(this)}/>}
    	</div>
      );
	}
}

export default Dashboard;