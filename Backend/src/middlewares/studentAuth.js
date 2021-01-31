const jwt = require("jsonwebtoken");
const Student = require("../mongoose/models/students");

const studentAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "ThisJwtTokenIsUsedToVlidateTheStudent");
    const student = await Student.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!student) {
      throw new Error();
    }
    req.student = student;
    req.token = token;
    next();
  } catch (e) {
    res.status(400).send({ error: "Please authenticate" });
  }
};

module.exports = studentAuth;
