import { Router } from "express";

import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListCategoriesController } from "../modules/cars/useCases/listCategories/ListCategoriesController";

const specificationsRoutes = Router();
const createSpecificationController = new CreateSpecificationController();
const listSpecificationsCotroller = new ListCategoriesController();

specificationsRoutes.get("/", listSpecificationsCotroller.handle);
specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes };
