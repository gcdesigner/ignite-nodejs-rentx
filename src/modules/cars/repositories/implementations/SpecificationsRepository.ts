import { Specification } from "../../entities/Specification";
import {
  ISpecificationDTO,
  ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private specification: Specification[];

  private static INSTANCE: SpecificationsRepository;

  private constructor() {
    this.specification = [];
  }

  public static getInstance(): SpecificationsRepository {
    if (!SpecificationsRepository.INSTANCE) {
      SpecificationsRepository.INSTANCE = new SpecificationsRepository();
    }

    return SpecificationsRepository.INSTANCE;
  }

  list(): Specification[] {
    return this.specification;
  }

  create({ name, description }: ISpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specification.push(specification);
  }

  findByName(name: string): Specification {
    const specification = this.specification.find(
      (specification) => specification.name === name
    );
    return specification;
  }
}

export { SpecificationsRepository };
