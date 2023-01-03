import { Request, Response } from "express";

import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

class ListSpecificationsCotroller {
  // eslint-disable-next-line prettier/prettier
  constructor(private listSpecificationsUseCase: ListSpecificationsUseCase) { }

  handle(request: Request, response: Response): Response {
    const all = this.listSpecificationsUseCase.execute();

    return response.json(all);
  }
}

export { ListSpecificationsCotroller };
