/* eslint-disable prettier/prettier */
import { inject, injectable } from "tsyringe";

import { SpecificationsRepository } from "@modules/cars/repositories/implementations/SpecificationsRepository";

@injectable()
class ListSpecificationsUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: SpecificationsRepository
  ) { }

  async execute() {
    const all = await this.specificationsRepository.list();
    return all;
  }
}

export { ListSpecificationsUseCase };
