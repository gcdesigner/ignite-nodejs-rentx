import { Router } from "express";
import multer from "multer";

import { upload } from "@config/upload";
import { ensureAdmin } from "@middlewares/ensureAdmin";
import { ensureAuthenticated } from "@middlewares/ensureAuthenticated";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarUseController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsContoller } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsUseController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImage/UploadCarImagesController";

const carsRoutes = Router();

const uploadImages = multer(upload("./tmp/cars"));

const createCarController = new CreateCarController();
const listAvailableCarsContoller = new ListAvailableCarsContoller();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarsImagesController = new UploadCarImagesController();

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  listAvailableCarsContoller.handle
);

carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

carsRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  uploadImages.array("images"),
  uploadCarsImagesController.handle
);

export { carsRoutes };
