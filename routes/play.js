const express = require("express");
const router = express.Router();

router.post("/", (req, res, err) => {
  console.log("PLAY");
});

module.exports = router;
