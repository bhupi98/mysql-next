// const { createPool } = require("mysql");
const mysql = require("serverless-mysql");
const db = mysql({
  config: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  },
});

// const pool = createPool({
//   host: "localhost",
//   user: "root",
//   password: "India@100",
//   port: 3306,
//   database: "data",
// });

// pool.getConnection((err) => {
//   if (err) {
//     console.log("Error conntecting to db...");
//   }
//   console.log("Connected to db...");
// });

const executeQuery = (query, arraParms) => {
  return new Promise((resolve, reject) => {
    try {
      db.query(query, arraParms, (err, data) => {
        if (err) {
          console.log("error in executing the query");
          reject(err);
        }
        db.end();
        resolve(data);
      });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { executeQuery };
