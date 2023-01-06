import { Repository } from "typeorm";

import { appDataSource } from "@shared/infra/typeorm/index";

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../../repositories/ICategoriesRepository";
import { Category } from "../entities/Category";

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = appDataSource.getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO) {
    const category = this.repository.create({ name, description });
    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    return await this.repository.find();
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOneBy({ name });
    return category;
  }
}

export { CategoriesRepository };
