import React, { Component } from 'react';
import '../App.css';
class Notloaded extends Component{
	render(){
		return(
		<div className='location-loading'>
			<div className='fa-1x loading'>
        	<i className="fas fa-cog fa-spin"/>
          </div>
		</div>
		);
	}
}

class LocationList extends Component{

	constructor(){
		super();
		this.state={
			open:true,
			data:[],
			location:null,
			value:null,
			loaded:false
		}
	}

	hideOption(){
		this.props.close();
	}

	componentWillMount(){
		this.setState({loaded:false});
		this.fetchLocation();
	}

	async onSubmit(){
		let data = this.state.data.filter(x=>x.name===this.refs.location.value)[0];
		await this.props.getLocation(data);
		this.props.close();
	}

	async fetchLocation(){
		var req = new Request('https://cors-anywhere.herokuapp.com/https://gist.githubusercontent.com/Revortni/aebeed6a7ec59492c0c7066866c7f616/raw/bf214cc9cd86c214753407a2656b7b2f30ab7e33/citylist.json');
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
				  "Access-Control-Allow-Headers": "X-Requested-With"
				}
			});
			const data= await response.json();
			data.sort(compare);
			this.setState({
				data:data,
				loaded:true
			});
		} catch(e){
			console.error(e);
		}
	}

	render(){
		let locations = this.state.data.map(x=>{
			if(x.name!=='-'){
			return(<option value={x.name} key={x.id} loc={x.id}/>)
			}	else {return null;}
		});

		return(
			<div className="location">
				Locations
				<div className="icon" onClick={this.hideOption.bind(this)}>
					<i className="fas fa-times-circle" ></i>
	    		</div>
				
				{this.state.loaded?
					(<div>
					<div>
						<input list="addCity" name ="addCity" ref="location" placeholder="Enter location"/>
							<datalist id="addCity">
									{locations}
							</datalist>
					</div>
					<div>
						<button id="butAddCity" onClick={this.onSubmit.bind(this)}>Add</button>
						<button id="butAddCancel" onClick={this.hideOption.bind(this)}>Cancel</button>
					</div>
				</div>
					)
					:
					<Notloaded/>}
			
	    </div>
		);
	}
}

export default LocationList;