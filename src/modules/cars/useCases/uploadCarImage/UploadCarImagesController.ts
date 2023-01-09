import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

interface IFile {
  filename: string;
}

class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: car_id } = request.params;
    const images = request.files as IFile[];

    const useCase = container.resolve(UploadCarImagesUseCase);

    const images_name = images.map((file) => file.filename);

    useCase.execute({ car_id, images_name });

    return response.status(201).send();
  }
}

export { UploadCarImagesController };
