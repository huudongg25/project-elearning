import { UserRepository } from "../repositories/users.repository";

export class UserService {
    private _userRepository: UserRepository;
    constructor(){
        this._userRepository = new UserRepository
    }
}