import react, { useContext, useEffect, useState } from "react";
import PlaceInfoContext from "../../context/placeInfo";
import { PlaceProps } from "../../types/place";
import { WeatherProps } from "../../types/weather";

import { BiSearchAlt2 } from "react-icons/bi";

import "./styles.css";

const InputSearch = () => {
  const [weather, setWeather] = useState<WeatherProps[]>([]);
  const [place, setPlace] = useState<PlaceProps[]>([]);

  const { cityValue, setCityValue } = useContext(PlaceInfoContext);

  const [isActive, setIsActive] = useState<boolean>(false);
  const handleInputChange = (e: any) => {
    e.preventDefault();
    const { value } = e.target;

    if (!value) return;

    const url = `https://wttr.in/${value}?format=j1`;
    fetch(url)
      .then((response) => response.json())
      .then((res) => setPlace([...place, res.nearest_area[0].region[0]]));
    setIsActive(true);
  };

  useEffect(() => {
    const url = `https://wttr.in/${cityValue}?format=j1`;
    //fetch weather
    fetch(url)
      .then((response) => response.json())
      .then((res) => setWeather(res.current_condition));
  }, [cityValue]);

  console.log(place, "Locais");
  console.log(cityValue, "Local selecionado");
  return (
    <div>
      <h1>Digite sua cidade</h1>
      <div className="container-input">
        <label htmlFor="" className="button-search">
          <BiSearchAlt2 color="white" size={30} />
        </label>
        <input
          type="text"
          onChange={(e) => {
            handleInputChange(e);
            // setTimeout(() => handleInputChange(e), 200);
            setCityValue(e.target.value);
          }}
          value={cityValue && cityValue}
          placeholder="Ex. Sao Paulo"
        />
      </div>
      {isActive && (
        <ul>
          {place?.map(
            (value, index) =>
              value.value !== "" && (
                <li
                  key={index + value.value}
                  className="line-select"
                  onClick={() => {
                    setCityValue(value.value);
                    setTimeout(() => setIsActive(false), 200);
                    setPlace([]);
                  }}
                  // onBlur={() => setIsActive(false)}
                >
                  {value.value}
                </li>
              )
          )}
        </ul>
      )}
      <div>
        {!!!isActive && !!cityValue
          ? weather &&
            weather.map((value) => (
              <p>
                temperatura: {value.temp_C} ºC - data/hora:{" "}
                {value.localObsDateTime}
              </p>
            ))
          : ""}
      </div>
    </div>
  );
};

export default InputSearch;
