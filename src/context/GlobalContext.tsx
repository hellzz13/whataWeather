import React from "react";

import { PlaceInfoContextProvider } from "./placeInfo";

const Globalcontext: React.FC = ({ children }) => {
  return <PlaceInfoContextProvider>{children}</PlaceInfoContextProvider>;
};

export default Globalcontext;
