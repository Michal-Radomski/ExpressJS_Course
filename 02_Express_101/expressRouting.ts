import express, { Router } from "express";

import { getMethod } from "./expressController";

const router: Router = express.Router();

router.get("/", getMethod);

export default router;
