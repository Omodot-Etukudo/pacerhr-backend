const updateUser = (db, req, res) => {
  const { employeeid, email, name, password, role } = req.body;
  if (
    name.trim() === "" ||
    email.trim() === "" ||
    password.trim() === "" ||
    role.trim() === ""
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Fill up the fields" });
  }
  db("users")
    .where({ employeeid })
    .update({ name, email, password, role }, ["*"])
    .then((updatedUser) => {
      return res.status(200).json({
        success: true,
        message: "update successful",
        data: updatedUser,
      });
    })
    .catch((e) => {
      return res
        .status(400)
        .json({ success: false, message: "Update not successful" });
    });
};
const updateSalary = (db, req, res) => {
  const { employeeid, benefits, grosssalary, netsalary } = req.body;
  db("salary")
    .where({ employeeid })
    .update({ employeeid, benefits, grosssalary, netsalary }, ["*"])
    .then((updatedSalary) => {
      return res.status(200).json({
        success: true,
        message: "update successful",
        data: updatedSalary,
      });
    })
    .catch((e) => {
      return res
        .status(400)
        .json({ success: false, message: "Update not successful" });
    });
};
module.exports = {
  updateUser,
  updateSalary,
};
