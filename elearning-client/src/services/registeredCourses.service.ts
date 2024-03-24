import { RegisteredCourseRepository } from "../repositories/registeredCourses.repository";

export class RegisteredCourseService {
    private _registeredCourseRepository: RegisteredCourseRepository;
    constructor() {
        this._registeredCourseRepository = new RegisteredCourseRepository();
    }

    async getDetailRegisteredCourseUser(userId:number, courseId:number) {
        try {
            const form = {
                userId,
                courseId
            }
            const result = await this._registeredCourseRepository.getDetailRegisteredCourseUser(form)
            return result.data.data[0]
        } catch (error) {
            console.log(error);
        }
    }

    async updateStateCourseUser(userId:number, courseId:number) {
        try {
            const form = {
                userId,
                courseId
            }
            await this._registeredCourseRepository.updateStateCourseUser(form)
        } catch (error) {
            console.log(error);
        }
    }
}