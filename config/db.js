// const { createPool } = require("mysql");
const mysql = require("serverless-mysql")();
// const pool = createPool({
//   host: "localhost",
//   user: "root",
//   password: "India@100",
//   port: 3306,
//   database: "data",
// });

mysql.config({
  host: process.env.fhfhf,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

// pool.getConnection((err) => {
//   if (err) {
//     console.log("Error conntecting to db...");
//   }
//   console.log("Connected to db...");
// });

const executeQuery = (query, arraParms) => {
  return new Promise((resolve, reject) => {
    try {
      mysql.query(query, arraParms, (err, data) => {
        if (err) {
          console.log("error in executing the query");
          reject(err);
        }
        resolve(data);
      });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { executeQuery };
