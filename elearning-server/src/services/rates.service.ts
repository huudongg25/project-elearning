import { RateRepository } from "../repositories/rates.repository";
import { IRate } from "../types";

export class RateService {
  private _rateRepository: RateRepository;
  constructor() {
    this._rateRepository = new RateRepository();
  }

  async create(form: IRate): Promise<void> {
    await this._rateRepository.create(form);
  }

  async active(rateId: number): Promise<void> {
    await this._rateRepository.active(rateId);
  }

  async delete(rateId: number): Promise<void> {
    await this._rateRepository.delete(rateId);
  }

  async getAll(key:string): Promise<any> {
    return await this._rateRepository.getAll(key);
  }
  async getOneRate(form: any) {
    return await this._rateRepository.getOneRate(form);
  }
}
