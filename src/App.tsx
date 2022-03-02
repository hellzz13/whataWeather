import "./App.css";
import ContainerApp from "./components/ContainerApp";
import InputSearch from "./components/InputSearch";

function App() {
  return (
    <div className="App">
      <ContainerApp>
        <InputSearch />
      </ContainerApp>
    </div>
  );
}

export default App;
