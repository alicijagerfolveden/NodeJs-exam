import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { PORT } from "./config.js";
import groupRouter from "./src/controllers/group-controller.js";
import registerRouter from "./src/controllers/register-auth-controller.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/groups", groupRouter);

app.use("/register", registerRouter);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
