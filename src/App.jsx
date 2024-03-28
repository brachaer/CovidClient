import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import AddClientForm from "./pages/AddClientForm/AddClientForm";
import CovidPage from "./pages/CovidPage/CovidPage";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/add-client" className="nav-link">
                Add Client
              </Link>
            </li>
            <li>
              <Link to="/covid" className="nav-link">
                Covid Data
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/covid" element={<CovidPage />} />
          <Route path="/add-client" element={<AddClientForm />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
