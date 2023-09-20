import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Filter from "./pages/filter";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/filter" element={<Filter />}></Route> {/* might need to change exact path */}
      </Routes>
    </Router>
  );
};

export default App;