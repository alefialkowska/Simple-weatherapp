import { useState } from 'react' 
import Form from './Form.js'
import Result from './Result.js'
import './App.css';


const App = () => {
 
  const [inputValue, setInputValue] = useState('');
  const [weatherData, setWeatherData] = useState({
    date: "",
    city: "",
    sunrise: "",
    sunset: "",
    temp: "",
    pressuer: "",
    wind: "",
    err: "",
    errStatus: "",
  });

  const handleInputChange = e => {
    setInputValue(e.target.value)
  }
  const handleCitySubmit = e => {
    e.preventDefault()
    let responseStatus = ''
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=b247826669c38cd364e8b0faf536103a&units=metric`;
    fetch(API)
    .then(response => {
      if(response.ok) {
        return response
      }
      responseStatus = response.status
      throw Error(response)
    })
    .then(response => response.json())
    .then(data => {
      const time = new Date().toLocaleString()
      setWeatherData(prevState => ({
        err: false,
        date: time,
        city: inputValue,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        temp: data.main.temp,
        pressuer: data.main.pressure,
        wind: data.wind.speed,
        errStatus: "",
      }))
    })
    .catch(err => {
      setWeatherData(prevState => ({
        err: true,
        city: inputValue,
        errStatus: responseStatus,
      }))
    })
   
  } 
 
  return (
   <div className="App">
     <Form 
     text={inputValue} 
     change={handleInputChange}
     submit={handleCitySubmit}/>
     <Result 
     weather={weatherData}/>
   </div>
  );
}


export default App;
