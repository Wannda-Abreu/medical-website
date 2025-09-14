import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SobreNosotros from "./pages/SobreNosotros";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
      </Routes>
    </BrowserRouter>
  );
}
