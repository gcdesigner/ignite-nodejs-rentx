import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { IListAvailableCarsDTO } from "../dtos/IListAvailableCarsDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  list(): Promise<Car[]>;
  create({ name, description }: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAvailableCars({
    category_id,
    name,
    brand,
  }: IListAvailableCarsDTO | undefined): Promise<Car[]>;
  findById(id: string): Promise<Car>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };
