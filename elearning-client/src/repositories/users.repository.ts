import Api from "../apis/api";
import { IntfLogin, IntfUser } from "../types/entities.type";

class UserRepository {
  private _api: Api;
  constructor() {
    this._api = new Api();
  }
  public async register(formRegister: IntfUser) {
    return await this._api.Post("/auth/register", formRegister);
  }
  public async login(formLogin: any) {
    return await this._api.Post("/auth/login", formLogin);
  }
  public async logout() {
    await this._api.Logout("/users/logout");
  }
  public async getUserInfoById(id: number): Promise<any> {
    return await this._api.GetById("/users", id);
  }
  public async updateUser(id: number, updateForm: any) {
    return await this._api.Patch(`/users`, id, updateForm);
  }
  public async createOtp(email: string) {
    return await this._api.CreateOtp(`/users/create-otp`, email);
  }
  public async confirmOtp(confirmOtp: number) {
    return await this._api.Post(`/users/confirm-otp`, { otp: confirmOtp });
  }
}
export default UserRepository;
