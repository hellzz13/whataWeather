import react, { useEffect, useState } from "react";
import { PlaceProps } from "../../types/place";
import { WeatherProps } from "../../types/weather";

import "./styles.css";

const InputSearch = () => {
  const [weather, setWeather] = useState<WeatherProps[]>([]);
  const [place, setPlace] = useState<PlaceProps[]>([]);
  const [cityValue, setCityValue] = useState<string>("");

  // const [refresh, setRefresh] = useState<boolean>(false);
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

      <input
        type="text"
        onChange={(e) => {
          handleInputChange(e);
          // setTimeout(() => handleInputChange(e), 200);
          setCityValue(e.target.value);
        }}
        value={cityValue}
        // onBlur={() => setIsActive(false)}
      />
      {isActive && (
        <ul className="list">
          {place?.map((value, index) => (
            <li
              key={index + value.value}
              className="line-select"
              onClick={() => {
                setCityValue(value.value);
                setTimeout(() => setIsActive(false), 200);
                setPlace([]);
              }}
            >
              {value.value}
            </li>
          ))}
        </ul>
      )}
      <div>
        {isActive === false && cityValue
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
