import { IsNull, Repository } from "typeorm";

import type { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { appDataSource } from "@shared/infra/typeorm";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = appDataSource.getRepository(Rental);
  }

  async list(): Promise<Rental[]> {
    return this.repository.find();
  }

  async create({
    id,
    user_id,
    car_id,
    expected_return_date,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      id,
      user_id,
      car_id,
      expected_return_date,
      end_date,
      total,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return await this.repository.findOneBy({
      car_id,
      end_date: IsNull(),
    });
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return await this.repository.findOneBy({
      user_id,
      end_date: IsNull(),
    });
  }

  async findById(id: string): Promise<Rental> {
    return this.repository.findOneBy({ id });
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    return await this.repository.find({
      where: { user_id },
      relations: ["car"],
    });
  }
}

export { RentalsRepository };
