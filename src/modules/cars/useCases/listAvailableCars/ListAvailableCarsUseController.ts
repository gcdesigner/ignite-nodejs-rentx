import { Request, Response } from "express";
import { container } from "tsyringe";

import { IListAvailableCarsDTO } from "@modules/cars/dtos/IListAvailableCarsDTO";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

class ListAvailableCarsContoller {
  async handle(request: Request, response: Response): Promise<Response> {
    const query = request.query;
    const { category_id, name, brand } = query as IListAvailableCarsDTO;

    const listAvailableCarsUseCase = container.resolve(
      ListAvailableCarsUseCase
    );

    const cars = await listAvailableCarsUseCase.execute({
      category_id,
      name,
      brand,
    });

    return response.json(cars);
  }
}

export { ListAvailableCarsContoller };
