import "./App.css";
import ContainerApp from "./components/ContainerApp";
import InputSearch from "./components/InputSearch";
import Logo from "./assets/logo_whataweather.svg";

function App() {
  return (
    <div className="App">
      <ContainerApp>
        <img src={Logo} alt="Logo" />
        <InputSearch />
      </ContainerApp>
    </div>
  );
}

export default App;
