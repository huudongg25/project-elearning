import { RegisteredCourse } from "../entities/registeredCourse.entity";

export class RegisterCourseRepository {
    async create(form: any): Promise<void> {
        await RegisteredCourse.create(form);
    }
}