const db = require("../db/database");
const express = require("express");
const router = express.Router();

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

router.post("/", (req, res, err) => {
  const { username, password } = req.body;
  db.get(
    "select password from users where username = ?",
    username,
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).json({ message: "User does not exist" });
      } else if (data.password == password)
        res.status(200).json({ message: "Succesfully signed in" });
      else res.status(401).json({ message: "Wrong password" });
    }
  );
});

module.exports = router;
