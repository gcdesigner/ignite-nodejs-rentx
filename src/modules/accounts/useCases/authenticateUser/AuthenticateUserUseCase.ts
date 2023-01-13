/* eslint-disable prettier/prettier */
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { injectable, inject } from "tsyringe";

import { auth } from "@config/auth";
import { UsersTokenRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokenRepository.1";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";


interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("UsersTokenRepository")
    private usersTokenRepository: UsersTokenRepository,

    @inject("DayjsDateProvider")
    private dateProvider: DayjsDateProvider
  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    const { token_expires_in, token_secret_key, refresh_token_secret_key, refresh_token_expires_in, refresh_token_expires_date } = auth;

    if (!user) {
      throw new AppError("Email or password incorrect!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!")
    }

    const refresh_token = sign({ email }, refresh_token_secret_key, {
      subject: user.id,
      expiresIn: refresh_token_expires_in
    })

    const expires_date_refresh_token = this.dateProvider.addDays(refresh_token_expires_date)

    await this.usersTokenRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: expires_date_refresh_token
    })

    const token = sign({}, token_secret_key, {
      subject: user.id,
      expiresIn: token_expires_in
    });

    const tokenReturn: IResponse = {
      user: {
        name: user.name,
        email: user.email
      },
      token,
      refresh_token
    }

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
