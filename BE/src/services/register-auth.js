import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import { mysqlConfig } from "../../config.js";
import { userSchema } from "../models/RegisterUser.js";

export const registerNewUser = async (req, res) => {
  let userData = req.body;

  try {
    userData = await userSchema.validateAsync(userData);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: "Incorect data provided" });
  }

  try {
    const hashedPassword = bcrypt.hashSync(userData.password);

    const con = await mysql.createConnection(mysqlConfig);

    const [data] = await con.execute(
      `INSERT INTO defaultdb.users (full_name, email, password) VALUES (${mysql.escape(
        userData.full_name
      )}, ${mysql.escape(userData.email)}, '${hashedPassword}')`
    );
    await con.end();

    return res.status(200).send(data).end();
  } catch (error) {
    console.log(error);

    return res.status(500).send({ error: "Please try again" });
  }
};
