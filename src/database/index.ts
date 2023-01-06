import { DataSource } from "typeorm";

import { User } from "../modules/accounts/entities/User";
import { Category } from "../modules/cars/entities/Category";
import { Specification } from "../modules/cars/entities/Specification";
import { CreateCategories1672793250607 } from "./migrations/1672793250607-CreateCategories";
import { CreateSpecifications1672846730011 } from "./migrations/1672846730011-CreateSpecifications";
import { CreateUsers1672875456626 } from "./migrations/1672875456626-CreateUsers";
import { AlterTableCreateUsers1672880296544 } from "./migrations/1672880296544-AlterTableCreateUsers";
import { AddColumnAvatarUsersTable1672963034996 } from "./migrations/1672963034996-AddColumnAvatarUsersTable-d";

const appDataSource = new DataSource({
  type: "postgres",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "rentx",
  synchronize: true,
  logging: true,
  entities: [Category, Specification, User],
  subscribers: [],
  migrationsRun: true,
  migrations: [
    CreateCategories1672793250607,
    CreateSpecifications1672846730011,
    CreateUsers1672875456626,
    AlterTableCreateUsers1672880296544,
    AddColumnAvatarUsersTable1672963034996,
  ],
});

function createConection(host = "database") {
  return appDataSource
    .setOptions({ host })
    .initialize()
    .then(() => console.log("Database initialized!"))
    .catch((err) => console.log("Database error", err));
}

export { appDataSource, createConection };
