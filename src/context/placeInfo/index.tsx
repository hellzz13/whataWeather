import React, { createContext, useState } from "react";

// tipando props do contexto
type PlaceInfoContextProps = {
    cityValue: string | undefined;
    setCityValue: (state: string) => void;
};

const DEFAULT_VALUE = {
    cityValue: "",
    setCityValue: () => {},
};

// criando nosso contexto UserContext
const PlaceInfoContext = createContext<PlaceInfoContextProps>(DEFAULT_VALUE);

const PlaceInfoContextProvider: React.FC = ({ children }) => {
    const [cityValue, setCityValue] = useState(DEFAULT_VALUE.cityValue);

    return (
        <PlaceInfoContext.Provider
            value={{
                cityValue,
                setCityValue,
            }}
        >
            {children}
        </PlaceInfoContext.Provider>
    );
};

export { PlaceInfoContextProvider };
export default PlaceInfoContext;
