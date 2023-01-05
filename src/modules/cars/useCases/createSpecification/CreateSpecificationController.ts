import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  // eslint-disable-next-line prettier/prettier

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body;

      const createSpecificationUseCase = container.resolve(
        CreateSpecificationUseCase
      );

      await createSpecificationUseCase.execute({ name, description });

      return response.status(202).send();
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

export { CreateSpecificationController };
