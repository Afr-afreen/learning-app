require("./mongoose/mongoose");
const express = require("express");
const facultyRouter = require("./routers/faculties");
const studentRouter = require("./routers/students");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET,DELETE,PATCH,POST");
        return res.status(200).json({});
    }
    next();
});

app.use(facultyRouter);
app.use(studentRouter);

app.listen(8001, () => {
    console.log("App is running on port 8001");
});