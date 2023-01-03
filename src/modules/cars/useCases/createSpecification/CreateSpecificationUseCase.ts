import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private specificationRepository: ISpecificationsRepository) { }

  execute({ name, description }: IRequest) {
    const alreadyExists = this.specificationRepository.findByName(name);

    if (alreadyExists) {
      throw new Error("Specification already exists!");
    }

    this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
