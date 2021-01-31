const jwt = require("jsonwebtoken");
const Faculty = require("../mongoose/models/faculties");

const facultyAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "ThisJwtTokenIsUsedToVlidateTheFaculty");
    const faculty = await Faculty.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!faculty) {
      throw new Error();
    }
    req.faculty = faculty;
    req.token = token;
    next();
  } catch (e) {
    res.status(400).send({ error: "Please authenticate" });
  }
};

module.exports = facultyAuth;
