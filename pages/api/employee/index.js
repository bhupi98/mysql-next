import nc from "next-connect";
import onError from "../../../common/errormiddleware";
import {
  getAllEmployees,
  saveEmployee,
} from "../../../controller/employee/employee";
const handler = nc(onError);
handler.get(getAllEmployees);
handler.post(saveEmployee);
export default handler;
