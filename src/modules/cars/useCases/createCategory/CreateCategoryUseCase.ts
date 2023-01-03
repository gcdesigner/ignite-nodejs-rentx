import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private categoriesRepository: ICategoriesRepository) { }

  execute({ name, description }: IRequest) {
    const categoryExists = this.categoriesRepository.findByName(name);

    if (!name || !description) {
      throw new Error("All inputs are required!");
    }

    if (categoryExists) {
      throw new Error("Category already exists!");
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
