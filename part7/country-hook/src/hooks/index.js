import { useEffect, useState } from "react";
import countryService from "../services/countries";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchCountryByName = async (name) => {
      if (name !== "") {
        try {
          const countryResponse = await countryService.getByName(name);
          const fetchedCountryData = {
            found: true,
            data: {
              name: countryResponse.name["common"],
              capital: countryResponse.capital.join(", "),
              population: countryResponse.population,
              flag: countryResponse.flags.png,
            },
          };
          setCountry(fetchedCountryData);

        } catch (error) {
          setCountry({
            found: false,
            data: null,
          });
        }
      }
    };

    fetchCountryByName(name);
  }, [name]);

  return country;
};
