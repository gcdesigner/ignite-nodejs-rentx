import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepository: RentalsRepositoryInMemory;
let useCase: CreateRentalUseCase;

const after24hours = dayjs().add(24, "hours").toDate();
const today = dayjs().toDate();

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryInMemory();
    useCase = new CreateRentalUseCase(rentalsRepository);
  });

  it("should be able to rental a car", async () => {
    const rental = {
      user_id: "1234",
      car_id: "123456",
      start_date: today,
      end_date: after24hours,
      total: 300,
    };

    await useCase.execute(rental);

    expect(rentalsRepository.rentals.length).toBe(1);
  });

  it("should not be able to rent a car with less than 24 hours", async () => {
    expect(async () => {
      const rental = {
        user_id: "1234",
        car_id: "123456",
        start_date: today,
        end_date: today,
        total: 300,
      };

      await useCase.execute(rental);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to rent a car to the same user", async () => {
    expect(async () => {
      await useCase.execute({
        user_id: "1234",
        car_id: "123456",
        start_date: today,
        end_date: after24hours,
        total: 300,
      });

      await useCase.execute({
        user_id: "1234",
        car_id: "1234567",
        start_date: today,
        end_date: after24hours,
        total: 300,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to rent a car that's already rented", async () => {
    expect(async () => {
      await useCase.execute({
        user_id: "1234",
        car_id: "123456",
        start_date: today,
        end_date: after24hours,
        total: 300,
      });

      await useCase.execute({
        user_id: "12345",
        car_id: "123456",
        start_date: today,
        end_date: after24hours,
        total: 300,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
