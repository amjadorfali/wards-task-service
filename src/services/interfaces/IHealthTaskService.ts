export interface IHealthTaskService {
  getAll(userId: number): Promise<boolean>;

}
