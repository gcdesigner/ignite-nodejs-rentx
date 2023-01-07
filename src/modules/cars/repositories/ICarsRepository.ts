import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../typeorm/entities/Car";

interface ICarsRepository {
  list(): Promise<Car[]>;
  create({ name, description }: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
}

export { ICarsRepository };
