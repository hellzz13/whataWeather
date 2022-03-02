import react, { ReactNode, useContext, useEffect, useState } from "react";

import "./styles.css";

type ContainerProps = {
  children?: ReactNode;
};

const ContainerApp = ({ children }: ContainerProps) => {
  return <div className="container">{children}</div>;
};

export default ContainerApp;
