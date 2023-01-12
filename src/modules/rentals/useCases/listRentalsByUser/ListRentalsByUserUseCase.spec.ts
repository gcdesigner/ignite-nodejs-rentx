import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";

import { ListRentalsByUserUseCase } from "./ListRentalsByUserUseCase";

let rentalsRepository: RentalsRepositoryInMemory;
let listRentalsByUserUseCase: ListRentalsByUserUseCase;

const return_date = dayjs().add(5, "days").toDate();

describe("List rentals by user", () => {
  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryInMemory();
    listRentalsByUserUseCase = new ListRentalsByUserUseCase(rentalsRepository);
  });

  it("should be able to list rentals by user", async () => {
    await rentalsRepository.create({
      car_id: "123456",
      user_id: "user_id",
      expected_return_date: return_date,
    });

    const userRentals = await listRentalsByUserUseCase.execute("user_id");

    expect(userRentals[0]).toHaveProperty("id");
    expect(userRentals.length).toBe(1);
  });
});
