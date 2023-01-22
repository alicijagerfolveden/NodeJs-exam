import { Router } from "express";
import { getGroups, postGroup } from "../services/group-services.js";
import { isLoggedIn } from "../services/token-middleware.js";

const groupRouter = Router();

groupRouter.get("/", isLoggedIn, getGroups);

groupRouter.post("/", postGroup);

export default groupRouter;
