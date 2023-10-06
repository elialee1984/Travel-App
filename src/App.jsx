import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import './App.css'

const App = () => {
  const [countries, setCountries] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [hoveredCountry, setHoveredCountry] = useState(null);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const sortedData = data.sort((a, b) => a.name.common.localeCompare(b.name.common))
        const independentCountries = sortedData.filter(
          country => country.independent
        );
        const dependentCountries = sortedData.filter(
          country => !country.independent
        );
        setCountries(sortedData);
      } catch (error) {
        console.error(error);
      }
    };
    getCountries();
  }, [])


  const addToFavorites = (country) => {
    if (!favorites.some(favorite => favorite.name.common === country.name.common)) {
      setFavorites([...favorites, country]);
    }
  };

  const removeFromFavorites = (favorite) => {
    const index = favorites.indexOf(favorite);
    if (index !== -1) {
      favorites.splice(index, 1);
      setFavorites([...favorites]);
    }
  };

  const handleFlagMouseEnter = (country) => {
    setHoveredCountry(country);
  };

  const handleFlagMouseLeave = () => {
    setHoveredCountry(null);
  };

  return (
    <div className="App">
      <div>

        <h1>Elia's Travel App</h1>
        <span>Includes all independent & </span>
        <span style={{ color: "orange" }}>non-independent </span>
        <span> countries </span>
        <span style={{ fontWeight: "bold" }}>(hover over flag to view official name, population, continent, capital, demonym, languages, currencies, and see location on Google Maps)</span>
        {favorites.length > 0 && (
          <div>
            <h2 style={{ textDecorationLine: 'underline' }}>Favorite countries</h2>
            <h5>Click on flag to remove from favorites.</h5>
            <ul className="listOfFavorites">
              {favorites.sort((a, b) => a.name.common.localeCompare(b.name.common)).map((favorite) => (
                <li key={favorite.name.common} className="country">
                  <div className="flag"
                    onClick={() => removeFromFavorites(favorite)}
                    onMouseEnter={() => handleFlagMouseEnter(favorite)}
                    onMouseLeave={handleFlagMouseLeave}
                  >
                    {<img className="flagImage" src={favorite.flags.svg} alt={favorite.name.common} />}
                    <div className={favorite.independent ? "countryNameIndependent" : "countryNameDependent"}>{favorite.name.common}</div>
                    {hoveredCountry === favorite && (
                      <div className="tooltip">
                        <div style={{ "fontWeight": "bold" }}>Official name:</div>
                        <ul style={{ "textIndent": "-30px" }}>{hoveredCountry.name.official} (Pop.: {hoveredCountry.population.toLocaleString('en-US')})
                        </ul>
                        <div style={{ "fontWeight": "bold" }}>Continent/s:</div>
                        <ul style={{ "textIndent": "-30px" }}>
                          {hoveredCountry.continents ? hoveredCountry.continents.map((continent) => (
                            <li key={continent}>
                              <div>{continent}</div>
                            </li>
                          )) : 'none'}
                        </ul>
                        <div style={{ "fontWeight": "bold" }}>Capital:</div>
                        <ul style={{ "textIndent": "-30px" }}>
                          {hoveredCountry.capital ? hoveredCountry.capital.map((capitalo) => (
                            <li key={capitalo}>
                              <div>{capitalo}</div>
                            </li>
                          )) : 'none'}
                        </ul>
                        <div style={{ "fontWeight": "bold" }}>Demonym:</div>
                        <ul style={{ "textIndent": "-30px" }}>
                          {hoveredCountry.demonyms ? hoveredCountry.demonyms.eng.m : "none"}
                        </ul>
                        <div style={{ "fontWeight": "bold" }}>Language/s:</div>
                        <ul style={{ "textIndent": "-30px" }}>
                          {hoveredCountry.languages ? Object.keys(hoveredCountry.languages).map((language) => (
                            <li key={language}>{hoveredCountry.languages[language]}</li>
                          )) : "none"}
                        </ul>
                        <div style={{ "fontWeight": "bold" }}>Currency/currencies:</div>
                        <ul style={{ "textIndent": "-30px" }}>
                          {hoveredCountry.currencies ? Object.keys(hoveredCountry.currencies).map((currency) => (
                            <li key={currency}>{hoveredCountry.currencies[currency].name}, {hoveredCountry.currencies[currency].symbol}</li>
                          )) : "none"}
                        </ul>
                        <div>
                          <Link to={hoveredCountry.maps.googleMaps}
                            target="_blank"
                            onClick={(e) => e.stopPropagation()}
                            style={{ "textDecoration": 'none', "fontWeight": "bold" }}>
                            Location on Google Maps
                            <div>(command+click to open in a new tab)</div>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>

                </li>
              ))}
            </ul>
          </div>)}



        <h2 style={{ textDecorationLine: 'underline' }}>All countries</h2>
        <h5>Click on flag to add to favorites.</h5>
        <div className="first">

          <ul className="listOfCountries">
            {countries.map((country) => (
              <li key={country.cca2} className="country">
                <div
                  className="flag"
                  onClick={() => { addToFavorites(country) }}
                  onMouseEnter={() => handleFlagMouseEnter(country)}
                  onMouseLeave={handleFlagMouseLeave}
                >
                  {<img className="flagImage" src={country.flags.svg} alt={country.name.common} />}
                  <div className={country.independent ? "countryNameIndependent" : "countryNameDependent"}
                  >{country.name.common}</div>
                  {hoveredCountry === country && (
                    <div className="tooltip">
                      <div style={{ "fontWeight": "bold" }}>Official name:</div>
                      <ul style={{ "textIndent": "-30px" }}>{hoveredCountry.name.official} (Pop.: {hoveredCountry.population.toLocaleString('en-US')})
                      </ul>
                      <div style={{ "fontWeight": "bold" }}>Continent/s:</div>
                      <ul style={{ "textIndent": "-30px" }}>
                        {hoveredCountry.continents ? hoveredCountry.continents.map((continent) => (
                          <li key={continent}>
                            <div>{continent}</div>
                          </li>
                        )) : 'none'}
                      </ul>
                      <div style={{ "fontWeight": "bold" }}>Capital:</div>
                      <ul style={{ "textIndent": "-30px" }}>
                        {hoveredCountry.capital ? hoveredCountry.capital.map((capitalo) => (
                          <li key={capitalo}>
                            <div>{capitalo}</div>
                          </li>
                        )) : 'none'}
                      </ul>
                      <div style={{ "fontWeight": "bold" }}>Demonym:</div>
                      <ul style={{ "textIndent": "-30px" }}>
                        {hoveredCountry.demonyms ? hoveredCountry.demonyms.eng.m : "none"}
                      </ul>
                      <div style={{ "fontWeight": "bold" }}>Language/s:</div>
                      <ul style={{ "textIndent": "-30px" }}>
                        {hoveredCountry.languages ? Object.keys(hoveredCountry.languages).map((language) => (
                          <li key={language}>{hoveredCountry.languages[language]}</li>
                        )) : "none"}
                      </ul>
                      <div style={{ "fontWeight": "bold" }}>Currency/currencies:</div>
                      <ul style={{ "textIndent": "-30px" }}>
                        {hoveredCountry.currencies ? Object.keys(hoveredCountry.currencies).map((currency) => (
                          <li key={currency}>{hoveredCountry.currencies[currency].name}, {hoveredCountry.currencies[currency].symbol}</li>
                        )) : "none"}
                      </ul>
                      <div>
                        <Link to={hoveredCountry.maps.googleMaps}
                          target="_blank"
                          onClick={(e) => e.stopPropagation()}
                          style={{ "textDecoration": 'none', "fontWeight": "bold" }}>
                          Location on Google Maps
                          <div>(command+click to open in a new tab)</div>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>


                {/* <button
                  onClick={() => {
                    addToFavorites(country)
                  }}
                >
                  Add to Favorites
                </button> */}
              </li>
            ))}
          </ul>
        </div>



      </div>

    </div >
  );
};

export default App;