import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let carsRepository: CarsRepositoryInMemory;
let specificationsRepository: SpecificationsRepositoryInMemory;
let useCase: CreateCarSpecificationUseCase;

describe("Create car specification", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    specificationsRepository = new SpecificationsRepositoryInMemory();
    useCase = new CreateCarSpecificationUseCase(
      carsRepository,
      specificationsRepository
    );
  });

  it("Should be able to associate a car specifications", async () => {
    const car = await carsRepository.create({
      name: "Uno",
      brand: "Fiat",
      category_id: "123456",
      daily_rate: 5,
      description: "Descrição do carro",
      fine_amount: 150,
      license_plate: "HGG2244",
    });

    await specificationsRepository.create({
      name: "Especificação 1",
      description: "Descrição 1",
    });

    await specificationsRepository.create({
      name: "Especificação 2",
      description: "Descrição 2",
    });

    const specifications_id = specificationsRepository.specifications.map(
      (specification) => specification.id
    );

    await useCase.execute({ car_id: car.id, specifications_id });

    expect(car.specifications).toEqual(specificationsRepository.specifications);
  });

  it("should not be able to associate a specification to a non-exists car", () => {
    expect(async () => {
      await useCase.execute({ car_id: "123456", specifications_id: ["123"] });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to associate a non-exists specification", () => {
    expect(async () => {
      const car = await carsRepository.create({
        name: "Uno",
        brand: "Fiat",
        category_id: "123456",
        daily_rate: 5,
        description: "Descrição do carro",
        fine_amount: 150,
        license_plate: "HGG2244",
      });

      await useCase.execute({ car_id: car.id, specifications_id: ["123"] });
    }).rejects.toBeInstanceOf(AppError);
  });
});
