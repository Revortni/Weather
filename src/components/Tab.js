import React, { Component } from 'react';
import $ from 'jquery'

const api_key="";//insert api key for open weather api

class Close extends Component {
	close(){
		this.props.onClick();
	}

	render(){
		return(
			<div className="icon" onClick={this.close.bind(this)}>
				<i className="fas fa-times-circle" />
	    	</div>
		);
	}
}

class Tab extends Component {
	
	constructor(){
		super();
		this.state={
			data:[],
			info:null
		};
	}

	componentDidMount(){
		this.setState({
			data:this.props.data
		});
		let code = this.props.data.id;
		let url =`https://api.openweathermap.org/data/2.5/weather?id=`+code.toString()+`&APPID=${api_key}`;
		$.ajax({
			url: url,
			data: 'json',
			cache: false,
			success: (x) => {
				this.setState({
					info:x
				});
				console.log(x);
			},
			error: function(xhr, status, err) {
					console.log(err + "couldnot load file");
			}
		});
	}
	
	closeTab(){
		this.props.closeTab(this.state.data
		);
	}

	render() {
		let info = this.state.info;
		function round(a){
			return Number(a).toPrecision(4);
		}
		if(info){
			let icon="http://openweathermap.org/img/w/"+info.weather[0].icon+".png";
			return (
					<div className="tab">
						<Close onClick={this.closeTab.bind(this)}/>
						<ul>
							<li className="name">{info.name}</li>
							<img src={icon} className="weather_icon" alt={info.weather[0].main}/>
							<li className="weatherinfo">Status: {info.weather[0].description}</li>
							<li className="weatherinfo">Avg_temp: {round(info.main.temp-275)}°C</li>	
							<li className="weatherinfo">Max_temp: {round(info.main.temp_max-275)}°C</li>	
							<li className="weatherinfo">Min_temp: {round(info.main.temp_min-275)}°C</li>	
							<li className="weatherinfo">Pressure: {info.main.pressure} hPa</li>		
							<li className="weatherinfo">Humidity: {info.main.humidity}%</li>				
						</ul>
					</div>
			);
		} else return null
	}
}

export default Tab;