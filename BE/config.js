import dotenv from "dotenv";

dotenv.config();

export const mysqlConfig = {
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  port: process.env.port,
  database: process.env.database,
};

export const PORT = +process.env.serverPort || 5_001;

export const jwtSecret = process.env.JWT_SECRET;
