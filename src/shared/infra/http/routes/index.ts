import { Router } from "express";

import { authRoutes } from "./auth.routes";
import { carsRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { passwordRoutes } from "./password.routes";
import { rentalsRoutes } from "./rentals.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use(authRoutes);

router.use("/users", usersRoutes);
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/cars", carsRoutes);
router.use("/rentals", rentalsRoutes);
router.use("/password", passwordRoutes);

export { router };
