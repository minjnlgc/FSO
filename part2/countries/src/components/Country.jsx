import { useState } from "react";
import CountryBasicData from "./CountryBasicData";

const Country = ({ country }) => {
    const [showCountryDetail, setShowCountryDetail] = useState(false);
    const name = country.name.common;
    const onClick = () => {
      setShowCountryDetail(!showCountryDetail);
    };
  
    return (
      <div key={name}>
        <p>
          {name} <button onClick={onClick}>View</button>
        </p>
        {showCountryDetail ? <CountryBasicData country={country} /> : null}
      </div>
    );
  };

export default Country