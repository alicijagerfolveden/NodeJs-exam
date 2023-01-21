import { Router } from "express";
import { getGroups, postGroup } from "../services/group-services.js";

const groupRouter = Router();

groupRouter.get("/", getGroups);

groupRouter.post("/", postGroup);

export default groupRouter;
