import "./styles.css";
import ContainerApp from "../../components/ContainerApp";
import InputSearch from "../../components/InputSearch";
import Logo from "../../assets/logo_whataweather.svg";
import { useContext, useEffect, useState } from "react";
import PlaceInfoContext from "../../context/placeInfo";
import { WeatherProps } from "../../types/weather";

export function Weather() {
  const { cityValue, setCityValue } = useContext(PlaceInfoContext);
  const [weather, setWeather] = useState<WeatherProps[]>([]);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    const url = `https://wttr.in/${cityValue}?format=j1`;
    //fetch weather
    fetch(url)
      .then((response) => response.json())
      .then((res) => setWeather(res.current_condition));
  }, [cityValue]);

  return (
    <>
      <h1>Temperatura</h1>
      <div>
        {weather &&
          weather.map((value) => (
            <p>
              temperatura: {value.temp_C} ºC - data/hora:{" "}
              {value.localObsDateTime}
            </p>
          ))}
      </div>
    </>
  );
}

// export default Home;
