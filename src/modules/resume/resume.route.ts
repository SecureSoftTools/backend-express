import { Router } from "express";
import validatePayload from "../../middleware/validatePayload";
import fileUpload from "../../middleware/fileUpload";
import resumeController from "./resume.controller";
import { uploadResumeSchmea } from "./resume.validator";
import pagination from "../../middleware/pagination";

const router: Router = Router();

router.post(
  "/upload",
  fileUpload("resume"),
  validatePayload(uploadResumeSchmea),
  resumeController.uploadResume
);

router.get("/", pagination, resumeController.fetchRankingResume);

export default router;
