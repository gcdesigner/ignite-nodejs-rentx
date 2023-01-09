import { Repository } from "typeorm";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { appDataSource } from "@shared/infra/typeorm";

import { CarImage } from "../entities/CarImage";

class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = appDataSource.getRepository(CarImage);
  }

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const image = this.repository.create({ car_id, image_name });

    await this.repository.save(image);

    return image;
  }

  async deleteAllByCarId(car_id: string): Promise<void> {
    const images = await this.repository.findBy({ car_id });
    this.repository.remove(images);
  }
}

export { CarsImagesRepository };
