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
const Multer = require("multer");
const FormData = require("form-data");
const _ = require("lodash");
const path = require("path");
const fs = require("fs");
// const upload = multer({
//   storage: multer.diskStorage({
//     destination: "./public/uploads",
//     filename: (req, file, cb) => cb(null, file.originalname),
//   }),
// });
// const uploadFile = upload.single("file");
let multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});
let uploadFile = multer.single("file");
const postBody = ["know_content_type", "know_content"];
app.post("/api/uploads/:itemId", uploadFile, async (req, res) => {
  console.log("req.body", req.body);
  let itemId = req.params.itemId;
  let body = _.pick(req.body, postBody);
  console.log("body", body);
  console.log("req.file", req.file);
  if (typeof req.file !== undefined) {
    itemName = itemId + "__" + req.file.originalname.replace(/\s/g, "-");
    req.file.originalname = itemName;
    body.know_content = `${itemId}\\${req.file.originalname}`;
  } else {
    return res.status(400).send({ message: "Invalid Entry" });
  }
  body.know_content_type = body.know_content_type || "File Upload";
  console.log("bodyknowconent-type", body);
  const tempPath = path.resolve(path.join("/tmp/", req.file.originalname));
  console.log("tempPath", tempPath);
  console.log("req.file1", req.file);
  // await fs.open(tempPath, "w", function (err, fd) {
  //   if (err) {
  //     throw "could not open file:" + err;
  //   }
  //   fs.write(fd, req.file.buffer, 0, req.file.length, null, function (err) {
  //     if (err) throw "error writing file:" + err;
  //     fs.close(fd, function () {
  //       console.log("wrote the file successully");
  //     });
  //   });
  // });
  // var formdata = new FormData();
  // formdata.append("file", uploadFile);
  // console.log("formdata", formdata);
  res.status(200).send("hello file");
});

app.listen(port, () => console.log(`server is running on port ${port}`));
