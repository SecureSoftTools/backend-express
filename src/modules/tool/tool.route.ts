import { Router } from "express";
import toolController from "./tool.controller";
import validatePayload from "../../middleware/validatePayload";
import { createToolSchema } from "./tool.validator";

const router: Router = Router();

router
  .route("/")
  .get(toolController.getTools)
  .post(validatePayload(createToolSchema), toolController.createTool);

router.post("/bulk", toolController.createTools);

export default router;
