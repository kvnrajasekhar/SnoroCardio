import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Forgotpass from "./Components/Forgotpass";
import HomeScreen from "./Components/HomeScreen";
import VitalsGraphScreen from "./Components/VitalsGraphScreen";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<Forgotpass />} />
          <Route path="home" element={<HomeScreen />} />
          <Route path="graph" element={<VitalsGraphScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
