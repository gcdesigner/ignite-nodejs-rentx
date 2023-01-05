/* eslint-disable prettier/prettier */
import { hash } from 'bcryptjs'
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from '../../repositories/IUsersRepository';

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
      throw new Error("Email already taken!");
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
