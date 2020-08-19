//GET EMPLOYEE BY ID
const getUserbyid = (db, req, res) => {
  const id = req.params.id;
  db.select("*")
    .from("users")
    .where("employeeid", id)
    .then((user) => {
      console.log(user);
      const response = {
        success: true,
        message: "Successfull",
        user: user[0],
      };
      return res.status(201).json(response);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json(`Could not create Account ${req.body.name}`);
    });
};
//GET EMPLOYEE BY NAME
const getUserbyname = (db, req, res) => {
  const name = req.params.name;
  db.select("*")
    .from("users")
    .where("name", name)
    .then((user) => {
      console.log(user);
      const response = {
        success: true,
        message: "Successfull inside name",
        user: user[0],
      };
      return res.status(201).json(response);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json(`Could not create Account ${req.body.name}`);
    });
};
const getJobById = (db, req, res) => {
  db.select("*")
    .from("jobopenings")
    .where("jobid", req.params.jobid)
    .then((data) => {
      return res.status(200).json({
        success: true,
        data: data[0],
      });
      return res.status(201);
    });
};
//GET EMPLOYEES
const getAllUsers = (db, req, res) => {
  db.select("*")
    .from("users")
    .then((data) => {
      return res.status(200).json({ data });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(400)
        .json({ success: false, data: "Could not get users" });
    });
};
//GET SALARY ACCOUNTS
const getAllSalary = (db, req, res) => {
  db.select("*")
    .from("salary")
    .then((data) => {
      return res.status(200).json({ data });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(400)
        .json({ success: false, data: "Could not get users" });
    });
};
//GET LEAVE REQUESTS
const getLeaveRequests = (db, req, res) => {
  db.select("*")
    .from("leaverequests")
    .then((data) => {
      return res.status(200).json({ data });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(400)
        .json({ success: false, data: "Could not get requests" });
    });
};
//GET APPROVED LEAVE
const getApprovedLeave = (db, req, res) => {
  db.select("*")
    .from("onleave")
    .then((data) => {
      return res.status(200).json({ data });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(400)
        .json({ success: false, data: "Could not get openings" });
    });
};
const getAllJobs = (db, req, res) => {
  db.select("*")
    .from("jobopenings")
    .then((data) => {
      return res.status(200).json({ data });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(400)
        .json({ success: false, data: "Could not get openings" });
    });
};
const getApplicants = (db, req, res) => {
  db.select("*")
    .from("applicants")
    .then((data) => {
      return res.status(200).json({ data });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(400)
        .json({ success: false, data: "Could not get applicants" });
    });
};

module.exports = {
  getAllJobs,
  getUserbyid,
  getUserbyname,
  getAllUsers,
  getAllSalary,
  getLeaveRequests,
  getApprovedLeave,
  getJobById,
  getApplicants,
};
