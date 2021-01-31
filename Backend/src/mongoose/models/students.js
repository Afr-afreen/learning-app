const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        default: 0000000000
    },
    aboutMe: {
        type: String,
        default: ""
    },
    city: {
        type: String
    },
    country: {
        type: String,
        default: ""
    },
    company: {
        type: String,
        default: ""
    },
    school: {
        type: String,
        default: ""
    },
    homeTown: {
        type: String,
        default: ""
    },
    languages: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        default: ""
    },
    profileImage: {
        type: Buffer,
    },
    isFaculty: {
        type: Boolean,
        default: false
    },
    courses: [
        {
            course: {
                type: String,
            }
        },
    ],
    tokens: [
        {
            token: {
                type: String,
            }
        }
    ]
});

studentSchema.methods.generateJWTTokens = async function () {
    const student = this;
    const token = jwt.sign(
        { _id: student._id.toString() },
        "ThisJwtTokenIsUsedToVlidateTheStudent"
    );
    student.tokens = student.tokens.concat({ token });
    await student.save();
    return token;
};

studentSchema.methods.toJSON = function () {
    const student = this;
    const studentObject = student.toObject();
    delete studentObject.password;
    delete studentObject.tokens;
    return studentObject;
}

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;