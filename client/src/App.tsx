import React from "react";
import "./App.css";
import { MDBCol } from "mdbreact";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./components/login";

function App() {
  return (
    <Router>
      <div className="App">
        <MDBCol md="6">
          <button className="logIn-button">
            <Link to="/login">Login</Link>
          </button>
          <input
            className="form-control search-bar"
            type="text"
            placeholder="Search"
            aria-label="Search"
          />
        </MDBCol>
        <Route path="/login" component={Login} />
      </div>
    </Router>
  );
}

export default App;
