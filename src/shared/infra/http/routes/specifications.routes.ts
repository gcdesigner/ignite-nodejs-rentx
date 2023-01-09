import { Router } from "express";

import { ensureAdmin } from "@middlewares/ensureAdmin";
import { ensureAuthenticated } from "@middlewares/ensureAuthenticated";
import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsCotroller } from "@modules/cars/useCases/listSpecifications/ListSpecificationsController";

const specificationsRoutes = Router();
const createSpecificationController = new CreateSpecificationController();
const listSpecificationsCotroller = new ListSpecificationsCotroller();

specificationsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle
);

specificationsRoutes.get(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  listSpecificationsCotroller.handle
);

export { specificationsRoutes };
