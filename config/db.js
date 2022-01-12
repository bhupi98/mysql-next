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
  host: "localhost",
  database: "data",
  user: "root",
  password: "India@100",
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
