import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtSecret, mysqlConfig } from "../../config.js";
import { loginUserSchema } from "../models/LoginUser.js";

export const loginUser = async (req, res) => {
  let userData = req.body;

  try {
    userData = await loginUserSchema.validateAsync(userData);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: "Incorect email or password" }).end();
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
      return res
        .status(400)
        .send({ error: "Incorect email or password" })
        .end();
    }

    const userID = data[0].id;
    const isAuthed = bcrypt.compareSync(userData.password, data[0].password);

    if (isAuthed) {
      const token = jwt.sign(
        { id: data[0].id, email: data[0].email },
        jwtSecret
      );

      return res
        .send({ message: "Succesfully logged in", token, userID })
        .end();
    }

    return res.status(400).send({ error: "Incorect email or password" }).end();
  } catch (error) {
    console.log(error);

    return res.status(500).send({ error: "Please try again" }).end();
  }
};
