import "./styles.css";

import { useContext, useEffect, useState } from "react";
import { WeatherProps } from "../../types/weather";
import { ImLocation2 } from "react-icons/im";
import { Redirect, useHistory } from "react-router-dom";

import PlaceInfoContext from "../../context/placeInfo";
import CloudLoading from "../../assets/cloudloading.gif";

export function Weather() {
    const { cityValue } = useContext(PlaceInfoContext);
    const [weather, setWeather] = useState<WeatherProps[]>([]);

    if (!cityValue) return <Redirect to={"/"} />;

    useEffect(() => {
        const weatherUrl = `https://wttr.in/${cityValue}?format=j1`;
        fetch(weatherUrl)
            .then((response) => response.json())
            .then((res) => setWeather(res.current_condition));
    }, [cityValue]);

    return (
        <>
            {weather.length === 0 ? (
                <div className="containerLoading">
                    <img src={CloudLoading} height={80} />
                </div>
            ) : (
                <>
                    <h1>Temperatura</h1>
                    <h3>
                        <ImLocation2 size={13} /> Local: {cityValue}
                    </h3>
                    <div>
                        {weather &&
                            weather.map((value) => (
                                <>
                                    <h3 className="temp-value">
                                        {value.temp_C} ºC
                                    </h3>
                                    <h4>{value.localObsDateTime}</h4>
                                </>
                            ))}
                    </div>
                </>
            )}
        </>
    );
}
