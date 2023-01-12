import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListRentalsByUserUseCase } from "./ListRentalsByUserUseCase";

class ListRentalsByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listRentalsUseCase = container.resolve(ListRentalsByUserUseCase);

    const rentals = await listRentalsUseCase.execute(id);

    return response.status(200).json(rentals);
  }
}

export { ListRentalsByUserController };
