import { AdminRepository } from "../repositories/admins.repository";
import { IAdmin } from "../types";
import bcryptjs from "bcryptjs"
export class AdminService {
    private _adminRepository: AdminRepository;
    constructor() {
        this._adminRepository = new AdminRepository();
    }

    async create(formAdmin: IAdmin): Promise<void> {
        const salt = bcryptjs.genSaltSync(9)
        const hashedPassword = bcryptjs.hashSync(formAdmin.password, salt)
        const newForm = {
         ...formAdmin,
            password: hashedPassword
        }
        await this._adminRepository.create(newForm);
    }

    async delete(adminId:number): Promise<void> {
        await this._adminRepository.delete(adminId);
    }

    async update(adminId:number, avatar:string): Promise<void> {
        await this._adminRepository.update(adminId, avatar)
    }
}
