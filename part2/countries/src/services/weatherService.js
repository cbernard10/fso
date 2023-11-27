import axios from "axios";

const getCityWeather = (lat, lon) => {
  const req = axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
  );
  return req.then((res) => {
    return {
      temp: res.data.current.temp - 273.15,
      wind: res.data.current.wind_speed,
    };
  });
};

export default {
    getCityWeather
}
