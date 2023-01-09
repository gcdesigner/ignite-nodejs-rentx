import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { IListAvailableCarsDTO } from "../dtos/IListAvailableCarsDTO";
import { Car } from "../typeorm/entities/Car";

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
}

export { ICarsRepository };
