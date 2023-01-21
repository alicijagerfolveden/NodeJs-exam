import { Router } from "express";
import { getBills, postBill } from "../services/bills-services.js";
import { isLoggedIn } from "../services/token-middleware.js";

const billsRouter = Router();

billsRouter.get("/:group_id", isLoggedIn, getBills);

billsRouter.post("/:group_id", isLoggedIn, postBill);

export default billsRouter;
