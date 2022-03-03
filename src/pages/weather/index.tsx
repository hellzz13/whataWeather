import "./styles.css";
import { useContext, useEffect, useState } from "react";
import PlaceInfoContext from "../../context/placeInfo";
import { WeatherProps } from "../../types/weather";

import { ImLocation2 } from "react-icons/im";

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
      <h3>
        <ImLocation2 size={13} /> Local: {cityValue}
      </h3>
      <div>
        {weather &&
          weather.map((value) => (
            <>
              <h3 className="temp-value">{value.temp_C} ºC</h3>
              <h4>{value.localObsDateTime}</h4>
            </>
          ))}
      </div>
    </>
  );
}

// export default Home;
