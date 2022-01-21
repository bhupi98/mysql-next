import nc from "next-connect";
import onError from "../../../common/errormiddleware";
import multer from "multer";
import path from "path";
import { executeQuery } from "../../../config/db";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

const handler = nc(onError);

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

let upload = multer({
  storage: storage,
});

let uploadFile = upload.single("file");
handler.use(uploadFile);
handler.post(async (req, res) => {
  console.log("req.file", req.file);
  console.log("req.body", req.body);
  let url = "http://" + req.headers.host;
  let filename = req.file.filename;
  let result = await executeQuery("insert into upload(pic) values(?)", [
    filename,
  ]);
  result = await executeQuery(
    `select * from upload where pic_id=${result.insertId}`
  );
  res.status(200).send({
    result: result,
    url: url + "/public/" + req.file.filename,
  });
});

export default handler;
