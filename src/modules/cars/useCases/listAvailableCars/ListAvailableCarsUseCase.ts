/* eslint-disable prettier/prettier */
import { inject, injectable } from "tsyringe";

import { IListAvailableCarsDTO } from "@modules/cars/dtos/IListAvailableCarsDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) { }

  async execute({ category_id, name, brand }: IListAvailableCarsDTO | undefined): Promise<Car[]> {
    return await this.carsRepository.findAvailableCars({ category_id, name, brand });
  }
}

export { ListAvailableCarsUseCase };
