import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./components/NavBar";
import { Data } from "./components/Data";

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Data />
    </div>
  );
}
export default App;
