import React, { Component } from 'react';
import Navbar from "../components/navbar";
import "../css/student.css";
import Modal from "../components/modal";
import axios from "axios"

class StudentHome extends Component {
  state = {
    show: false,
    name: "",
    email: "",
    number: "",
    about: "",
    city: "",
    country: "",
    company: "",
    school: "",
    hometown: "",
    languages: "",
    gender: "",
    data: [],
    profile: [],
  }

  async componentDidMount() {
    const storage = localStorage.getItem("token");
    if (!storage || storage === null) {
      this.props.history.push("/");
    }
    else {
      await this.handleGetData();
      await this.getStudentProfile();
    }
  }

  async componentDidUpdate(prevState) {
    if (this.state.profile !== prevState.profile) {
      await this.getStudentProfile();
    }
  }

  handleGetData = () => {
    let resp = [];
    fetch("http://localhost:8001/students/courses/fetchAll", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => this.setState({ data }));
    return resp;
  }

  getStudentProfile = () => {
    let resp = [];
    fetch("http://localhost:8001/students/profile/view", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((profile) => this.setState({ profile }));
    return resp;
  }

  handleEditProfile = () => {
      let profile = this.state.profile
      this.setState({
        show: true,
        name: profile.name,
        email: profile.email,
        number: profile.phoneNumber,
        about: profile.aboutMe,
        city: profile.city,
        country: profile.country,
        company: profile.company,
        school: profile.school,
        hometown: profile.homeTown,
        languages: profile.languages,
        gender: profile.gender,
      })
  }

  handleModalClose = () => {
    this.setState({
      show: false,
      name: "",
      selectedFile: null,
      email: "",
      number: "",
      about: "",
      city: "",
      country: "",
      company: "",
      school: "",
      hometown: "",
      languages: "",
      gender: "",
    })
  }

  handleAdd = (course) => {
    let datas = localStorage.getItem("data")
    let resp = fetch("http://localhost:8001/students/courses/enroll", {
      method: "post",
      headers: {  Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
      body: JSON.stringify({_id: datas._id, course: course}),
    })
      .then((response) => resp = response.json())
      .then(alert("Course applied successfully!"))
      .catch((e) => resp = e.message)
    return resp;
  }

  handleSave = () => {
    let resp = fetch("http://localhost:8001/students/profile/update", {
      method: "PATCH",
      headers: {  Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.name, 
        email: this.state.email, 
        phoneNumber: this.state.number, 
        aboutMe: this.state.about,
        city: this.state.city,
        country: this.state.country,
        company: this.state.company,
        school: this.state.school,
        homeTown: this.state.hometown,
        languages: this.state.languages,
        gender: this.state.gender
      }),
    })
      .then((response) => resp = response.json())
      .catch((e) => resp = e.message)
      this.handleClear()
      this.setState({show: false})
    return resp;
  }

  handleClear = () => {
    this.setState({
      name: "",
      selectedFile: null,
      email: "",
      number: "",
      about: "",
      city: "",
      country: "",
      company: "",
      school: "",
      hometown: "",
      languages: "",
      gender: "",
    })
  }

  render() {
    let datas = JSON.parse(localStorage.getItem("data"))
    return (
      <div>
        <Navbar />
        <div className="main">
          <h2>Welcome {datas.name}!</h2>  {/*map student name*/}
          <div className="img">
            <button onClick={this.handleEditProfile}>Edit</button>
          </div>
          {/*map course details*/}
          <div className="cardContainer">
            {this.state.data.map((course, i) => (
              <div className="card" key={i}>
                <ul>
                  <li>Catogory:{course.courseDept}</li>
                  <li>Course Name:{course.courseName}</li>
                  <li>Course Discription:{course.description}</li>
                  <li>Course Room:{course.courseRoom}</li>
                  <li>Course Team:{course.courseTeam}</li>
                  <li><button onClick={() => this.handleAdd(course)}>Apply</button></li>
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* modal */}

        {this.state.show ?
          <Modal>
            <div className="modal">
              <div className="bg"></div>
              <div className="pop">
                <p>Edit Profile</p>
                <button className="close" onClick={this.handleModalClose}>X</button>
                <form name="validation">
                  <label>Name</label>
                  <input type="text" name="name" value={this.state.name || ""} onChange={(e) => this.setState({name: e.target.value})} />
                  <label>Email</label>
                  <input type="email" name="email" value={this.state.email || ""} onChange={(e) => this.setState({email: e.target.value})} />
                  <label>Number</label>
                  <input type="number" name="number" value={this.state.number || ""} onChange={(e) => this.setState({number: e.target.value})} />
                  <label>About Me</label>
                  <textarea className="textarea" name="about" value={this.state.about || ""} onChange={(e) => this.setState({about: e.target.value})} /> {/*if needed add new function*/}
                  <label>City</label>
                  <input type="text" name="city" value={this.state.city || ""} onChange={(e) => this.setState({city: e.target.value})} />
                  <label>Country</label>
                  <input type="text" name="country" value={this.state.country || ""} onChange={(e) => this.setState({country: e.target.value})} />
                  <label>Comapany</label>
                  <input type="text" name="company" value={this.state.company || ""} onChange={(e) => this.setState({company: e.target.value})} />
                  <label>School</label>
                  <input type="text" name="school" value={this.state.school || ""} onChange={(e) => this.setState({school: e.target.value})} />
                  <label>Home Town</label>
                  <input type="text" name="hometown" value={this.state.hometown || ""} onChange={(e) => this.setState({hometown: e.target.value})} />
                  <label>Languages</label>
                  <input type="text" name="languages" value={this.state.languages || ""} onChange={(e) => this.setState({languages: e.target.value})} />
                  <label>Gender</label>
                  <input type="text" name="gender" value={this.state.gender || ""} onChange={(e) => this.setState({gender: e.target.value})} />
                </form>
                <button className="save" type="submit" onClick={this.handleSave} >Save</button>
                <button className="clear" type="reset" onClick={this.handleClear} >Clear</button>
              </div>
            </div>
          </Modal> : null}
      </div>
    );
  }
}

export default StudentHome;