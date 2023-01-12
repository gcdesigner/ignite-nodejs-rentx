import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepository: RentalsRepositoryInMemory;
let carsRespository: CarsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dayjsDateProvider: DayjsDateProvider;

const today = dayjs().toDate();
const after24hours = dayjs().add(24, "hours").toDate();

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryInMemory();
    carsRespository = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepository,
      dayjsDateProvider,
      carsRespository
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRespository.create({
      name: "Uno",
      brand: "Fiat",
      category_id: "123456",
      daily_rate: 5,
      description: "Descrição do carro",
      fine_amount: 150,
      license_plate: "HGG2244",
    });

    await createRentalUseCase.execute({
      user_id: "1234",
      car_id: car.id,
      expected_return_date: after24hours,
    });

    expect(rentalsRepository.rentals.length).toBe(1);
  });

  it("should not be able to rent a car with less than 24 hours", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "1234",
        car_id: "123456",
        expected_return_date: today,
      })
    ).rejects.toEqual(
      new AppError("Rental must be for a minimum of 24 hours!")
    );
  });

  it("should not be able to rent a car to the same user", async () => {
    await rentalsRepository.create({
      user_id: "12345",
      car_id: "1111",
      expected_return_date: after24hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "2222",
        expected_return_date: after24hours,
      })
    ).rejects.toEqual(new AppError("User has already rented a car!"));
  });

  it("should not be able to rent a car that's already rented", async () => {
    await rentalsRepository.create({
      user_id: "1234",
      car_id: "same_car",
      expected_return_date: after24hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "same_car",
        expected_return_date: after24hours,
      })
    ).rejects.toEqual(new AppError("Car is unavailable!"));
  });
});
