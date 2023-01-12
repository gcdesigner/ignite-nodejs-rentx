import { Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IListAvailableCarsDTO } from "@modules/cars/dtos/IListAvailableCarsDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { appDataSource } from "@shared/infra/typeorm";

import { Car } from "../entities/Car";
import { Specification } from "../entities/Specification";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = appDataSource.getRepository(Car);
  }

  async list(): Promise<Car[]> {
    return await this.repository.find();
  }

  async create({
    id,
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      id,
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
    });

    await this.repository.save(car);

    return car;
  }

  findById(id: string): Promise<Car> {
    return this.repository.findOne({
      where: { id },
      relations: {
        specifications: true,
        images: true,
      },
    });
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return await this.repository.findOneBy({ license_plate });
  }

  async findAvailableCars({
    category_id,
    name,
    brand,
  }: IListAvailableCarsDTO | undefined): Promise<Car[]> {
    const carsAvailables = this.repository
      .createQueryBuilder("car")
      .where("available = :available", { available: true });

    if (category_id) {
      carsAvailables.andWhere("car.category_id = :category_id", {
        category_id,
      });
    }

    if (name) {
      carsAvailables.andWhere("LOWER(car.name) like LOWER(:name)", {
        name: `%${name}%`,
      });
    }

    if (brand) {
      carsAvailables.andWhere("LOWER(car.brand) like LOWER(:brand)", {
        brand: `%${brand}%`,
      });
    }

    return await carsAvailables.getMany();
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where("id = :id")
      .setParameters({ id })
      .execute();
  }
}

export { CarsRepository };
