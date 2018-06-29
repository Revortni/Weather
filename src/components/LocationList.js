import React, { Component } from 'react';

class LocationList extends Component{

	constructor(){
		super();
		this.state={
			open:true,
			data:[],
			location:null,
			value:null
		}
	}

	hideOption(){
		this.props.close();
	}

	componentWillMount(){
		this.fetchLocation();
	}

	async onSubmit(){
		let data = this.state.data.filter(x=>x.name===this.refs.location.value)[0];
		await this.props.getLocation(data);
		this.props.close();
	}

	async fetchLocation(){
		var req = new Request('http://192.168.1.4:4000/list.json');
		function compare(a,b) {
			if (a.name < b.name)
			  return -1;
			if (a.name > b.name)
			  return 1;
			return 0;
		  }
		try{
			let response=await fetch(req);
			const data= await response.json();
			data.sort(compare);
			this.setState({data:data});
		} catch(e){
			console.error(e);
		}
	}

	render(){
		let locations = this.state.data.map(x=>{
			return(<option value={x.name} key={x.id} loc={x.id}/>)
			})
		return(
			<div className="location">
				Locations
				<div className="icon" onClick={this.hideOption.bind(this)}>
					<i className="fas fa-times-circle" ></i>
	    		</div>
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

		);
	}
}

export default LocationList;