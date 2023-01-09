import { In, Repository } from "typeorm";

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
    return await this.repository.find();
  }

  async create({ name, description }: ISpecificationDTO) {
    const specification = this.repository.create({ name, description });
    this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    return await this.repository.findOneBy({ name });
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return await this.repository.findBy({ id: In(ids) });
  }
}

export { SpecificationsRepository };
