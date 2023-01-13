import { Repository } from "typeorm";
import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { appDataSource } from "@shared/infra/typeorm";
import { UserToken } from "../entities/UserToken";

class UsersTokenRepository implements IUsersTokenRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = appDataSource.getRepository(UserToken);
  }

  async create({
    expires_date, refresh_token, user_id,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const user_token = this.repository.create({
      user_id,
      expires_date,
      refresh_token
    });

    await this.repository.save(user_token);

    return user_token;
  }
}
