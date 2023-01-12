import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";

let carsRespository: CarsRepositoryInMemory;
let rentalsRepository: RentalsRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let devolutionRentalsUseCase: DevolutionRentalUseCase;

const return_date = dayjs().add(5, "days").toDate();

describe("Devolution rental", () => {
  beforeEach(() => {
    carsRespository = new CarsRepositoryInMemory();
    rentalsRepository = new RentalsRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    devolutionRentalsUseCase = new DevolutionRentalUseCase(
      rentalsRepository,
      carsRespository,
      dateProvider
    );
  });

  it("should be able to devolute a rental", async () => {
    const car = await carsRespository.create({
      name: "Uno",
      brand: "Fiat",
      category_id: "123456",
      daily_rate: 100,
      description: "Descrição do carro",
      fine_amount: 100,
      license_plate: "HGG2244",
    });

    const rental = await rentalsRepository.create({
      car_id: car.id,
      user_id: "user_id",
      expected_return_date: return_date,
    });

    const result = await devolutionRentalsUseCase.execute({
      id: rental.id,
      user_id: "user_id",
    });

    expect(result.end_date).not.toBeNull();
    expect(result.total).not.toBeNull();
  });
});
