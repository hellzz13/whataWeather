import "./styles.css";

import { useCallback, useContext, useState } from "react";

import { WeatherProps } from "../../types/weather";
import { BiSearchAlt2 } from "react-icons/bi";
import { PlaceProps } from "../../types/place";
import { Link } from "react-router-dom";

import PlaceInfoContext from "../../context/placeInfo";

const InputSearch = () => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [place, setPlace] = useState<PlaceProps[]>([]);

    const { cityValue, setCityValue } = useContext(PlaceInfoContext);

    const handleInputChange = useCallback(
        (e: any) => {
            e.preventDefault();
            const { value } = e.target;

            if (!value.length) return;

            const url = `https://wttr.in/${value}?format=j1`;
            fetch(url)
                .then((response) => response.json())
                .then((res) => {
                    if (
                        place.find(
                            (item) =>
                                item.value ===
                                res.nearest_area[0].region[0].value
                        )
                    )
                        return;
                    setPlace([...place, res.nearest_area[0].region[0]]);
                });
            setIsActive(true);
        },
        [place]
    );

    console.log(place, "Locais");
    console.log(cityValue, "Local selecionado");
    return (
        <div>
            <div className="container-input">
                <label>
                    <h2>Digite sua cidade</h2>
                </label>
                <input
                    type="text"
                    onChange={(e) => {
                        handleInputChange(e);
                        setTimeout(() => handleInputChange(e), 200);
                        setCityValue(e.target.value);
                    }}
                    onMouseUp={() => setPlace([])}
                    value={cityValue && cityValue}
                    placeholder="Ex. Sao Paulo"
                />
                <button className="button-search" disabled={!cityValue}>
                    <Link to={"/weather"}>
                        <BiSearchAlt2 color="white" size={25} />
                    </Link>
                </button>
            </div>
            {isActive && (
                <ul>
                    {place?.map(
                        (location, index) =>
                            location.value !== "" && (
                                <li
                                    key={index + location.value}
                                    className="line-select"
                                    onClick={() => {
                                        setCityValue(location.value);
                                        setTimeout(
                                            () => setIsActive(false),
                                            200
                                        );
                                        setPlace([]);
                                    }}
                                >
                                    {location.value}
                                </li>
                            )
                    )}
                </ul>
            )}
        </div>
    );
};

export default InputSearch;
