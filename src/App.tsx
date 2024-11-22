import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Setup from "./pages/Setup";
import Viewer from "./pages/Viewer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Setup />} />
        <Route path="/viewer" element={<Viewer />} />
      </Routes>
    </Router>
  );
}

export default App;
