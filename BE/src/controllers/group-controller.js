import { Router } from "express";
import { getGroups, postGroup } from "../services/group-services.js";

const router = Router();

router.get("/", getGroups);

router.post("/", postGroup);

export default router;
