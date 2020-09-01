const deleteJob = (db, req, res) => {
  const { role } = req.body;
  db("jobopenings")
    .where({ role })
    .del()
    .then((data) => {
      return res
        .status(200)
        .json({ success: true, message: "Job Successfully Deleted" });
    })
    .catch((e) => {
      return res
        .status(400)
        .json({ success: false, message: "Job Could Not Be deleted" });
    });
};
const deleteEmployee = (db, req, res) => {
  const { employeeid } = req.body;
  db("users")
    .where({ employeeid })
    .del()
    .then((data) => {
      return res
        .status(200)
        .json({ success: true, message: "Successfully Deleted" });
    })
    .catch((e) => {
      return res
        .status(400)
        .json({ success: false, message: "Could Not Be deleted" });
    });
};
const deleteLeaveRequest = (db, req, res) => {
  const { employeeid } = req.body;
  console.log(req.body);
  console.log(employeeid);
  db("leaverequests")
    .where({ employeeid })
    .del()
    .then((data) => {
      return res
        .status(200)
        .json({ success: true, message: "Request Successfully Rejected" });
    })
    .catch((e) => {
      console.log(e);
      return res
        .status(400)
        .json({ success: false, message: "Could Not Be deleted" });
    });
};

module.exports = {
  deleteEmployee,
  deleteJob,
  deleteLeaveRequest,
};
