import LessonRepository from "../repositories/lesson.repositories";

class LessonService {
  private courseRepository: LessonRepository;
  constructor() {
    this.courseRepository = new LessonRepository();
  }
  public async getAllLessons() {
    try {
      const form = { role: "user" };
      const result = await this.courseRepository.getAllLessons(form);
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
  public async addLesson(data: any) {
    try {
      const result = await this.courseRepository.postLesson(data);
      if (result.status === 201) {
        return 1;
      } else {
        return 2;
      }
    } catch (error) {
      console.log(error);
    }
  }
  public async updateLesson(id: number, data: any) {
    try {
      const result = await this.courseRepository.updateLesson(id, data);
      if (result.status === 200) {
        return 1;
      } else {
        return 2;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
export default LessonService;
