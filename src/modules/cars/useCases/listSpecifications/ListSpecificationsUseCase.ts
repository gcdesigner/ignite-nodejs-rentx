import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";

class ListSpecificationsUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private specificationsRepository: SpecificationsRepository) { }

  execute() {
    const all = this.specificationsRepository.list();
    return all;
  }
}

export { ListSpecificationsUseCase };
