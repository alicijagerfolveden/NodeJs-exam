import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import { mysqlConfig } from "../../config.js";
import { jwtSecret } from "../../config.js";
import { accountsSchema } from "../models/Accounts.js";

export const postAccount = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const user = jwt.verify(token, jwtSecret);
  const user_id = user.id;

  const { group_id } = req.body;

  let accountData = { group_id, user_id };

  try {
    accountData = await accountsSchema.validateAsync(accountData);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: "Incorrect details provided" }).end();
  }

  try {
    const connection = await mysql.createConnection(mysqlConfig);

    const [result] = await connection.execute(
      `SELECT group_id FROM defaultdb.accounts WHERE user_id=${user_id} AND group_id =${mysql.escape(
        group_id
      )}`
    );

    await connection.end();

    if (result[0]) {
      return res
        .status(400)
        .send({ error: "You are already in this group" })
        .end();
    }
  } catch (err) {
    res.status(500).send(err).end();
    return console.error(err);
  }

  const query = `INSERT INTO defaultdb.accounts (group_id, user_id) VALUES (${mysql.escape(
    group_id
  )},${user_id} )`;

  try {
    const connection = await mysql.createConnection(mysqlConfig);

    await connection.execute(query);

    await connection.end();

    res.status(200).send("Provided data was inserted into table").end();
  } catch (err) {
    res.status(500).send(err).end();
    return console.error(err);
  }
};

export const getAccounts = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const user = jwt.verify(token, jwtSecret);
  const userID = user.id;

  const query = `SELECT defaultdb.groups.id, defaultdb.groups.name FROM defaultdb.groups INNER JOIN defaultdb.accounts ON defaultdb.groups.id = defaultdb.accounts.group_id WHERE defaultdb.accounts.user_id = ${userID} ORDER BY defaultdb.groups.id`;

  try {
    const con = await mysql.createConnection(mysqlConfig);

    const [result] = await con.execute(query);

    await con.end();

    res.status(200).send(result).end();
  } catch (err) {
    res.status(500).send(err).end();
    return console.error(err);
  }
};
