const sqlite3 = require("sqlite3").verbose();

var db = new sqlite3.Database("./db/db.db", (err) => {
  if (err) return console.error(err.message);
  console.log("Connected to database");
  db.get("SELECT * FROM users", (err, row) => {
    if (err) return console.error(err.message);
    console.log(row.username, row.password);
  });
});

module.exports = db;
