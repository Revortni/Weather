import React, { Component } from 'react';
import Tab from './Tab.js'
import LocationList from './LocationList.js';
import './css/dashboard.css';

const proxy = 'https://cors-anywhere.herokuapp.com/';
const uri = 'https://gist.githubusercontent.com/Revortni/aebeed6a7ec59492c0c7066866c7f616/raw/bf214cc9cd86c214753407a2656b7b2f30ab7e33/citylist.json';

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
      datalist:[],//data to be displayed
      blur:false,
      listloaded:false,
      locationlist:[]//data list of all the locations  
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
  
  componentWillMount(){
    if(!this.state.loadedlist)
    {this.fetchLocation();}
  }

  async fetchLocation(){
		var req = new Request(proxy+uri);
		function compare(a,b) {
			if (a.name < b.name)
			  return -1;
			if (a.name > b.name)
			  return 1;
			return 0;
		  }
		try{

			let response=await fetch(req,{
				method:'GET',
				mode: 'cors',
				headers: {
				  'Access-Control-Allow-Origin':'*',
				  'Access-Control-Allow-Methods':'*',
          "Access-Control-Allow-Headers": "X-Requested-With",
          'Origin':uri
				}
			});
			const data= await response.json();
			data.sort(compare);
			this.setState({
				locationlist:data,
				listloaded:true
			});
		} catch(e){
			console.error(e);
		}
	}

  render() {
    let data = this.state.datalist;
    let datalist = (data.length>0)?data.map(info=><Tab data={info} key={info.id} closeTab={this.closeTab.bind(this)}/>):null;
    // let background = this.props.blur?"blury":"notblury";
    return (
    	<div className="dashboard">
        {!this.state.hasLocation && <Loading show={true}/>}
        {this.state.hasLocation && datalist}
        {this.state.addNew && <LocationList close={this.handleClose.bind(this)} getLocation={this.getLocation.bind(this)} data={this.state.locationlist} loaded={this.state.listloaded}/>}
    	</div>
      );
	}
}

export default Dashboard;