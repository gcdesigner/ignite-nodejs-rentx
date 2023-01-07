/* eslint-disable prettier/prettier */
import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Car } from "@modules/cars/typeorm/entities/Car";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) { }

  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }): Promise<Car> {
    const licensePlateAlreadyExists = await this.carsRepository.findByLicensePlate(license_plate);

    if (!category_id) {
      throw new AppError("Category is required!");
    }

    if (licensePlateAlreadyExists) {
      throw new AppError("License plate already registred!");
    }

    const car = await this.carsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    return car;
  }
}

export { CreateCarUseCase };
