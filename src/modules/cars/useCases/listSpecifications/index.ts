import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { ListSpecificationsCotroller } from "./ListSpecificationsController";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

const specificationRepository = SpecificationsRepository.getInstance();
const listSpecificationsUseCase = new ListSpecificationsUseCase(
  specificationRepository
);
const listSpecificationsCotroller = new ListSpecificationsCotroller(
  listSpecificationsUseCase
);

export { listSpecificationsCotroller };
