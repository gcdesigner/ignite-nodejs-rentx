import { Repository } from "typeorm";

import {
  ISpecificationsRepository,
  ISpecificationDTO,
} from "@modules/cars/repositories/ISpecificationsRepository";
import { Specification } from "@modules/cars/typeorm/entities/Specification";
import { appDataSource } from "@shared/infra/typeorm/index";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = appDataSource.getRepository(Specification);
  }

  async list(): Promise<Specification[]> {
    return this.repository.find();
  }

  async create({ name, description }: ISpecificationDTO) {
    const specification = await this.repository.create({ name, description });
    this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.repository.findOneBy({ name });
    return specification;
  }
}

export { SpecificationsRepository };
