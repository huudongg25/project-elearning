import { User } from "../entities/users.entity";
import { IRegister } from "../types";

export class UserRepository {
    async register(formRegister:any): Promise<void>{
        await User.create(formRegister)
    }
    async getUserEmail(email:string): Promise<any>{
        return await User.findOne({where:{email}})
    }   
}