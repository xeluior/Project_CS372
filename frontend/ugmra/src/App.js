import React from "react";
import { BrowserRouter as Router, Routes, Route,Link} from "react-router-dom";
import Home from "./pages/home";
import Filter from "./pages/filter";
import Recommend from "./pages/recommend";
import Login from "./pages/login";
import "./App.css";

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/filter">Filter</Link>
          </li>
          <li>
            <Link to="/recommend">Recommend</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>

      <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route exact path="/filter" element={<Filter />}></Route> {/* might need to change exact path */}
      <Route exact path="/recommend" element={<Recommend/>}></Route>
      <Route exact path="/login" element={<Login/>}></Route>
      </Routes>
    </Router>
  );
};

export default App;


