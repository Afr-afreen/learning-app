const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const facultySchema = new mongoose.Schema({
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
        type: Number
    },
    aboutMe: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    company: {
        type: String
    },
    school: {
        type: String
    },
    homeTown: {
        type: String
    },
    languages: {
        type: String
    },
    gender: {
        type: String
    },
    profileImage: {
        type: Buffer,
    },
    isFaculty: {
        type: Boolean,
        default: true
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

facultySchema.methods.generateJWTTokens = async function () {
    const faculty = this;
    const token = jwt.sign(
        { _id: faculty._id.toString() },
        "ThisJwtTokenIsUsedToVlidateTheFaculty"
    );
    faculty.tokens = faculty.tokens.concat({ token });
    await faculty.save();
    return token;
};

facultySchema.methods.toJSON = function () {
    const faculty = this;
    const facultyObject = faculty.toObject();
    delete facultyObject.password;
    delete facultyObject.tokens;
    return facultyObject;
}

const Faculty = mongoose.model("Faculty", facultySchema);

module.exports = Faculty;