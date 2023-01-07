import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let repository: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create car", () => {
  beforeEach(() => {
    repository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(repository);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Uno",
      brand: "Fiat",
      category_id: "123456",
      daily_rate: 5,
      description: "Descrição do carro",
      fine_amount: 150,
      license_plate: "HGG2244",
    });

    expect(repository.cars).toHaveLength(1);
    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a new car without category_id", async () => {
    expect(async () => {
      const car: ICreateCarDTO = {
        name: "Uno",
        brand: "Fiat",
        category_id: null,
        daily_rate: 5,
        description: "Descrição do carro",
        fine_amount: 150,
        license_plate: "HGG2245",
      };

      await createCarUseCase.execute(car);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new car with an existing license_plate", async () => {
    expect(async () => {
      const car: ICreateCarDTO = {
        name: "Uno",
        brand: "Fiat",
        category_id: "123456",
        daily_rate: 5,
        description: "Descrição do carro",
        fine_amount: 150,
        license_plate: "HGG2246",
      };

      await createCarUseCase.execute(car);

      const car2: ICreateCarDTO = {
        name: "Uno 2",
        brand: "Fiat",
        category_id: "123456",
        daily_rate: 5,
        description: "Descrição do carro 2",
        fine_amount: 250,
        license_plate: "HGG2246",
      };

      await createCarUseCase.execute(car2);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a new car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car available true",
      brand: "Fiat",
      category_id: "123456",
      daily_rate: 5,
      description: "Descrição do carro",
      fine_amount: 150,
      license_plate: "HGG2245",
    });

    expect(car.available).toBe(true);
  });
});
