import { IHealthTaskService } from "./interfaces/IHealthTaskService";

export class HealthTaskService implements IHealthTaskService{
  getAll(userId: number): Promise<boolean> {
    return Promise.resolve(false);
  }

}
