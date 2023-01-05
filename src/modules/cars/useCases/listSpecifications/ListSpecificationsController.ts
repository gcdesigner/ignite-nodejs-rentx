import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

class ListSpecificationsCotroller {
  // eslint-disable-next-line prettier/prettier

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const listSpecificationsUseCase = container.resolve(
        ListSpecificationsUseCase
      );
      const all = await listSpecificationsUseCase.execute();

      return response.json(all);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

export { ListSpecificationsCotroller };
