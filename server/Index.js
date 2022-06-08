const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "crud_01",
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
  if (err) return res.send(err);
  res.send("It works!");
});
app.get("/api/get", (req, res) => {
  db.query("SELECT * FROM movies", (err, result) => {
    if (err) return res.send(err);
    res.send(result);
  });
});

//"/api/insert"
app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const review = req.body.review;
  db.query(
    "INSERT INTO movies (movie_name, movie_review) VALUES (?, ?)",
    [movieName, review],
    (err, results) => {
      console.log(res);
    }
  );
});

app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM movies WHERE id = ?";
  db.query(query, id, (err, results) => {
    if (err) return res.send(err);
    res.send(results);
  });
});

app.put("/api/update/:id", (req, res) => {
  const id = req.params.id;
  const review = req.body.review;
  const sqlUpdate = "UPDATE movies SET movie_review = ? WHERE id = ?";
  db.query(sqlUpdate, [review, id], (err, results) => {
    if (err) return res.send(err);
    res.send(results);
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
