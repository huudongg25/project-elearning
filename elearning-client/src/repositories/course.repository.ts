import Api from "../apis/api";
import { IntfCourse } from "../types/entities.type";

export class CourseRepository {
  apiService: Api;
  constructor() {
    this.apiService = new Api();
  }
  public async onSearch(value: string) {
    const result = await this.getAllCourses();
    const searchCourses = result.filter((item: IntfCourse) =>
      item.courseName.toLowerCase().includes(value)
    );
    return searchCourses;
  }
  async getAllCourses(): Promise<any> {
    const result: any = await this.apiService.GetAll("courses");
    return result.data;
  }

  async getCoursesById(id: number): Promise<any> {
    const result: any = await this.apiService.GetById("courses", id);
    return result;
  }

  async patchNew(id: number, data: IntfCourse | any) {
    await this.apiService.Patch("courses", id, data);
  }
  async postCourse(data: IntfCourse) {
    await this.apiService.Post("courses", data);
  }
  async getDetailCourse(courseId: number) {
    return this.apiService.GetById("/courses/detail", courseId);
  }
}
