import React, { Component } from 'react';
import Navbar from "../components/navbar";
import "../css/faculty.css";
import Modal from "../components/modal"

class FacultyHome extends Component {
  state = {
    show: false,
    name: "",
    department: "",
    description: "",
    room: "",
    waitlist: "",
    team: "",
    data: [],
  }
  componentDidMount = async() => {
    const storage = localStorage.getItem("token");
    if (!storage || storage === null) {
      this.props.history.push("/");
    }
    else {
      await this.handleGetData();
    }
  }

  handleGetData = () => {
    let resp = [];
    fetch("http://localhost:8001/faculties/courses/fetch", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => this.setState({ data }));
    return resp;
  }

  handleAddCourse = () => {
    this.setState({
      show: true
    })
  }

  handleModalClose = () => {
    this.setState({
      show: false
    })
  }

  handleSave = () => {
    let resp = fetch("http://localhost:8001/faculties/courses/add", {
      method: "post",
      headers: {  Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        courseName: this.state.name, 
        courseDept: this.state.department, 
        description: this.state.description,
        waitlistCapacity: this.state.waitlist,
        courseRoom: this.state.room,
        courseTeam: this.state.team,
      }),
    })
      .then((response) => resp = response.json())
      .catch((e) => resp = e.message)
      this.handleClear()
      this.handleGetData();
      this.setState({show: false})
    return resp;
  }

  handleClear = () => {
    this.setState({
      name: "",
      department: "",
      description: "",
      room: "",
      waitlist: "",
      team: "",
    })
  }

  render() {
    let datas = JSON.parse(localStorage.getItem("fdata"))
    console.log(this.state.data)
    return (
      <div>
        <Navbar />
        <div className="fmain">
          <h2>Welcome {datas.name}</h2> {/*map student name*/}
          <div className="cardContainer">
          {this.state.data.map((course,id) => (
            <div className="card" key={id}>
              <ul>
                <li>Course Name: {course.courseName}</li>
                <li>Course Discription: {course.description}</li>
                <li>Course Department: {course.courseDept}</li>
              </ul>
            </div>
          ))}

          <button className="add" onClick={this.handleAddCourse}>+</button>
        </div>
        </div>

        {/* modal */}

        {this.state.show ?
          <Modal>
            <div className="modal">
              <div className="bg"></div>
              <div className="pop">
                <p>Add Course</p>
                <button className="close" onClick={this.handleModalClose}>X</button>
                <form name="validation">
                  <label>Course Name</label>
                  <input type="text" name="name" value={this.state.name || ""} onChange={(e) => this.setState({name: e.target.value})} />
                  <label>Course Department</label>
                  <input type="text" name="department" value={this.state.department || ""} onChange={(e) => this.setState({department: e.target.value})} />
                  <label>Description</label>
                  <textarea className="textarea" name="description" value={this.state.description || ""} onChange={(e) => this.setState({description: e.target.value})} /> {/*if needed add new function*/}
                  <label>Course Room</label>
                  <input type="text" name="room" value={this.state.room || ""} onChange={(e) => this.setState({room: e.target.value})} />
                  <label>Wait List Capacity </label>
                  <input type="number" name="waitlist" value={this.state.waitlist || ""} onChange={(e) => this.setState({waitlist: e.target.value})} />
                  <label>Course Team</label>
                  <input type="text" name="team" value={this.state.team || ""} onChange={(e) => this.setState({team: e.target.value})} />
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

export default FacultyHome;