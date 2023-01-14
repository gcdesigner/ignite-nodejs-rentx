/* eslint-disable prettier/prettier */
import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from 'uuid'

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";


@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,

    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider,
  ) { }

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    const templatePath = resolve(__dirname, "..", "..", "views", "emails", "forgotPassword.hbs");

    if (!user) {
      throw new AppError("User does not exists!")
    }

    const token = uuidV4();
    const expires_date = this.dateProvider.add(3, "hours");

    await this.usersTokenRepository.create({
      user_id: user.id,
      refresh_token: token,
      expires_date,
    })

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`
    }

    console.log(process.env.FORGOT_MAIL_UR)


    await this.mailProvider.sendMail(
      email,
      "Recuperação de senha",
      variables,
      templatePath
    )

    return;
  }
}

export { SendForgotPasswordMailUseCase };
