/* eslint-disable prettier/prettier */
import { inject, injectable } from "tsyringe";

import { ICreateSpecificationCarDTO } from "@modules/cars/dtos/ICreateSpecificationCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,

    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) { }

  async execute({
    car_id,
    specifications_id,
  }: ICreateSpecificationCarDTO): Promise<void> {
    const car = await this.carsRepository.findById(car_id);

    if (!car) {
      throw new AppError("Car not found!");
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id
    );

    if (!specifications.length) {
      throw new AppError("Specficications not found!");
    }

    car.specifications = specifications;

    await this.carsRepository.create(car);
  }
}

export { CreateCarSpecificationUseCase };
