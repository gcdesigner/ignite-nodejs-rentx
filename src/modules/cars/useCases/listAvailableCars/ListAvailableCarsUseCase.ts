/* eslint-disable prettier/prettier */
import { inject, injectable } from "tsyringe";

import { IListAvailableCarsDTO } from "@modules/cars/dtos/IListAvailableCarsDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Car } from "@modules/cars/typeorm/entities/Car";

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
