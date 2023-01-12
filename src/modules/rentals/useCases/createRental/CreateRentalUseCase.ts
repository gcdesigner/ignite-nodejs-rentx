/* eslint-disable prettier/prettier */
import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateRentalUseCase {

  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,

    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) { }

  async execute({
    user_id,
    car_id,
    expected_return_date
  }: ICreateRentalDTO): Promise<Rental> {
    const minimunRentalHours = 24;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

    if (carUnavailable) {
      throw new AppError("Car is unavailable!");
    }

    const rentalOpenedToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)

    if (rentalOpenedToUser) {
      throw new AppError("User has already rented a car!");
    }

    const dateNow = this.dateProvider.dateNow();
    const compare_date = this.dateProvider.compare(dateNow, expected_return_date, "hours");

    if (compare_date < minimunRentalHours) {
      throw new AppError("Rental must be for a minimum of 24 hours!")
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date
    });

    await this.carsRepository.updateAvailable(car_id, false)

    return rental;
  }
}

export { CreateRentalUseCase };
