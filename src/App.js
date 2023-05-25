//router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

//components
import Home from "./pages/Home/Home";
import SkillDraw from "./pages/SkillDraw/SkillDraw";
import SimpleDraw from "./pages/SimpleDraw/SimpleDraw";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/skill-draw" element={<SkillDraw />} />
          <Route path="/simple-draw" element={<SimpleDraw />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
