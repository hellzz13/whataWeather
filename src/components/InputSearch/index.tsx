import react, { useState } from "react";

type WeatherProps = {
  FeelsLikeC: string;
  FeelsLikeF: string;
  cloudcover: string;
  humidity: string;
  localObsDateTime: string;
  observation_time: string;
  precipInches: string;
  precipMM: string;
  pressure: string;
  pressureInches: string;
  temp_C: string;
  temp_F: string;
  uvIndex: string;
  visibility: string;
  visibilityMiles: string;
  weatherCode: string;

  nearest_area: [
    {
      region: [
        {
          value: string;
        }
      ];
    }
  ];
};

const InputSearch = () => {
  const [weather, setWeather] = useState<WeatherProps[]>([]);
  const handleInputChange = (e: any) => {
    e.preventDefault();
    // console.log(e.target.value);
    
    const { value } = e.target;

    if (!value) return;

    const url = `http://wttr.in/${value}?format=j1`;
    fetch(url)
      .then((response) => response.json())
      .then((res) => setWeather(res.current_condition));
  };

  console.log(weather, "temperatura C");
  return (
    <div>
      <input type="text" onChange={ (e) =>
        setTimeout(()=>handleInputChange(e), 300)
        } />
      <ul>
        {weather?.map((value) => (
          <li>temperatura: {value.FeelsLikeC} ºC - data/hora: {value.localObsDateTime}</li>
        ))}
      </ul>
    </div>
  );
};

export default InputSearch;
