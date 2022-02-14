import react, { useEffect, useState } from "react";
import { PlaceProps } from "../../types/place";
import { WeatherProps } from "../../types/weather";

import "./styles.css";

const InputSearch = () => {
  const [weather, setWeather] = useState<WeatherProps[]>([]);
  const [place, setPlace] = useState<PlaceProps[]>([]);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [refrash, setRefrash] = useState<boolean>(false);
  const [cityValue, setCityValue] = useState<string>();
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
  }, [refrash]);

  console.log(place, "informações temperatura");
  return (
    <div>
      <h1>Digite sua cidade</h1>
      {/* <label>Digite Sua cidade</label> */}
      <input
        type="text"
        onChange={(e) => {
          setTimeout(() => handleInputChange(e), 1);
          setCityValue(e.target.value);
        }}
        onBlur={() => setTimeout(() => setIsActive(false), 200)}
        onClick={(e)=>setCityValue(e.currentTarget.value)} //verificar
        value={cityValue && cityValue}
      />
      {isActive && (
        <ul className="list">
          {place?.map((value) => (
            <li
              className="line-select"
              onClick={() => {
                setCityValue(value.value);
                setRefrash(!refrash);
              }}
            >
              {value.value}
            </li>
          ))}
        </ul>
      )}
      <div>
        {isActive === false && cityValue  &&
          weather?.map((value) => (
            <p>
              temperatura: {value.FeelsLikeC} ºC - data/hora:{" "}
              {value.localObsDateTime}
            </p>
          ))}
      </div>
    </div>
  );
};

export default InputSearch;
