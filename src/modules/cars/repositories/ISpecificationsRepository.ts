import { Specification } from "../infra/typeorm/entities/Specification";

interface ISpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  list(): Promise<Specification[]>;
  create({ name, description }: ISpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationDTO, ISpecificationsRepository };
