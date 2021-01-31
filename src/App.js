import React, { Component } from 'react';
import {BrowserRouter as Router , Route} from "react-router-dom";
import Login from "./pages/login"
import StudentHome from "./pages/studenthome"
import FacultyHome from "./pages/facultyhome"

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route exact path="/" component={Login} />
          <Route exact path="/studenthome" component={StudentHome} />
          <Route exact path="/facultyhome" component={FacultyHome} />
        </Router>
      </div>
    );
  }
}

export default App;