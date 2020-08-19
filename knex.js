//Import the knex module into the project
const knex = require("knex");

//Initialise knex
//"postgress://postgres:{password}@localhost:{port_number}/{db_name}"
const db = new knex({
  client: "pg",
  connection: "postgres://postgres:omodot@localhost:5432/pacerhr",
});

module.exports = db;
