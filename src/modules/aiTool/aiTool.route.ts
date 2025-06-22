import { Router } from "express";
import aiToolController from "./aiTool.controller";
import validatePayload from "../../middleware/validatePayload";
import { coldEmailContentSchema } from "./aiTool.validator";

const router: Router = Router();

router.post(
  "/generate",
  validatePayload(coldEmailContentSchema),
  aiToolController.getColdEmailContent
);

export default router;
