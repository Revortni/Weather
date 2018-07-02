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
			data:[],
			location:null,
		}
	}

	hideOption(){
		this.props.close();
	}

	componentDidMount(){
		this.setState({
			data:this.props.data,
			loaded:this.props.loaded
		});
	}

	async onSubmit(){
		let data = this.state.data.filter(x=>x.name===this.refs.location.value)[0];
		await this.props.getLocation(data);
		this.props.close();
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