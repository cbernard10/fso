import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";
const countryUrl = "https://studies.cs.helsinki.fi/restcountries/api/name/";

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

const getCountry = (country) => {
  const req = axios.get(`${countryUrl}${country}`);
  return req.then((res) => res.data);
};

export default { getAll, getCountry }
