import { Router } from "express";
import validatePayload from "../../middleware/validatePayload";
import fileUpload from "../../middleware/fileUpload";
import resumeController from "./resume.controller";
import { uploadResumeSchmea } from "./resume.validator";

const router: Router = Router();

router.post(
  "/signup",
  fileUpload(),
  validatePayload(uploadResumeSchmea),
  resumeController.uploadResume
);

export default router;
