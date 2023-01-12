/* eslint-disable prettier/prettier */
import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsReposiory: IRentalsRepository
  ) { }

  async execute(user_id: string): Promise<Rental[]> {
    return await this.rentalsReposiory.findByUser(user_id)
  }
}

export { ListRentalsByUserUseCase };
