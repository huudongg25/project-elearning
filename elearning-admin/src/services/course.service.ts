import { RiNumber0 } from "react-icons/ri";
import CourseRepository from "../repositories/course.repositories";

class CourseService {
  private courseRepository: CourseRepository;
  constructor() {
    this.courseRepository = new CourseRepository();
  }
  public async getAllCourses() {
    try {
      const form = { role: "user" };
      const result = await this.courseRepository.getAllCourses(form);
      if (result.status === 200) {
        const courseData = result.data;
        return courseData.data;
      } else {
        return 2;
      }
    } catch (error) {
      console.log(error);
    }
  }
  public async addCourse(data: any) {
    try {
      console.log(data + "service");
      const result = await this.courseRepository.postCourse(data);
      if (result.status === 201) {
        return 1;
      } else {
        return 2;
      }
    } catch (error) {
      console.log(error);
    }
  }
  public async updateCourse(id: number, data: any) {
    try {
      const result = await this.courseRepository.updateCourse(id, data);
      if (result.status === 200) {
        return 1;
      } else {
        return 2;
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async deleteCourse(id: number) {
    await this.courseRepository.deleteCourse(id);
  }
}

export default CourseService;
