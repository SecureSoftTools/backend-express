import { Router } from "express";
import aiToolController from "./aiTool.controller";
import validatePayload from "../../middleware/validatePayload";
import {
  coldEmailContentSchema,
  sendColdEmailSchema,
} from "./aiTool.validator";

const router: Router = Router();

router.post(
  "/generate",
  validatePayload(coldEmailContentSchema),
  aiToolController.getColdEmailContent
);

router.post(
  "/send-cold-email",
  validatePayload(sendColdEmailSchema),
  aiToolController.sendColdEmail
);

export default router;
