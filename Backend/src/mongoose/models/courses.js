const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
    },
    courseDept: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    courseRoom: {
        type: String,
        required: true,
    },
    waitlistCapacity: {
        type: Number,
        required: true,
    },
    courseTeam: {
        type: String,
        required: true,
    }
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;