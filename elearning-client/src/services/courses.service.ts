import { courseRepository } from "../repositories/courses.repository";

export class CourseService {
  private _courseRepository: courseRepository;
  constructor() {
    this._courseRepository = new courseRepository();
  }

  async getDetailCourse(courseId: number) {
    try {
      const result = await this._courseRepository.getDetailCourse(courseId);
      return result.data.data[0];
    } catch (error) {
      console.log(error);
    }
  }
}
