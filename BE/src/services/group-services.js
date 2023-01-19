import mysql from "mysql2/promise";
import { mysqlConfig } from "../../config.js";

export const postGroup = async (req, res) => {
  const { name } = req.body;

  console.log(name);
  const query = `INSERT INTO defaultdb.groups (name) VALUES ('${name}')`;

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

export const getGroups = async (_, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);

    const [result] = await con.execute(`SELECT * FROM defaultdb.groups`);

    await con.end();

    res.status(200).send(result).end();
  } catch (err) {
    res.status(500).send(err).end();
    return console.error(err);
  }
};
