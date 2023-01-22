import { Router } from "express";
import { loginUser } from "../services/login-auth.js";

const loginRouter = Router();

loginRouter.post("/", loginUser);

export default loginRouter;
