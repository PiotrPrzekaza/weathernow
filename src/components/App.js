import React, { Component } from "react";
import "./App.css";
import Form from "./Form";
import Result from "./Result";
import Header from "./Header";
const APIKey = '39027282d7aada4905f4755840a399c1';
class App extends Component {
  state = {
    value: "",
    date: "",
    city: "",
    sunrise: "",
    sunset: "",
    temp: "",
    wind: "",
    pressure: "",
    err: "",
  };



  handleInputChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  componentDidUpdate(prevProps, prevState) {

    if (this.state.value.length === 0) return
    if (prevState.value !== this.state.value) {


      const API = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=${APIKey}&units=metric`;
      fetch(API)
        .then(response => {
          if (response.ok) {
            return response
          }
          throw Error("Nie udało się")
        })
        .then(response => response.json())
        .then(data => {
          const time = new Date().toLocaleString()
          this.setState(prevState => ({
            err: false,
            date: time,
            city: prevState.value,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            temp: data.main.temp,
            wind: data.wind.speed,
            pressure: data.main.pressure,
          }))
        })
        .catch(err => {
          console.log(err);
          this.setState(prevState => ({
            err: true,
            city: prevState.value,
          }))
        })
    }
  }

  // handleCitySubmit = (e) => {
  //   e.preventDefault();

  //   const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=${APIKey}&units=metric`;


  //   fetch(API)
  //     .then(response => {
  //       if (response.ok) {
  //         return response
  //       }
  //       throw Error("Nie udało się")
  //     })
  //     .then(response => response.json())
  //     .then(data => {
  //       const time = new Date().toLocaleString()
  //       this.setState(prevState => ({
  //         err: false,
  //         date: time,
  //         city: prevState.value,
  //         sunrise: data.sys.sunrise,
  //         sunset: data.sys.sunset,
  //         temp: data.main.temp,
  //         wind: data.wind.speed,
  //         pressure: data.main.pressure,
  //       }))
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       this.setState(prevState => ({
  //         err: true,
  //         city: prevState.value,
  //       }))
  //     })
  // }
  render() {
    return (
      <div className="App">
        <Header />
        <Form value={this.state.value} change={this.handleInputChange} />
        <Result weather={this.state} />
      </div>
    );
  }
}

export default App;
