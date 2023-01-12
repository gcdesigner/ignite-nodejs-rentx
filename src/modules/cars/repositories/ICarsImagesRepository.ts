import { CarImage } from "../infra/typeorm/entities/CarImage";

interface ICarsImagesRepository {
  create(car_id: string, image: string): Promise<CarImage>;
  deleteAllByCarId(car_id: string): Promise<void>;
}

export { ICarsImagesRepository };
