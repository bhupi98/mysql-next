import { executeQuery } from "../../config/db";
import employeeValidation from "../../common/employeeValidator";
import ErrorHandler from "../../common/errorHandler";
const getAllEmployees = async (req, res) => {
  try {
    console.log("all the employees");
    let employeeData = await executeQuery("select * from employee", []);
    res.send(employeeData);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getEmployeeById = async (req, res, next) => {
  let id = req.query.id;
  try {
    console.log("employee by id");
    let employeeData = await executeQuery(
      `select * from employee where emp_id=${id}`,
      []
    );
    if (employeeData.length > 0) res.status(200).json(employeeData);
    else {
      next(new ErrorHandler(`no employee found with this id ${id}`, 404));
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteEmployeeById = async (req, res, next) => {
  let id = req.query.id;
  try {
    let employeeData = await executeQuery(
      "delete from employee where emp_id=?",
      [id]
    );
    // if (employeeData.length > 0) res.status(200).json('employee');
    // else {
    //   next(
    //     new ErrorHandler(` employee  doesnt exist in db with id ${id}`, 404)
    //   );
    // }
    res.status(200).json("Employee Deleted Successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};

const saveEmployee = async (req, res) => {
  try {
    const result = req.body;
    const { emp_name, emp_email, emp_address, emp_phone } = result;
    let { error } = employeeValidation(result);
    if (error) {
      res.status(400).json(error.details[0].message);
    } else {
      console.log("post request");
      let employeeData = await executeQuery(
        "insert into employee(emp_name,emp_email,emp_address,emp_phone) values(?,?,?,?)",
        [emp_name, emp_email, emp_address, emp_phone]
      );
      employeeData = await executeQuery(
        `select * from employee where emp_id=${employeeData.insertId}`
      );
      res.status(201).json(employeeData);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateEmployee = async (req, res) => {
  let id = req.query.id;
  console.log("id", id);
  const { emp_name, emp_email, emp_address, emp_phone } = req.body;
  console.log("req.body", req.body);
  try {
    let employeeData = await executeQuery(
      "select * from employee where emp_id=?",
      [id]
    );
    if (employeeData.length > 0) {
      console.log("putrequest", employeeData);
      employeeData = await executeQuery(
        `update employee set emp_name=?,emp_email=?,emp_address=?,emp_phone=? where emp_id=${id}`,
        [emp_name, emp_email, emp_address, emp_phone]
      );
      res.status(200).json(employeeData);
    } else {
      res.status(400).json(`employee not found on this id=${id}`);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

export {
  getAllEmployees,
  getEmployeeById,
  deleteEmployeeById,
  saveEmployee,
  updateEmployee,
};
