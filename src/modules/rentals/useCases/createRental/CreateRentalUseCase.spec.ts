import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepository: RentalsRepositoryInMemory;
let carsRespository: CarsRepositoryInMemory;
let useCase: CreateRentalUseCase;
let dayjsDateProvider: DayjsDateProvider;

const today = dayjs().toDate();
const after24hours = dayjs().add(24, "hours").toDate();

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryInMemory();
    carsRespository = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    useCase = new CreateRentalUseCase(
      rentalsRepository,
      dayjsDateProvider,
      carsRespository
    );
  });

  it("should be able to rental a car", async () => {
    const rental = {
      user_id: "1234",
      car_id: "123456",
      expected_return_date: after24hours,
    };

    await useCase.execute(rental);

    expect(rentalsRepository.rentals.length).toBe(1);
  });

  it("should not be able to rent a car with less than 24 hours", async () => {
    expect(async () => {
      const rental = {
        user_id: "1234",
        car_id: "123456",
        expected_return_date: today,
      };

      await useCase.execute(rental);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to rent a car to the same user", async () => {
    expect(async () => {
      await useCase.execute({
        user_id: "1234",
        car_id: "123456",
        expected_return_date: after24hours,
      });

      await useCase.execute({
        user_id: "1234",
        car_id: "1234567",
        expected_return_date: after24hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to rent a car that's already rented", async () => {
    expect(async () => {
      await useCase.execute({
        user_id: "1234",
        car_id: "123456",
        expected_return_date: after24hours,
      });

      await useCase.execute({
        user_id: "12345",
        car_id: "123456",
        expected_return_date: after24hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
