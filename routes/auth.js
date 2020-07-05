const db = require("../db/database");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const config = require("config");

router.post("/register", (req, res, err) => {
  const { username, password } = req.body;
  db.run("INSERT INTO users VALUES(?,?)", [username, password], (err) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "User already exists" });
    } else {
      res.status(200).json({ message: "User successfully registered" });
    }
  });
});

//function that generates token
function generateAuthToken(user) {
  return jwt.sign(user, config.get("myprivatekey"));
}

router.post("/signin", (req, res, err) => {
  console.log("signing in");
  const { username, password } = req.body;
  db.get(
    "select password from users where username = ?",
    username,
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).json({ message: "User does not exist" });
      } else if (data.password == password) {
        //call on function that generates token and put in header
        const token = generateAuthToken({ username: username });
        console.log(token);
        res
          .header("x-auth-token", token)
          .status(200)
          .json({ message: "Succesfully signed in" });
      } else res.status(401).json({ message: "Wrong password" });
    }
  );
});

module.exports = router;
