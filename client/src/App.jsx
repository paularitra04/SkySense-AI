import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Maps from "./pages/Maps";
import About from "./pages/About";
import StormMap from "./components/StormMap";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Normal Maps page */}
        <Route path="/maps" element={<Maps />} />

        {/* Live Storm Map */}
        <Route path="/storms" element={<StormMap />} />

        {/* About */}
        <Route path="/about" element={<About />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;