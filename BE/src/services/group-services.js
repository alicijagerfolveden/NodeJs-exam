import mysql from "mysql2/promise";
import { mysqlConfig } from "../../config.js";
import { groupSchema } from "../models/Groups.js";

export const postGroup = async (req, res) => {
  const { name } = req.body;

  let groupData = { name };

  try {
    groupData = await groupSchema.validateAsync(groupData);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: "Incorrect name provided" }).end();
  }

  const query = `INSERT INTO defaultdb.groups (name) VALUES (${mysql.escape(
    name
  )})`;

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
