//import express, bodyparser,cors and morgan
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

//import knex
const db = require("../knex");

//expressjs call
const app = express();

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const {} = require("./resolvers.postResolvers");

//USER RESISTRATION
app.post("/register", (req, res) => {
  res.send({ message: `Registration done! ${req.body.email}` });
  console.log("worked");
});

//USER LOGIN
app.post("/login", (req, res) => {
  res.send({ message: `Login done! ${req.body.email}` });
  console.log("worked");
});

app.listen(process.env.PORT || 8081);
