const express = require("express");
const { executeQuery } = require("../config/db");
const port = 9000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/employee", async (req, res) => {
  try {
    let employeeData = await executeQuery("select * from employee");
    res.status(200).json(employeeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/employee/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let employeeData = await executeQuery(
      "select * from employee where emp_id=?",
      [id]
    );
    res.status(200).json(employeeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/saveEmployee", async (req, res) => {
  try {
    const { emp_name, emp_email, emp_address, emp_phone } = req.body;
    let employeeData = await executeQuery(
      "insert into employee(emp_name,emp_email,emp_address,emp_phone) values(?,?,?,?)",
      [emp_name, emp_email, emp_address, emp_phone]
    );
    res.status(201).json(employeeData);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.listen(port, () => console.log(`server is running on port ${port}`));
