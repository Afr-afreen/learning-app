const mongoose = require("mongoose");
const Course = require("../models/courses");
const Faculty = require("../models/faculties");
require("../mongoose");

const facultyObjectID = new mongoose.Types.ObjectId();
const courseOneObjectID = new mongoose.Types.ObjectId();
const courseTwoObjectID = new mongoose.Types.ObjectId();
const courseThreeObjectID = new mongoose.Types.ObjectId();
const courseFourObjectID = new mongoose.Types.ObjectId();
const courseFiveObjectID = new mongoose.Types.ObjectId();

const faculty = {
    _id: facultyObjectID,
    name: "Faculty",
    email: "faculty@gmail.com",
    password: "JDBhavani",
    courses: [
        {
            course: courseOneObjectID,
        },
        {
            course: courseTwoObjectID,
        },
        {
            course: courseThreeObjectID,
        },
        {
            course: courseFourObjectID,
        },
        {
            course: courseFiveObjectID,
        },
    ]
}

const courseOne = {
    _id: courseOneObjectID,
    courseName: "Node.js",
    courseDept: "Web development",
    description: "Node.js is used to create back-end services",
    courseRoom: "Room 1",
    waitlistCapacity: 5,
    courseTeam: "Team 1",
}

const courseTwo = {
    _id: courseTwoObjectID,
    courseName: "React.js",
    courseDept: "Web development",
    description: "React.js is used to create front-end services",
    courseRoom: "Room 3",
    waitlistCapacity: 10,
    courseTeam: "Team 1",
}
const courseThree = {
    _id: courseThreeObjectID,
    courseName: "Angular",
    courseDept: "Web development",
    description: "Angular is used to create front-end services",
    courseRoom: "Room 2",
    waitlistCapacity: 8,
    courseTeam: "Team 1",
}
const courseFour = {
    _id: courseFourObjectID,
    courseName: "ML",
    courseDept: "AI",
    description: "ML is used in AI",
    courseRoom: "Room 6",
    waitlistCapacity: 35,
    courseTeam: "Team 2",
}
const courseFive = {
    _id: courseFiveObjectID,
    courseName: "Springboot",
    courseDept: "Web development",
    description: "Springboot is used to create back-end services",
    courseRoom: "Room 4",
    waitlistCapacity: 25,
    courseTeam: "Team 1",
}

const setUpDatabase = async () => {
    await Faculty.deleteMany();
    await Course.deleteMany();
    await new Faculty(faculty).save();
    await new Course(courseOne).save();
    await new Course(courseTwo).save();
    await new Course(courseThree).save();
    await new Course(courseFour).save();
    await new Course(courseFive).save();
    await mongoose.disconnect();
}

setUpDatabase();