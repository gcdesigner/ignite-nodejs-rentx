import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
  // eslint-disable-next-line prettier/prettier

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
      const { file } = request;

      await importCategoryUseCase.execute(file);

      return response.status(201).send();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { ImportCategoryController };
