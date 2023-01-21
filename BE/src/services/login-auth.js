import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import { mysqlConfig } from "../../config.js";
import { loginUserSchema } from "../models/LoginUser.js";

export const loginUser = async (req, res) => {
  let userData = req.body;

  try {
    userData = await loginUserSchema.validateAsync(userData);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: "Incorect email or password" });
  }

  try {
    const con = await mysql.createConnection(mysqlConfig);

    const [data] = await con.execute(
      `SELECT * FROM defaultdb.users WHERE email = ${mysql.escape(
        userData.email
      )}`
    );
    await con.end();

    if (data.length === 0) {
      return res.status(400).send({ error: "Incorect email or password" });
    }

    const isAuthed = bcrypt.compareSync(userData.password, data[0].password);

    if (isAuthed) {
      res.send("OK").end();
    }

    return res.status(400).send({ error: "Incorect email or password" });
  } catch (error) {
    console.log(error);

    return res.status(500).send({ error: "Please try again" });
  }
};
