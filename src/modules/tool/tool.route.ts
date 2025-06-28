import { Router } from "express";
import toolController from "./tool.controller";
import validatePayload from "../../middleware/validatePayload";
import {
  createToolSchema,
  createToolsSchema,
  getToolByIdSchema,
} from "./tool.validator";
import validateBulkPayload from "../../middleware/validateBulkPayload";

const router: Router = Router();

router
  .route("/")
  .get(toolController.getTools)
  .post(validatePayload(createToolSchema), toolController.createTool);

router.post(
  "/bulk",
  validateBulkPayload(createToolsSchema),
  toolController.createTools
);

router.get(
  "/:toolId",
  validatePayload(getToolByIdSchema),
  toolController.getToolById
);

export default router;
