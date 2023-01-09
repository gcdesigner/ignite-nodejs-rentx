import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let repository: CarsRepositoryInMemory;

describe("List cars", () => {
  beforeEach(() => {
    repository = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(repository);
  });

  it("should be able to list all available cars", async () => {
    const car = await repository.create({
      name: "A3",
      description: "Descrição do carro 2",
      daily_rate: 140.0,
      license_plate: "HPP-6566",
      fine_amount: 40.0,
      brand: "Audi",
      category_id: "13214",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await repository.create({
      name: "Uno",
      description: "Descrição do carro",
      daily_rate: 140.0,
      license_plate: "HPP-6567",
      fine_amount: 40.0,
      brand: "Fiat",
      category_id: "123456",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Uno",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category_id", async () => {
    const car = await repository.create({
      name: "Palio",
      description: "Descrição do carro",
      daily_rate: 140.0,
      license_plate: "HPP-6568",
      fine_amount: 40.0,
      brand: "Fiat",
      category_id: "123456",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "123456",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await repository.create({
      name: "Gol",
      description: "Descrição do carro",
      daily_rate: 140.0,
      license_plate: "HPP-6569",
      fine_amount: 40.0,
      brand: "Chevrolet",
      category_id: "123456",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Chevrolet",
    });

    expect(cars).toEqual([car]);
  });
});
