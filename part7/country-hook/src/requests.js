import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";
const baseCountryUrl = "https://studies.cs.helsinki.fi/restcountries/api/name";

export const getCountries = () => {
  return axios.get(baseUrl, params);
};

export const getCountry = (country) => {
  return axios.get(`${baseCountryUrl}/${country}`);
};
