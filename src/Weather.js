import React, { useState } from "react";

const axios = require('axios')

function Weather() {

  const [location, setLocation] = useState({latitude: '', longitude: ''});
  const [hourly, setHourly] = useState([]);

  function handleInputChanges(e) {
    const { name, value } = e.target

    setLocation((previousLocation) => ({
      ...previousLocation,
      [name]: value
    }))
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    let lat = location.latitude;
    let lon = location.longitude;
    console.log("form submitted")

    return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=f71702d7070a7369d2a39e2a5e3026ae`)
    .then(
      response => {
        let data = response.data;
        setHourly(data.hourly);
      }
    )
    .catch(error => console.log(error));
  }

  function handleDate(dt) {
    let newUnix = dt * 1000;
    let date = new Date(newUnix).toLocaleDateString("en-US");
    return date;
  }

  function handleTime(dt) {
    let newUnix = dt * 1000;
    let time = new Date(newUnix).toLocaleTimeString("en-US");
    return time;
  }

  function handleTemp(temp) {
    return Math.round(1.8*(temp-273) + 32);
  }

  return(
    <div>
      <form onSubmit={handleFormSubmit}>
        <input 
        placeholder="Insert latitude"
        onChange = {handleInputChanges}
        name = "latitude"
        type = "number"
        value = {location.latitude}
        />
        <input 
        placeholder="Insert longitude"
        onChange = {handleInputChanges}
        name = "longitude"
        type = "number"
        value = {location.longitude}
        />
        <button type='submit'>Submit</button>
      </form>
      <h1>Your forecast for the next 24 hours:</h1>
      <ul>
        {hourly.map((hour) => (
          <div key={hour.dt}>
            <li>Date/Time: {handleDate(hour.dt)} {handleTime(hour.dt)}</li>
            <li>Temp: {handleTemp(hour.temp)} F</li>
            <li>{hour.weather[0].description}</li>
            <p></p>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default Weather;