import { CourseRepository } from "../repositories/courses.repository";
import { ICourse } from "../types";

export class CourseService {
  private _courseRepository: CourseRepository;
  constructor() {
    this._courseRepository = new CourseRepository();
  }

  async createCourse(
    formCourse: ICourse,
    fileImage: Express.Multer.File
  ): Promise<void> {
    const newForm = {
      ...formCourse,
      image: fileImage.path,
    };
    await this._courseRepository.createCourse(newForm);
  }

  async deleteCourse(id: number): Promise<void> {
    await this._courseRepository.deleteCourse(id);
  }

  async updateCourse(
    id: number,
    formUpdate: any,
    fileImage?: Express.Multer.File
  ): Promise<any> {
    if (fileImage) {
      const newForm = {
        ...formUpdate,
        image: fileImage.path,
      };
      await this._courseRepository.updateCourse(id, newForm);
    } else {
      await this._courseRepository.updateCourse(id, formUpdate);
    }
  }

  async getAllCourses(
    search: string,
    sort: string,
    page: number,
    limit: number
  ): Promise<any> {
    const offset = Math.ceil((page - 1) * limit);
    return await this._courseRepository.getAllCourses(
      offset,
      limit,
      search,
      sort
    );
  }
  async getDetailCourse(id: number): Promise<any> {
    return await this._courseRepository.getDetailCourse(id);
  }
}
