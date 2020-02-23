import React from 'react';
import logo from './logo.svg';
import './App.css';

const api_key = "8d2de98e089f1c28e1a22fc19a24ef04";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: undefined,
      country: undefined,
      temperature: null,
      humidity: null,
      description: null,
      valueEntered: false,
    }
    this.setCity = this.setCity.bind(this)
    this.setCountry = this.setCountry.bind(this)
    this.getWeather = this.getWeather.bind(this)
    this.Hide = this.Hide.bind(this)
  }


  getWeather = async () => {
  
    var api_call = fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.city},${this.state.country}&appid=${api_key}`);
    var responseResult = await api_call.then(response => response.json())
    console.log(responseResult)
    console.log(responseResult.main)
    console.log(responseResult.main.temp)
  
    if (this.state.city && this.state.country) {
      api_call.then(
        (data) => {
          this.setState({
            temperature: responseResult.main.temp,
            city: responseResult.name,
            country: responseResult.sys.country,
            humidity: responseResult.main.humidity,
            description: responseResult.weather[0].description,
            valueEntered: true,
          })
        }
      )
    }
  
    else {
    }
  
  }

  setCity(e) {
    this.setState({
      city: e.target.value
    })
    console.log(this.state.city)
    console.log(e.target.value)
  }

  setCountry(e) {
    this.setState({
      country: e.target.value
    })
    console.log(this.state.country)
    console.log(e.target.value)
  }

  Hide() {
    this.setState({
      valueEntered: false
    })
  }

  render() {

    var Data = <span><p>Location:<b>{this.state.city}</b></p><p>Temperture:<b>{this.state.temperature}</b></p><p>Humidity:<b>{this.state.humidity}</b></p><p>Description:<b>{this.state.description}</b></p></span>;

    return (
      <div className="App">
        <header className="App-header">
          <div className='win'>
            <div className='imgdisp' onClick={this.Hide}>
              <p id='Heading'>WEATHER UPDATE APP</p>
              <input className='in' onBlur={this.setCity} />
              <input className='in' onBlur={this.setCountry} />
              <button className='go' onClick={this.getWeather}><i class="fas fa-paper-plane"></i></button>
              {(this.state.valueEntered) ? Data : ''}
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
