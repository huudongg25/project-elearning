import { RegisterCourseRepository } from "../repositories/registeredCourses.repository";
import { IRegisterCourse } from "../types";
import {v1 as uuidv1} from 'uuid'


export class RegisterCourseService {
    private _registerCourseRepository: RegisterCourseRepository;
    constructor() {
        this._registerCourseRepository = new RegisterCourseRepository();
    }

    async create(form:IRegisterCourse){
        const codePayment = uuidv1();
        const newForm = {
            ...form,
             codePayment
        }
        await this._registerCourseRepository.create(newForm)
    }
}