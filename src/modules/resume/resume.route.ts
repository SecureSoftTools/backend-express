import { Router } from "express";
import validatePayload from "../../middleware/validatePayload";
import fileUpload from "../../middleware/fileUpload";
import resumeController from "./resume.controller";

const router: Router = Router();

router.post(
  "/signup",
  fileUpload(),
//   validatePayload(registerUserSchema),
  resumeController.uploadResume
);

export default router;
