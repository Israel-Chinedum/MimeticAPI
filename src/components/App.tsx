import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./LandingPage";
import { MockApp } from "./MockApp";
import "../CSS/App.css";

function App() {
  return (
    <Router>
      <div id="container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/mockapi" element={<MockApp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
