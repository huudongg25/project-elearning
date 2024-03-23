import { CourseRepository } from "../repositories/course.repository";
import { IntfCourse } from "../types/entities.type";

class CoursesService {
  private coursesRepository: CourseRepository;

  constructor() {
    this.coursesRepository = new CourseRepository();
  }
  async getAllCourses() {
    const data = await this.coursesRepository.getCourse();
    return data;
  }

  async getCoursesCategory() {
    const data = await this.coursesRepository.getCourse();
    // data.filter((item:any)=>item.catetory==item)
    return data;
  }

  public async getCoursesById(id: number | undefined): Promise<IntfCourse> {
    let result = await this.coursesRepository.getCoursesById(id);
    return result;
  }

  public async onSearch(value: string) {
    const result = await this.coursesRepository.getAllCourses();
    const searchCourses = result.filter((item: IntfCourse) =>
      item.courseName.toLowerCase().includes(value)
    );
    return searchCourses;
  }

  // public async editcourses(id: number, data: IntfCourse {
  //   await this.coursesRepository.patchNew(id, data);
  // }
  // public async addcourses(data: IntfCourse {
  //   await this.coursesRepository.postcourses(data);
  // }
}

export default CoursesService;
