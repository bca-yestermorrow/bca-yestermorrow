import Landing from "./components/Landing"
import './App.css';
import Map from "./components/Map";

import "leaflet/dist/leaflet.css";



function App() {
  return (
    <div>
      <div>
      <Map />
      <Landing/>
      </div>
    </div>
  );
}

export default App;
