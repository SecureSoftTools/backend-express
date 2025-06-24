import { Router } from "express";
import packageController from "./package.controller";
import validatePayload from "../../middleware/validatePayload";
import { createPackageSchema } from "./package.validator";

const router: Router = Router();

router
  .route("/")
  .get(packageController.getPackages)
  .post(validatePayload(createPackageSchema), packageController.createPackage);

router.post("/bulk", packageController.createPackages);

export default router;
