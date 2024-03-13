import Api from "../apis/api";

class UserRepository {
  private _api: Api;
  constructor() {
    this._api = new Api();
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
