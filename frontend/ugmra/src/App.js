import React from "react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Home from "./pages/home"
import Filter from "./pages/filter"
import Recommend from "./pages/recommend"
import Login from "./pages/login"
import Register from "./pages/register"
import "./App.css"

const linkStyle = {
  color: 'white'
}

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/" style={linkStyle}>Home</Link>
          </li>
          <li>
            <Link to="/filter" style={linkStyle}>Filter</Link>
          </li>
          <li>
            <Link to="/recommend" style={linkStyle}>Recommend</Link>
          </li>
          <li>
            <Link to="/login" style={linkStyle}>Login</Link>
          </li>
          <li>
            <Link to="/register" style={linkStyle}>Register</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/filter" element={<Filter />}></Route>
        <Route exact path="/recommend" element={<Recommend />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/register" element={<Register/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
