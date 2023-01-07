/* eslint-disable prettier/prettier */

import { hash } from "bcryptjs";
import { injectable, inject } from "tsyringe";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("Email already taken!");
    }

    const password_hash = await hash(password, 8)

    await this.usersRepository.create({
      name,
      email,
      password: password_hash,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
