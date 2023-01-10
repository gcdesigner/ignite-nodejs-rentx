import { DataSource } from "typeorm";

import { User } from "../../../modules/accounts/infra/typeorm/entities/User";
import { Car } from "../../../modules/cars/typeorm/entities/Car";
import { CarImage } from "../../../modules/cars/typeorm/entities/CarImage";
import { Category } from "../../../modules/cars/typeorm/entities/Category";
import { Specification } from "../../../modules/cars/typeorm/entities/Specification";
import { Rental } from "../../../modules/rentals/infra/typeorm/entities/Rental";
import { CreateCategories1672793250607 } from "./migrations/1672793250607-CreateCategories";
import { CreateSpecifications1672846730011 } from "./migrations/1672846730011-CreateSpecifications";
import { CreateUsers1672875456626 } from "./migrations/1672875456626-CreateUsers";
import { AlterTableCreateUsers1672880296544 } from "./migrations/1672880296544-AlterTableCreateUsers";
import { AddColumnAvatarUsersTable1672963034996 } from "./migrations/1672963034996-AddColumnAvatarUsersTable-d";
import { CreateCars1673050631490 } from "./migrations/1673050631490-CreateCars";
import { SpecificationsCars1673118899658 } from "./migrations/1673118899658-SpecificationsCars";
import { CreateCarImages1673277452191 } from "./migrations/1673277452191-CreateCarImages";
import { CreateRentals1673288539491 } from "./migrations/1673288539491-CreateRentals";

const appDataSource = new DataSource({
  type: "postgres",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "rentx",
  synchronize: true,
  logging: true,
  entities: [Category, Specification, User, Car, CarImage, Rental],
  subscribers: [],
  migrationsRun: true,
  migrations: [
    CreateCategories1672793250607,
    CreateSpecifications1672846730011,
    CreateUsers1672875456626,
    AlterTableCreateUsers1672880296544,
    AddColumnAvatarUsersTable1672963034996,
    CreateCars1673050631490,
    SpecificationsCars1673118899658,
    CreateCarImages1673277452191,
    CreateRentals1673288539491,
  ],
});

function createConnection(host = "database") {
  return appDataSource.setOptions({ host }).initialize();
}

export { appDataSource, createConnection };
