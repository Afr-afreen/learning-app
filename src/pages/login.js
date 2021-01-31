import React, { Component } from 'react';
import "../css/login.css";

class Login extends Component {
  state = {
    show: false,
    borderBottom: "3px solid rgb(155, 38, 155)",
    borderBottom1: "hidden",
    name: "",
    email: "",
    password: "",
    checked: "Student"
  }
  componentDidMount() {
    localStorage.removeItem("token");
    localStorage.removeItem("isFaculty");
  }
  handleBorder = () => {
    this.setState({
      borderBottom1: "hidden",
      borderBottom: "3px solid rgb(155, 38, 155)",
      show: false,
    })
  }

  handleBorder1 = () => {
    this.setState({
      borderBottom: "hidden",
      borderBottom1: "3px solid rgb(155, 38, 155)",
      show: true,
    })
  }

  Signup = () => {
    let resp = fetch("http://localhost:8001/students/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: this.state.name, email: this.state.email, password: this.state.password }),
    })
      .then((response) => resp = response.json())
    return resp;
  }

  handleSignup = async () => {
    let signupStatus = await this.Signup();
    if (!signupStatus.error) {
      this.setState({ name: "", email: "", password: "", show: false ,      borderBottom1: "hidden", borderBottom: "3px solid rgb(155, 38, 155)"});
    }
    else {
      alert("Email id already exist");
    }
  }

  loginRequest = async () => {
    let url = this.state.checked === "Student" ? "http://localhost:8001/students/login" : "http://localhost:8001/faculties/login";
    let resp = fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: this.state.email, password: this.state.password }),
    })
      .then((response) => resp = response.json())
    return resp;
  }

  handleLogin = async () => {
    let resp = await this.loginRequest();
    if (!resp.error) {
      console.log(resp.faculty);
      let routeTo = this.state.checked === "Student" ? "/studenthome" : "/facultyhome"
      localStorage.setItem("token", resp.token)
      localStorage.setItem("data", JSON.stringify(resp.student))
      localStorage.setItem("fdata", JSON.stringify(resp.faculty))
      this.props.history.push(routeTo);
    }
    else {
      alert("Invalid credentais")
    }
  }


  render() {
    return (
      <div className="log">
        <div className="login">
          <h2>ABC Learning</h2>
          <ul>
            <button onClick={this.handleBorder} style={{ borderBottom: this.state.borderBottom }}>SIGNIN</button>
            <button onClick={this.handleBorder1} style={{ borderBottom: this.state.borderBottom1 }} >SIGNUP</button>
          </ul>
          {this.state.show ? <div>
            <form>
              <input type="text" placeholder="Name" value={this.state.name || ""} onChange={(e) => this.setState({ name: e.target.value })}></input>
              <input type="text" placeholder="Email" value={this.state.email || ""} onChange={(e) => this.setState({ email: e.target.value })} ></input>
              <input type="password" placeholder="Password" value={this.state.password || ""} onChange={(e) => this.setState({ password: e.target.value })}></input>
            </form>
            <button className="signup" onClick={this.handleSignup}>SignUp</button>
          </div> :
            <div>
              <form>
                <div>
                  <input
                    name="checked"
                    type="radio"
                    checked={this.state.checked === "Student"}
                    onChange={() => this.setState({ checked: "Student" })}
                  />
                  <label>Student</label>
                  <input
                    name="checked"
                    type="radio"
                    checked={this.state.checked === "Faculty"}
                    onChange={() => this.setState({ checked: "Faculty" })}
                  />
                  <label>Faculty</label>
                </div>
                <input type="text" placeholder="Email" value={this.state.email || ""} onChange={(e) => this.setState({ email: e.target.value })}></input>
                <input type="password" placeholder="Password" value={this.state.password || ""} onChange={(e) => this.setState({ password: e.target.value })}></input>

              </form>
              <button className="loginbtn" onClick={this.handleLogin}>Login</button>
            </div>}
        </div>
      </div>
    );
  }
}

export default Login;