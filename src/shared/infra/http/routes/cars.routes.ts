import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarUseController";

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post("/", createCarController.handle);

export { carsRoutes };
