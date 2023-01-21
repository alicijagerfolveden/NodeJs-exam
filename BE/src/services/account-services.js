import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import { mysqlConfig } from "../../config.js";
import { jwtSecret } from "../../config.js";

export const postAccount = async (req, res) => {
  const { group_id, user_id } = req.body;

  //todo: prirašyti if'ų

  const query = `INSERT INTO defaultdb.accounts (group_id, user_id) VALUES ('${group_id}',${user_id} )`;

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

export const getAccounts = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);
  const user = jwt.verify(token, jwtSecret);

  const userID = user.id;
  console.log(userID);
  const query = `SELECT defaultdb.groups.id, defaultdb.groups.name FROM defaultdb.groups INNER JOIN defaultdb.accounts ON defaultdb.groups.id = defaultdb.accounts.group_id WHERE defaultdb.accounts.user_id = ${userID}`;
  try {
    const con = await mysql.createConnection(mysqlConfig);

    const [result] = await con.execute(query);
    console.log(result);
    await con.end();

    res.status(200).send(result).end();
  } catch (err) {
    res.status(500).send(err).end();
    return console.error(err);
  }
};
