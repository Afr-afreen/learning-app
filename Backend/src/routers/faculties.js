const express = require("express");
const Faculty = require("../mongoose/models/faculties");
const facultyAuth = require("../middlewares/facultyAuth");
const Course = require("../mongoose/models/courses");
const mongoose = require("mongoose")

const facultyRouter = express.Router();

facultyRouter.post("/faculties/register", async (req, res) => {
    try {
        const faculty = new Faculty(req.body);
        const token = await faculty.generateJWTTokens();
        res.status(201).send({ faculty, token });
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});

facultyRouter.post("/faculties/login", async (req, res) => {
    try {
        const faculty = await Faculty.findOne({
            email: req.body.email,
            password: req.body.password
        });
        if(!faculty) {
            throw new Error("username or password incorrect");
        }
        const token = await faculty.generateJWTTokens();
        res.send({ faculty, token });
    } catch(e) {
        res.status(400).send({ error: e.message });
    }
});

facultyRouter.post("/faculties/logout", facultyAuth, async (req, res) => {
    try {
      req.faculty.tokens = await req.faculty.tokens.filter((token) => {
        return token.token !== req.token;
      });
      await req.faculty.save();
      res.send("Logged out successfully");
    } catch (e) {
      res.status(500).send("Something went wrong");
    }
});

facultyRouter.post("/faculties/logoutAll", facultyAuth, async (req, res) => {
    try {
      req.faculty.tokens = [];
      await req.faculty.save();
      res.send("Logged out from all sessions successfully");
    } catch (e) {
      res.status(500).send("Something went wrong");
    }
});

facultyRouter.post("/faculties/courses/add", facultyAuth, async(req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        const faculty = await Faculty.findById(req.faculty._id);
        faculty.courses = faculty.courses.concat({ course: course._id });
        await faculty.save();
        res.status(201).send();
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});

facultyRouter.get("/faculties/courses/fetch", facultyAuth, async(req, res) => {
    try {
        const courses = await Course.find();
        res.send(courses);
    } catch(e) {
        res.status(400).send({ error: e.message });
    }
});

module.exports = facultyRouter;