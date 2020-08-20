//import express, bodyparser,cors and morgan
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const bcrypt = require("bcrypt");

//import knex
const db = require("../knex");

//expressjs call
const app = express();

// Init packages
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: 'https://pacerhr.herokuapp.com' }));

const { createUser } = require("../resolvers/postResolvers");
const { userLogin } = require("../resolvers/postResolvers");
const { addLeaveRequest } = require("../resolvers/postResolvers");
const { createSalary } = require("../resolvers/postResolvers");
const { postJob } = require("../resolvers/postResolvers");
const { postApplication } = require("../resolvers/postResolvers");
const { postOnLeave } = require("../resolvers/postResolvers");
const { getUserbyid } = require("../resolvers/getResolvers");
const { getAllUsers } = require("../resolvers/getResolvers");
const { getApplicants } = require("../resolvers/getResolvers");
const { getAllSalary } = require("../resolvers/getResolvers");
const { getAllJobs } = require("../resolvers/getResolvers");
const { getJobById } = require("../resolvers/getResolvers");
const { getLeaveRequests } = require("../resolvers/getResolvers");
const { getApprovedLeave } = require("../resolvers/getResolvers");
const { deleteJob } = require("../resolvers/deleteResolvers");
const { deleteLeaveRequest } = require("../resolvers/deleteResolvers");

//USER RESISTRATION
app.get("/users/:id", (req, res) => {
  {
    getUserbyid(db, req, res);
  }
});
app.get("/users", (req, res) => {
  {
    getAllUsers(db, req, res);
  }
});
app.post("/register", (req, res) => {
  {
    createUser(db, req, res);
  }
  console.log("worked");
});

//USER LOGIN
app.post("/login", (req, res) => {
  {
    userLogin(db, bcrypt, req, res);
  }
  console.log("Login Worked");
});

//LEAVE REQUEST
app.post("/leaverequest", (req, res) => {
  {
    addLeaveRequest(db, req, res);
  }
  console.log("worked");
});
app.get("/leaverequest", (req, res) => {
  {
    getLeaveRequests(db, req, res);
  }
  console.log("worked");
});
app.post("/approvedleave", (req, res) => {
  {
    postOnLeave(db, req, res);
  }
  console.log("worked");
});
app.get("/approvedleave", (req, res) => {
  {
    getApprovedLeave(db, req, res);
  }
  console.log("Worked");
});
app.delete("/leaverequest", (req, res) => {
  {
    deleteLeaveRequest(db, req, res);
  }
});

//SALARY ACCOUNT
app.post("/finance", (req, res) => {
  {
    createSalary(db, req, res);
  }
  console.log("worked");
});
app.get("/finance", (req, res) => {
  {
    getAllSalary(db, req, res);
  }
  console.log("worked");
});
//POST JOB
app.post("/jobposting", (req, res) => {
  {
    postJob(db, req, res);
  }
  console.log("worked");
});
//GET ALL JOBS
app.get("/jobposting", (req, res) => {
  {
    getAllJobs(db, req, res);
  }
  console.log("worked");
});
//DELETE JOB
app.delete("/jobposting", (req, res) => {
  {
    deleteJob(db, req, res);
  }
});
//GET JOB OPENING BY NAME
app.get("/jobposting/:jobid", (req, res) => {
  {
    getJobById(db, req, res);
  }
  console.log("Worked");
});
//POST APPLICATION
app.post("/applicants", (req, res) => {
  {
    postApplication(db, req, res);
  }
  console.log("Worked");
});
//GET APPLICATIONS
app.get("/applicants", (req, res) => {
  {
    getApplicants(db, req, res);
  }
  console.log("Worked");
});

app.listen(process.env.PORT || 8081);
