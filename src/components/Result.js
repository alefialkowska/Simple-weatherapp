import React from 'react';
import './result.css'

const Result = (props) => {
    const {err, city, sunrise, sunset, temp, pressuer, wind, date, errStatus} = props.weather
    let content = null; 
    const cityName = city.charAt(0).toUpperCase() + city.slice(1);
    if (!err && city) {
        const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString()
        const sunsetTime = new Date(sunset * 1000).toLocaleTimeString()
        content = (
            <div className="result">
                <h3>Wyniki wyszukiwania dla <em>{cityName}</em></h3>  
                <h4>Dane dla dnia i odziny: {date}</h4>
                <h4>Aktualna temperatura: {temp} &#178;C</h4>
                <h4>Wschód słońca dzisiaj o {sunriseTime}</h4>  
                <h4>Zachód słońca dzisiaj o {sunsetTime}</h4>
                <h4>Aktualna siła wiatru {wind} m/s</h4>
                <h4>Aktualne ciśnienie {pressuer} hPa</h4>  
            </div>
        )
    }

    const status = errStatus === 404 ? `Nie mamy w bazie ${city}` : 'Nie można pobrać danych'
    return (
        <div className="result">
            {err ? status : content}
        </div>
       

    )
}

export default Result