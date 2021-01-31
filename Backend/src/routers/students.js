const express = require("express");
const Student = require("../mongoose/models/students");
const studentAuth = require("../middlewares/studentAuth");
const Course = require("../mongoose/models/courses");
const multer = require("multer");

const studentRouter = express.Router();

studentRouter.post("/students/register", async (req, res) => {
    try {
        const student = new Student(req.body);
        const token = await student.generateJWTTokens();
        res.status(201).send({ student, token });
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});

studentRouter.post("/students/login", async (req, res) => {
    try {
        const student = await Student.findOne({
            email: req.body.email,
            password: req.body.password
        });
        if (!student) {
            throw new Error("username or password incorrect");
        }
        const token = await student.generateJWTTokens();
        res.send({ student, token });
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});

studentRouter.post("/students/logout", studentAuth, async (req, res) => {
    try {
        req.student.tokens = await req.student.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.student.save();
        res.send("Logged out successfully");
    } catch (e) {
        res.status(500).send("Something went wrong");
    }
});

studentRouter.post("/students/logoutAll", studentAuth, async (req, res) => {
    try {
        req.student.tokens = [];
        await req.student.save();
        res.send("Logged out from all sessions successfully");
    } catch (e) {
        res.status(500).send("Something went wrong");
    }
});

const logo = multer({
    limits: {
      fileSize: 1000000,
    },
    fileFilter(res, file, callback) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return callback(new Error("File should be am image"));
      }
      callback(undefined, true);
    },
  });

studentRouter.post("/students/profileImage", studentAuth, logo.single("logo"), async (req, res) => {
    try {
        const pic = req.file.buffer;
        const student = await Student.findById(req.student._id);
        student.profileImage = pic;
        await student.save();
        res.set("content-type", "image/png");
        res.send(student.profileImage);
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});

studentRouter.get("/students/profile/view", studentAuth, async (req, res) => {
    try {
        const student = await Student.findById(req.student._id);
        res.send(student);
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});

studentRouter.patch("/students/profile/update", studentAuth, async (req, res) => {
    try {
        const student = await Student.findById(req.student._id);
        await student.update(req.body);
        res.send();
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});
studentRouter.get("/students/courses/fetchAll", studentAuth, async (req, res) => {
    try {
        const courses = await Course.find();
        res.send(courses);
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});

studentRouter.post("/students/courses/enroll", studentAuth, async (req, res) => {
    try {
        const student = await Student.findById(req.student._id);
        student.courses = student.courses.concat({ course: req.body.course });
        await student.save();
        res.status(201).send();
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});

studentRouter.get("/students/courses/fetch", studentAuth, async (req, res) => {
    try {
        let list = [];
        const student = await Student.findById(req.student._id);
        student.courses.forEach(async (course) => {
            let curr_course = await Course.findById(course._id);
            list.push(curr_course);
        });
        setTimeout(() => {
            res.send(list);
        }, 200);
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});

module.exports = studentRouter;