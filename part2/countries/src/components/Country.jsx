import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import countriesService from "../services/countriesService";
import weatherService from "../services/weatherService";

function Country({ country, startCollapsed }) {
  const [show, setShow] = useState(!startCollapsed);
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = () => { // only when "show" button is pressed, or when country is the only result of the search (start visible)
    countriesService
      .getCountry(country.name.common)
      .then((res) => {
        return {
          lat: res.latlng[0],
          lon: res.latlng[1],
        };
      })
      .then((latlon) =>
        weatherService
          .getCityWeather(latlon["lat"], latlon["lon"])
          .then((res) => setWeatherData(res))
      );
  };

  const handleShow = () => { // button pressed -> expand country data and fetch weather
    setShow(true);
    if (weatherData === null) {
      fetchWeatherData();
    }
  };

  useEffect(() => { // if country is appears as single result of search, it is visible, so data must be fetched after mounting.
    if (!startCollapsed) {
      fetchWeatherData();
    }
  }, []);

  return (
    <>
      {show ? (
        <div>
          <h1>
            {country.name.common}
            <button onClick={() => setShow(!show)}>hide</button>
          </h1>
          <p>capital: {country.capital[0]}</p>
          <p>area: {country.area}</p>
          <div>
            <h2>languages:</h2>
            <ul>
              {Object.values(country.languages).map((lang) => (
                <li key={lang}>{lang}</li>
              ))}
            </ul>
          </div>
          <img src={country.flags.svg} width={200} alt="country flag" />
          <h2>Weather in {country.capital[0]}</h2>
          <div>
            <p>Temperature: {weatherData?.temp.toFixed(2)} °C</p>
            <p>Wind speed: {weatherData?.wind} m/s</p>
          </div>
        </div>
      ) : (
        <p>
          {country.name.common}
          <button onClick={handleShow}>show</button>
        </p>
      )}
    </>
  );
}

export default Country;
