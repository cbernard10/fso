import { useEffect } from "react";
import { useState } from "react";

import Country from "./components/Country";

import countriesServices from "./services/countriesService";

function App() {
  const [search, setSearch] = useState(null);
  const [countries, setCountries] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    countriesServices
      .getAll()
      .then((res) => setCountries(res))
      .catch((err) => console.log("could not fetch countries"));
  }, []);

  const handleSearch = (event) => {
    const newSearch = event.target.value;
    const newSearchResults = countries.filter((country) =>
      country.name.common.toLowerCase().includes(newSearch.toLowerCase())
    );

    setSearch(event.target.value);
    setSearchResults(newSearchResults);
  };

  return (
    <div>
      <p>find countries</p>
      <input onChange={handleSearch}></input>
      <div>
        {searchResults.length > 10 ? (
          "Too many matches, specify another filter"
        ) : searchResults.length === 1 ? (
          <Country country={searchResults[0]} startCollapsed={false} />
        ) : (
          searchResults.map((country, idx) => (
            <Country key={country.name.common} country={country} startCollapsed={true} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
