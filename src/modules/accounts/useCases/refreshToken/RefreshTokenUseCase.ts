/* eslint-disable prettier/prettier */
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { auth } from "@config/auth";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository,

    @inject("DayjsDateProvider")
    private dateProvider: DayjsDateProvider
  ) { }

  async execute(refresh_token: string): Promise<string> {
    const { sub: user_id, email } = verify(refresh_token, auth.refresh_token_secret_key) as IPayload;

    const userToken = await this.usersTokenRepository.findByUserIdAndRefreshToken(user_id, refresh_token)

    if (!userToken) {
      throw new AppError("Refresh token does not exists!")
    }

    await this.usersTokenRepository.delete(userToken.id);

    const new_refreh_token = sign({ email }, auth.refresh_token_secret_key, {
      subject: user_id,
      expiresIn: auth.refresh_token_expires_in
    })

    const expires_date = this.dateProvider.add(auth.refresh_token_expires_date, "days");

    await this.usersTokenRepository.create({
      user_id: user_id,
      refresh_token: new_refreh_token,
      expires_date
    })

    return new_refreh_token;
  }
}

export { RefreshTokenUseCase };
