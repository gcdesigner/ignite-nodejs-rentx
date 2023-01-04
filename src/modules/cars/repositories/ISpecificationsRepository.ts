import { Specification } from "../entities/Specification";

interface ISpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  list(): Specification[];
  create({ name, description }: ISpecificationDTO): void;
  findByName(name: string): Specification;
}

export { ISpecificationDTO, ISpecificationsRepository };
