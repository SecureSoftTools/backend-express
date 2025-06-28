import { Router } from "express";
import packageController from "./package.controller";
import validatePayload from "../../middleware/validatePayload";
import {
  createPackageSchema,
  createPackagesSchema,
  getPackageByIdSchema,
} from "./package.validator";
import validateBulkPayload from "../../middleware/validateBulkPayload";
import pagination from "../../middleware/pagination";

const router: Router = Router();

router
  .route("/")
  .get(pagination, packageController.getPackages)
  .post(validatePayload(createPackageSchema), packageController.createPackage);

router.post(
  "/bulk",
  validateBulkPayload(createPackagesSchema),
  packageController.createPackages
);

router.get(
  "/:packageId",
  validatePayload(getPackageByIdSchema),
  packageController.getPackageById
);

export default router;
