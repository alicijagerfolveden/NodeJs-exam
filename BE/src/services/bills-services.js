import mysql from "mysql2/promise";
import { mysqlConfig } from "../../config.js";

export const postBill = async (req, res) => {
  const { group_id } = req.params;
  const { amount, description } = req.body;

  //todo: prirašyti if'ų

  const query = `INSERT INTO defaultdb.bills (group_id, amount, description) VALUES (${group_id},${amount},'${description}')`;

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
