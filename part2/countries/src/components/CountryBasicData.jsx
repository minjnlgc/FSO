import { useState } from "react";
import weatherService from "../services/weather";
import { useEffect } from "react";

const CountryBasicData = ({ country }) => {
  const [temp, setTemp] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [iconId, setIconId] = useState("");

  const [lat, lon] = Object.values(country.latlng);

  useEffect(() => {
    weatherService
      .getByLatAndLon(lat, lon)
      .then((data) => {
        setTemp(data.current.temp);
        setWindSpeed(data.current.wind_speed);
        setIconId(data.current.weather[0].icon);
      })
      .catch((error) => console.log("failed to fetch weather data!"));
  }, []);

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital[0]}</p>
      <p>Area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <img src={`${country.flags["png"]}`} alt="flag" />
      <h2>Weather in {country.capital[0]}</h2>
      <p>temperature {temp} Celcuis</p>
      <img
        src={`https://openweathermap.org/img/wn/${iconId}@2x.png`}
        alt="weather icon"
      />
      <p>wind {windSpeed} m/s</p>
    </>
  );
};

export default CountryBasicData;
