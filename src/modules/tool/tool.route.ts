import { Router } from "express";
import toolController from "./tool.controller";

const router: Router = Router();

router.get("/", toolController.getTools);

export default router;
