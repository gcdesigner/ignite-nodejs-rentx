import { DataSource } from "typeorm";

import { Category } from "../modules/cars/entities/Category";
import { CreateCategories1672793250607 } from "./migrations/1672793250607-CreateCategories";

export const appDataSource = new DataSource({
  type: "postgres",
  host: "database",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "rentx",
  synchronize: true,
  logging: true,
  entities: [Category],
  subscribers: [],
  migrations: [CreateCategories1672793250607],
});

appDataSource
  .initialize()
  .then(() => console.log("Database initialized!"))
  .catch((err) => console.log("Database error", err));
