import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { Link } from "react-router-dom";
import './App.css'

const App = () => {
  const [countries, setCountries] = useState([]);
  const [territories, setTerritories] = useState([]);
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
        // setCountries(independentCountries);
        setCountries(sortedData);
        // console.log(independentCountries);
        setTerritories(dependentCountries);
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
    // console.log("favorites before splice", favorites);
    if (index !== -1) {
      // console.log("index", index);
      // console.log("favorite", favorite);
      favorites.splice(index, 1);
      // console.log("favoritesTwo", favoritesTwo);
      setFavorites([...favorites]);
      // console.log("favorites after splice", favorites);
    }
  };

  const handleFlagMouseEnter = (country) => {
    setHoveredCountry(country);
  };

  const handleFlagMouseLeave = () => {
    setHoveredCountry(null);
  };

  // const div = useRef();

  // useLayoutEffect(() => {
  //   // console.log(div);
  //   const divAnimate = div.current.getBoundingClientRect().top;
  //   console.log(divAnimate);
  //   const onScroll = () => {
  //     if (divAnimate < window.scrollY) {
  //       // console.log("ok");
  //       div.current.style.position = "fixed";
  //       div.current.style.top = 0;
  //       div.current.style.left = 0;
  //     } else {
  //       div.current.style.position = "relative";
  //     }
  //   };
  //   window.addEventListener("scroll", onScroll);
  //   return () => window.removeEventListener("scroll", onScroll);
  // }, []);


  return (
    <div className="App">
      <div>

        {/* <div className="second"> */}
        {/* <div ref={div} className="inside"> */}
        {/* style = {"fontWeight": "bold"} */}
        <h1>Elia's Travel App</h1>
        <span>Includes all independent & </span>
        <span style={{ color: "orange" }}>non-independent </span>
        <span> countries </span>
        <span style={{ fontWeight: "bold" }}>(hover over flag to view official name, population, capital, demonym, languages, currencies, and see location on Google Maps)</span>
        {favorites.length > 0 && (
          <div>
            <h2 style={{ textDecorationLine: 'underline' }}>Favorite countries</h2>
            <h5>Click on flag to remove from favorites.</h5>
            <ul className="listOfFavorites">
              {/* {console.log(favorites.sort((a, b) => a.name.common.localeCompare(b.name.common)))} */}
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
                        <div style={{ "fontWeight": "bold" }}>Capital:</div>
                        <ul style={{ "textIndent": "-30px" }}>
                          {hoveredCountry.capital ? hoveredCountry.capital : 'none'}
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
                      removeFromFavorites(favorite)
                    }}
                  >
                    Remove from Favorites
                  </button> */}
                </li>
              ))}
            </ul>
          </div>)}


        {/* </div> */}
        {/* </div> */}

        <h2 style={{ textDecorationLine: 'underline' }}>All countries</h2>
        <h5>Click on flag to add to favorites.</h5>
        <div className="first">

          <ul className="listOfCountries">
            {countries.map((country) => (
              <li key={country.cca2} className="country">
                <div
                  className="flag"
                  // title={`Capital: ${country.capital}`}
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
                      <div style={{ "fontWeight": "bold" }}>Capital:</div>
                      <ul style={{ "textIndent": "-30px" }}>
                        {hoveredCountry.capital ? hoveredCountry.capital : 'none'}
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