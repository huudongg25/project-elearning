import UserRepository from "../repositories/users.repository";

class UserService {
  private _userRepository: UserRepository;
  constructor() {
    this._userRepository = new UserRepository();
  }

  public async getUserInfo(id: number) {
    try {
      const data = await this._userRepository.getUserInfoById(id);
      return data.data[0];
    } catch (error) {
      console.log(error);
    }
  }
  public async updateUser(id: number, updateForm: any) {
    try {
      const result = await this._userRepository.updateUser(id, updateForm);
      if (result.status === 200) {
        return 1;
      } else {
        return 2;
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async createOtp(email: string) {
    try {
      const result = await this._userRepository.createOtp(email);
      if (result.status === 201) {
        return 1;
      } else {
        return 2;
      }
    } catch (error) {
      console.log(error);
    }
  }
  public async confirmOtp(confirmOtp: number) {
    try {
      const result = await this._userRepository.confirmOtp(confirmOtp);
      if (result.status === 200) {
        return 1;
      } else {
        return 2;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
export default UserService;
