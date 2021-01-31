import React, { Component } from 'react';
import { withRouter } from "react-router";
import "../css/navbar.css";

class Navbar extends Component {

  handleLogOut = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isFaculty");
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="nav">
        <p>ABC Learning</p>
        <button onClick={this.handleLogOut}>Log out</button>
      </div>
    );
  }
}

export default withRouter(Navbar);