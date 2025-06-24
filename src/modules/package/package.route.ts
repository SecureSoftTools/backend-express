import { Router } from "express";
import packageController from "./package.controller";
import validatePayload from "../../middleware/validatePayload";
import { createPackageSchema, createPackagesSchema } from "./package.validator";
import validateBulkPayload from "../../middleware/validateBulkPayload";

const router: Router = Router();

router
  .route("/")
  .get(packageController.getPackages)
  .post(validatePayload(createPackageSchema), packageController.createPackage);

router.post(
  "/bulk",
  validateBulkPayload(createPackagesSchema),
  packageController.createPackages
);

export default router;
