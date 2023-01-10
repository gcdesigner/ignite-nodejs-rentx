/* eslint-disable prettier/prettier */
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

dayjs.extend(utc);

class CreateRentalUseCase {

  constructor(private rentalsRepository: IRentalsRepository) { }

  async execute({
    car_id,
    user_id,
    start_date,
    end_date,
    total,
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

    const start_date_formated = dayjs(start_date).utc().local().format();
    const end_date_formated = dayjs(end_date).utc().local().format();
    const compare_date = dayjs(end_date_formated).diff(start_date_formated, "hours");

    if (compare_date < minimunRentalHours) {
      throw new AppError("Rental must be for a minimum of 24 hours!")
    }

    const rental = this.rentalsRepository.create({
      car_id,
      user_id,
      end_date,
      start_date,
      total,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
