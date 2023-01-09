import { User } from "../../../../modules/accounts/infra/typeorm/entities/User";

import { hash } from "bcryptjs";

import { createConnection } from "..";

async function create() {
  const password = await hash("admin", 8);

  const connection = await createConnection("localhost");

  const repo = connection.getRepository(User);
  const user = repo.create({
    name: "admin",
    email: "admin@rentx.com",
    password,
    driver_license: "",
    is_admin: true,
  });

  await repo.save(user);

  await connection.destroy();
}

create()
  .then(() => console.log("User admin is created!"))
  .catch((err) => {
    throw new Error(`--> Seed problem ${err.message}`);
  });
