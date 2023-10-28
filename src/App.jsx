import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import './App.css'

const App = () => {
  const [countries, setCountries] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [selectedContinents, setSelectedContinents] = useState([]);
  const [showDependent, setShowDependent] = useState(true);
  const [showIndependent, setShowIndependent] = useState(true);



  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const sortedData = data.sort((a, b) => a.name.common.localeCompare(b.name.common))
        // const independentCountries = sortedData.filter(
        //   country => country.independent
        // );
        // const dependentCountries = sortedData.filter(
        //   country => !country.independent
        // );
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

  const addToAllCountries = (country) => {
    setCountries([...countries, country].sort((a, b) => a.name.common.localeCompare(b.name.common)));
  };

  const removeFromFavorites = (favorite) => {
    const index = favorites.indexOf(favorite);
    if (index !== -1) {
      favorites.splice(index, 1);
      setFavorites([...favorites]);
    }
  };

  const removeFromAllCountries = (country) => {
    const index = countries.indexOf(country);
    if (index !== -1) {
      countries.splice(index, 1);
      setCountries([...countries]);
    }
  };

  const handleFlagMouseEnter = (country) => {
    setHoveredCountry(country);
  };

  const handleFlagMouseLeave = () => {
    setHoveredCountry(null);
  };

  const flagsBorders = (country) => {
    const continentMappings = {
      Asia: "countries_border_asia",
      "North America": "countries_border_northAmerica",
      "South America": "countries_border_southAmerica",
      Europe: "countries_border_europe",
      Africa: "countries_border_africa",
      Oceania: "countries_border_oceania",
      Antarctica: "countries_border_antarctica",
    };

    let continent = "";

    if (Array.isArray(country.continents) && country.continents.length === 1) {
      const continentName = country.continents[0];
      continent = continentMappings[continentName] || "";
    } else if (Array.isArray(country.continents) && country.continents.length === 2 && country.continents[0] === "Europe") {
      continent = "countries_border_eurasia";
    }

    return `flagImage ${continent}`;
  };


  const handleContinentClick = (continentName) => {
    if (selectedContinents.includes(continentName)) {
      setSelectedContinents(selectedContinents.filter((continent) => continent !== continentName));
    } else {
      setSelectedContinents([...selectedContinents, continentName]);
    }
  };



  return (
    <div className="App">
      <div>
        <h1>Elia's Geography App</h1>
        <h6 style={{color: "red", fontStyle: "italic"}}>[Best viewd in Dark Mode!]</h6>
        <div>
          <span>Includes all </span>
          <span style={{ color: 'turquoise' }}>independent </span>
          <span>& </span>
          <span style={{ color: "orange" }}>non-independent </span>
          <span> countries </span>
          <div style={{ fontWeight: "bold" }}>Hover over flag for more country details, including location on Google Maps.</div>
        </div>
        <br />
        <div>
          <label>
            <input
              type="checkbox"
              checked={showIndependent}
              onChange={() => setShowIndependent(!showIndependent)}
            />
            Show <span style={{ color: 'turquoise' }}>independent </span>sovereign countries
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={showDependent}
              onChange={() => setShowDependent(!showDependent)}
            />
            Show <span style={{ color: "orange" }}>dependent </span>territories (regions that fall under the sovereignity of another country)
          </label>
        </div>
        <div className='continentFilter'>
          <span style={{ fontStyle: 'italic' }}>Filter by continent: </span>
          <span
            className={`countries_border_africa ${selectedContinents.includes('Africa') ? 'selected' : ''
              }`}
            onClick={() => handleContinentClick('Africa')}
            style={{
              borderWidth: '2px',
              borderRadius: '5px',
              padding: '2px',
              cursor: 'pointer',
              backgroundColor: selectedContinents.includes('Africa')
                ? 'grey'
                : 'transparent',
            }}
          >
            Africa
          </span>
          <span> </span>
          <span
            className={`countries_border_northAmerica ${selectedContinents.includes('North America') ? 'selected' : ''
              }`}
            onClick={() => handleContinentClick('North America')}
            style={{
              borderWidth: '2px',
              borderRadius: '5px',
              padding: '2px',
              cursor: 'pointer',
              backgroundColor: selectedContinents.includes('North America')
                ? 'grey'
                : 'transparent',
            }}
          >
            North America
          </span>
          <span> </span>
          <span
            className={`countries_border_southAmerica ${selectedContinents.includes('South America') ? 'selected' : ''
              }`}
            onClick={() => handleContinentClick('South America')}
            style={{
              borderWidth: '2px',
              borderRadius: '5px',
              padding: '2px',
              cursor: 'pointer',
              backgroundColor: selectedContinents.includes('South America')
                ? 'grey'
                : 'transparent',
            }}
          >
            South America
          </span>
          <span> </span>
          <span
            className={`countries_border_antarctica ${selectedContinents.includes('Antarctica') ? 'selected' : ''
              }`}
            onClick={() => handleContinentClick('Antarctica')}
            style={{
              borderWidth: '2px',
              borderRadius: '5px',
              padding: '2px',
              cursor: 'pointer',
              backgroundColor: selectedContinents.includes('Antarctica')
                ? 'grey'
                : 'transparent',
            }}
          >
            Antarctica
          </span>
          <span> </span>
          <span
            className={`countries_border_asia ${selectedContinents.includes('Asia') ? 'selected' : ''
              }`}
            onClick={() => handleContinentClick('Asia')}
            style={{
              borderWidth: '2px',
              borderRadius: '5px',
              padding: '2px',
              cursor: 'pointer',
              backgroundColor: selectedContinents.includes('Asia')
                ? 'grey'
                : 'transparent',
            }}
          >
            Asia
          </span>
          <span> </span>
          <span
            className={`countries_border_europe ${selectedContinents.includes('Europe') ? 'selected' : ''
              }`}
            onClick={() => handleContinentClick('Europe')}
            style={{
              borderWidth: '2px',
              borderRadius: '5px',
              padding: '2px',
              cursor: 'pointer',
              backgroundColor: selectedContinents.includes('Europe')
                ? 'grey'
                : 'transparent',
            }}
          >
            Europe
          </span>
          <span> </span>
          <span
            className={`countries_border_oceania ${selectedContinents.includes('Oceania') ? 'selected' : ''
              }`}
            onClick={() => handleContinentClick('Oceania')}
            style={{
              borderWidth: '2px',
              borderRadius: '5px',
              padding: '2px',
              cursor: 'pointer',
              backgroundColor: selectedContinents.includes('Oceania')
                ? 'grey'
                : 'transparent',
            }}
          >
            Oceania
          </span>
        </div>




        {favorites.length > 0 && (
          <div>
            <h2 style={{ textDecorationLine: 'underline' }}>Favorite countries</h2>
            <h5>Click on flag to remove from favorites.</h5>
            <ul className="listOfFavorites">
              {favorites
                .filter((favorite) => {
                  if (selectedContinents.length === 0) return true;
                  return favorite.continents.some((continent) =>
                    selectedContinents.includes(continent)
                  );
                })
                .filter((favorite) => {
                  return (
                    (showIndependent && favorite.independent) ||
                    (showDependent && !favorite.independent)
                  );
                })
                .sort((a, b) => a.name.common.localeCompare(b.name.common))
                .map((favorite) => (
                  <li key={favorite.name.common} className="country">
                    <div className="flag"
                      onClick={() => { removeFromFavorites(favorite); addToAllCountries(favorite) }}
                      onMouseEnter={() => handleFlagMouseEnter(favorite)}
                      onMouseLeave={handleFlagMouseLeave}
                    >
                      {<img className={flagsBorders(favorite)} src={favorite.flags.svg} alt={favorite.name.common} />}
                      <div className={favorite.independent ? "countryNameIndependent" : "countryNameDependent"}>{favorite.name.common}</div>
                      {hoveredCountry === favorite && (
                        <div className="tooltip">
                          <div style={{ fontWeight: "bold" }}>Official name:</div>
                          <ul style={{ textIndent: "-30px" }}>{hoveredCountry.name.official} (Pop.: {hoveredCountry.population.toLocaleString('en-US')})
                          </ul>
                          <div style={{ fontWeight: "bold" }}>Continent/s:</div>
                          <ul style={{ textIndent: "-30px" }}> {hoveredCountry.continents ? hoveredCountry.continents.map((continent) => (
                            <li key={continent}>
                              <div>{continent} {hoveredCountry.subregion && hoveredCountry.subregion != continent ? <span>({hoveredCountry.subregion})</span> : ""}</div>
                            </li>
                          )) : 'none'}
                          </ul>
                          <div style={{ fontWeight: "bold" }}>Capital:</div>
                          <ul style={{ textIndent: "-30px" }}> {hoveredCountry.capital ? hoveredCountry.capital.map((capitalo) => (
                            <li key={capitalo}>
                              <div>{capitalo}</div>
                            </li>
                          )) : 'none'}
                          </ul>
                          <div style={{ fontWeight: "bold" }}>Demonym:</div>
                          <ul style={{ textIndent: "-30px" }}>
                            {hoveredCountry.demonyms ? hoveredCountry.demonyms.eng.m : "none"}
                          </ul>
                          <div style={{ fontWeight: "bold" }}>Language/s:</div>
                          <ul style={{ textIndent: "-30px" }}>
                            {hoveredCountry.languages ? Object.keys(hoveredCountry.languages).map((language) => (
                              <li key={language}>{hoveredCountry.languages[language]}</li>
                            )) : "none"}
                          </ul>
                          <div style={{ fontWeight: "bold" }}>Currency/currencies:</div>
                          <ul style={{ textIndent: "-30px" }}>
                            {hoveredCountry.currencies ? Object.keys(hoveredCountry.currencies).map((currency) => (
                              <li key={currency}>{hoveredCountry.currencies[currency].name}, {hoveredCountry.currencies[currency].symbol}</li>
                            )) : "none"}
                          </ul>
                          <div>
                            <Link to={hoveredCountry.maps.googleMaps}
                              target="_blank"
                              onClick={(e) => e.stopPropagation()}
                              style={{ "textDecoration": 'none', fontWeight: "bold" }}>
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
          </div>
        )}


        <h2 style={{ textDecorationLine: 'underline' }}>All countries</h2>
        <h5>Click on flag to add to favorites.</h5>

        <ul className="listOfCountries">
          {countries
            .filter((country) => {
              if (selectedContinents.length === 0) return true;
              return country.continents.some((continent) =>
                selectedContinents.includes(continent)
              );
            })
            .filter((country) => {
              return (
                (showIndependent && country.independent) ||
                (showDependent && !country.independent)
              );
            })
            .map((country) => (
              <li key={country.cca2} className="country">
                <div
                  className="flag"
                  onClick={() => { addToFavorites(country); removeFromAllCountries(country) }}
                  onMouseEnter={() => handleFlagMouseEnter(country)}
                  onMouseLeave={handleFlagMouseLeave}
                >
                  {<img className={flagsBorders(country)} src={country.flags.svg} alt={country.name.common} />}
                  <div className={country.independent ? "countryNameIndependent" : "countryNameDependent"}>
                    {country.name.common}
                  </div>
                  {hoveredCountry === country && (
                    <div className="tooltip">
                      <div style={{ fontWeight: "bold" }}>Official name:</div>
                      <ul style={{ textIndent: "-30px" }}>{hoveredCountry.name.official} (Pop.: {hoveredCountry.population.toLocaleString('en-US')})
                      </ul>
                      <div style={{ fontWeight: "bold" }}>Continent/s:</div>
                      <ul style={{ textIndent: "-30px" }}> {hoveredCountry.continents ? hoveredCountry.continents.map((continent) => (
                        <li key={continent}>
                          <div>{continent} {hoveredCountry.subregion && hoveredCountry.subregion != continent ? <span>({hoveredCountry.subregion})</span> : ""}</div>
                        </li>
                      )) : 'none'}
                      </ul>
                      <div style={{ fontWeight: "bold" }}>Capital:</div>
                      <ul style={{ textIndent: "-30px" }}> {hoveredCountry.capital ? hoveredCountry.capital.map((capitalo) => (
                        <li key={capitalo}>
                          <div>{capitalo}</div>
                        </li>
                      )) : 'none'}
                      </ul>
                      <div style={{ fontWeight: "bold" }}>Demonym:</div>
                      <ul style={{ textIndent: "-30px" }}>
                        {hoveredCountry.demonyms ? hoveredCountry.demonyms.eng.m : "none"}
                      </ul>
                      <div style={{ fontWeight: "bold" }}>Language/s:</div>
                      <ul style={{ textIndent: "-30px" }}>
                        {hoveredCountry.languages ? Object.keys(hoveredCountry.languages).map((language) => (
                          <li key={language}>{hoveredCountry.languages[language]}</li>
                        )) : "none"}
                      </ul>
                      <div style={{ fontWeight: "bold" }}>Currency/currencies:</div>
                      <ul style={{ textIndent: "-30px" }}>
                        {hoveredCountry.currencies ? Object.keys(hoveredCountry.currencies).map((currency) => (
                          <li key={currency}>{hoveredCountry.currencies[currency].name}, {hoveredCountry.currencies[currency].symbol}</li>
                        )) : "none"}
                      </ul>
                      <div>
                        <Link to={hoveredCountry.maps.googleMaps}
                          target="_blank"
                          onClick={(e) => e.stopPropagation()}
                          style={{ textDecoration: 'none', fontWeight: "bold" }}>
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
      </div>
    </div>
  );
};

export default App;