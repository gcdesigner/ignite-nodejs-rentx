/* eslint-disable prettier/prettier */
import { inject, injectable } from "tsyringe";

import { ICarsImageDTO } from "@modules/cars/dtos/ICarImageDTO";
import { CarsImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarsImagesRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { deleteFile } from "@utils/file";

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: CarsImagesRepository,

    @inject("CarsRepository")
    private carsRepository: CarsRepository
  ) { }

  async execute({ car_id, images_name }: ICarsImageDTO): Promise<void> {
    const { images } = await this.carsRepository.findById(car_id);

    if (images.length) {
      this.carsImagesRepository.deleteAllByCarId(car_id);

      images.forEach(async (image) => {
        await deleteFile(`./tmp/cars/${image.image_name}`)
      })
    }

    images_name.map(async (image) => {
      await this.carsImagesRepository.create(car_id, image);
    });
  }
}

export { UploadCarImagesUseCase };
