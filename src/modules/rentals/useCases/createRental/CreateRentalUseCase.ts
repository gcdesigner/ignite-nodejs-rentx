/* eslint-disable prettier/prettier */
import { inject, injectable } from "tsyringe";

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
    private dateProvider: IDateProvider
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

    const userAlreadyRentalACar = await this.rentalsRepository.findOpenRentalByUser(user_id)

    if (userAlreadyRentalACar) {
      throw new AppError("User has already rented a car!");
    }

    const dateNow = this.dateProvider.dateNow();
    const compare_date = this.dateProvider.compareInHours(dateNow, expected_return_date);

    if (compare_date < minimunRentalHours) {
      throw new AppError("Rental must be for a minimum of 24 hours!")
    }

    const rental = this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date
    });

    return rental;
  }
}

export { CreateRentalUseCase };
