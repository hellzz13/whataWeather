import "./styles.css";
import ContainerApp from "../../components/ContainerApp";
import InputSearch from "../../components/InputSearch";
import Logo from "../../assets/logo_whataweather.svg";

export function Home() {
  return (
    <ContainerApp>
      <img src={Logo} alt="Logo" />
      <InputSearch />
    </ContainerApp>
  );
}

// export default Home;
