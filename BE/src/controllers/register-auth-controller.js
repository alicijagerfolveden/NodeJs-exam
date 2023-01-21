import { Router } from "express";
import { registerNewUser } from "../services/register-auth.js";

const registerRouter = Router();

registerRouter.post("/", registerNewUser);

export default registerRouter;
