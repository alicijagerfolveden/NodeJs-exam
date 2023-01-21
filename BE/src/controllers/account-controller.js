import { Router } from "express";
import { getAccounts, postAccount } from "../services/account-services.js";
import { isLoggedIn } from "../services/token-middleware.js";

const accountRouter = Router();

accountRouter.get("/", isLoggedIn, getAccounts);

accountRouter.post("/", isLoggedIn, postAccount);

export default accountRouter;
