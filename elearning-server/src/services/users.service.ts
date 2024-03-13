import { UserRepository } from "../repositories/users.reposiroty";

export class UserService {
    private _userRepository: UserRepository;
    constructor(){
        this._userRepository = new UserRepository
    }
}