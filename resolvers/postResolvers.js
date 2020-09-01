const { response, request } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");

const signJWTTOKEN = (employeeid) => {
  return jwt.sign(
    {
      data: employeeid,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    `MYJSON_WEB_TOKEN_SECRET`
  );
};

//USER LOGIN
const userLogin = (db, bcrypt, req, res) => {
  const { employeeid, password } = req.body;
  if (employeeid.trim() === "")
    return res
      .status(400)
      .send({ success: false, message: "Fill all required fields" });
  db.select("*")
    .from("users")
    .where("employeeid", employeeid)
    .then((user) => {
      if (user.length !== 1)
        return res.status(400).send({
          success: false,
          message: "Incorrect Pacer-HR Domain or Password",
        });
      const passwordValid = password === user[0].password;
      if (passwordValid) {
        const token = signJWTTOKEN(employeeid);
        return res.status(201).send({
          userid: user[0].employeeid,
          employeename: user[0].name,
          role: user[0].role,
          success: true,
          message: "Login Successful",
          token: token,
        });
      } else {
        return res.status(400).send({
          userid: null,
          success: false,
          message: "Incorrect Pacer-HR Domain or Password",
          token: null,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return response.status(400).json("Login not successful");
    });
};
//EBUKA'S APPLICATION
const ebukaLogin = (db, bcrypt, req, res) => {
  const { email, password } = req.body;
  db.select("*")
    .from("persuasionmodel")
    .where("email", email)
    .then((user) => {
      if (user.length !== 1)
        return res.status(400).send({
          success: false,
          message: "Incorrect email or Password",
        });
      const passwordValid = password === user[0].password;
      if (passwordValid) {
        const token = signJWTTOKEN(email);
        return res.status(201).send({
          email: user[0].email,
          success: true,
          message: "Login Successful",
          token: token,
        });
      } else {
        return res.status(400).send({
          email: null,
          success: false,
          message: "Incorrect email or Password",
          token: null,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return response.status(400).json("Login not successful");
    });
};

//CREATE USER ACCOUNT
const createUser = (db, req, res) => {
  const { employeeid, name, email, password, role, hiredate } = req.body;
  if (employeeid.trim() === "")
    return res
      .status(400)
      .json({ success: false, message: "Fill all required fields" });
  db("users")
    .insert({ employeeid, name, email, password, role, hiredate })
    .returning("*")
    .then((user) => {
      const response = {
        success: true,
        message: "Account created Successfully",
        data: user,
      };
      return res.status(201).json(response);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json(`Could not create Account ${req.body.name}`);
    });
};
//ADD LEAVE REQUEST
const addLeaveRequest = (db, req, res) => {
  const { employeeid, name, role, reason, duration, startdate } = req.body;
  db("leaverequests")
    .insert({ employeeid, name, role, reason, duration, startdate })
    .returning("*")
    .then((leaverequest) => {
      const response = {
        success: true,
        message: "Request Successfully Sent",
        data: leaverequest,
      };
      return res.status(201).json(response);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json(`Could not send request ${req.body.name}`);
    });
};

//CREATE SALARY ACCOUNT
const createSalary = (db, req, res) => {
  console.log(req.body);
  const {
    employeeid,
    name,
    email,
    role,
    grosssalary,
    benefits,
    netsalary,
  } = req.body;
  db("salary")
    .insert({
      employeeid,
      name,
      email,
      role,
      grosssalary,
      benefits,
      netsalary,
    })
    .returning("*")
    .then((salaryAccount) => {
      const response = {
        success: true,
        message: "Salary account created successfully",
        data: salaryAccount,
      };
      return res.status(201).json(response);
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(400)
        .json(`Account for ${req.body.name} could not be created `);
    });
};
//POST JOB OPENING
const postJob = (db, req, res) => {
  const {
    role,
    jobdescription,
    contracttype,
    jobrequirement,
    location,
    salary,
  } = req.body;
  console.log(req.body);
  db("jobopenings")
    .insert({
      role,
      jobdescription,
      contracttype,
      jobrequirement,
      location,
      salary,
    })
    .returning("*")
    .then((jobopening) => {
      const response = {
        success: true,
        message: "Job Posted Successfully",
        data: jobopening,
      };
      return res.status(201).json(response);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json(`Job Posting could not be completed `);
    });
};
//POST JOB APPLICATION
const postApplication = (db, req, res) => {
  const { firstname, lastname, role, email, phone, resume } = req.body;
  console.log(req.body);
  db("applicants")
    .insert({
      firstname,
      lastname,
      role,
      email,
      phone,
      resume,
    })
    .returning("*")
    .then((applicant) => {
      const response = {
        success: true,
        message: "Application Successful",
        data: applicant,
      };
      return res.status(201).json(response);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json(`Application Unsuccessful`);
    });
};
//POST EMPLOYEES ON LEAVE
const postOnLeave = (db, req, res) => {
  const { employeeid, name, role, duration } = req.body;
  console.log(req.body);
  db("onleave")
    .insert({
      employeeid,
      name,
      role,
      duration,
    })
    .returning("*")
    .then((onleave) => {
      const response = {
        success: true,
        message: "Leave Approved",
        data: onleave,
      };
      return res.status(201).json(response);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json(`Leave request could not be approved `);
    });
};
const addPerformance = (db, req, res) => {
  const { month, average } = req.body;
  db("performance")
    .insert({ month, average })
    .returning("*")
    .then((performance) => {
      const response = {
        success: true,
        message: "Added",
        data: performance,
      };
      return res.status(201).json(response);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json(`Could not send`);
    });
};
//EXPORT THE POST METHODS
module.exports = {
  addPerformance,
  addLeaveRequest,
  createUser,
  userLogin,
  createSalary,
  postJob,
  postOnLeave,
  postApplication,
  ebukaLogin,
};
