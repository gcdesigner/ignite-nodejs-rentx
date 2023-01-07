import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let repository: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    repository = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(repository);
    createUserUseCase = new CreateUserUseCase(repository);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "000123",
      name: "Gabriel Costa",
      email: "gc@gc.com",
      password: "123456",
    };

    await createUserUseCase.execute(user);

    const userLogged = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(userLogged).toHaveProperty("token");
  });

  it("should not be able to authenticate an nonexistent user", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "email@email.com",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "000123",
        name: "Gabriel Costa",
        email: "gc@gc.com",
        password: "123456",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "wrongpassword",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
