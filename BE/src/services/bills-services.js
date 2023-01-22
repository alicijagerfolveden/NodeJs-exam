import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../../config.js";
import { mysqlConfig } from "../../config.js";
import { billsSchema } from "../models/Bills.js";

export const postBill = async (req, res) => {
  const { group_id } = req.params;
  const { amount, description } = req.body;

  let billData = { group_id, amount, description };

  try {
    billData = await billsSchema.validateAsync(billData);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: "Incorrect details provided" }).end();
  }

  const query = `INSERT INTO defaultdb.bills (group_id, amount, description) VALUES (${group_id},${mysql.escape(
    amount
  )},${mysql.escape(description)})`;

  try {
    const connection = await mysql.createConnection(mysqlConfig);

    await connection.execute(query);

    await connection.end();

    res.status(200).send("Provided data was inserted into table");
  } catch (err) {
    res.status(500).send(err).end();
    return console.error(err);
  }
};

export const getBills = async (req, res) => {
  const { group_id } = req.params;
  const token = req.headers.authorization?.split(" ")[1];
  const user = jwt.verify(token, jwtSecret);
  const user_id = user.id;

  try {
    const connection = await mysql.createConnection(mysqlConfig);

    const [result] = await connection.execute(
      `SELECT group_id FROM defaultdb.accounts WHERE user_id=${user_id} AND group_id =${group_id}`
    );

    await connection.end();

    if (!result[0]) {
      return res.status(400).send({ error: "You are not in this group" }).end();
    }
  } catch (err) {
    res.status(500).send(err).end();
    return console.error(err);
  }

  const query = `SELECT defaultdb.bills.id, defaultdb.bills.amount, defaultdb.bills.description FROM defaultdb.bills INNER JOIN defaultdb.groups ON defaultdb.groups.id = defaultdb.bills.group_id WHERE defaultdb.bills.group_id = ${group_id}`;

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
