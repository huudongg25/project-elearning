import ApiService from "../api/api.service";
import { IntfLesson } from "../types/interface";

class LessonRepository {
  private apiService: ApiService;
  constructor() {
    this.apiService = new ApiService();
  }
  async getAllLessons(form: any): Promise<any> {
    const result: any = await this.apiService.Get("Lessons/get-all", form);
    return result;
  }
  async postLesson(data: IntfLesson) {
    return await this.apiService.Post("/Lessons/create", data);
  }
  async updateLesson(id: number, data: any) {
    return await this.apiService.Patch("/Lessons/update", id, data);
  }
}

export default LessonRepository;
