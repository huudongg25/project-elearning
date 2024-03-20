import { CommentCourseRepository } from "../repositories/commentCourses.repository";
import { IComment } from "../types";

export class CommentCourseService {
  private _commentCourseRepository: CommentCourseRepository;
  constructor() {
    this._commentCourseRepository = new CommentCourseRepository();
  }

  async create(form: IComment): Promise<void> {
    await this._commentCourseRepository.create(form);
  }

  async active(commentId: number): Promise<void> {
    await this._commentCourseRepository.active(commentId);
  }

  async delete(commentId: number): Promise<void> {
    await this._commentCourseRepository.delete(commentId);
  }

  async getAll(key:string): Promise<any> {
    return await this._commentCourseRepository.getAll(key);
  }
}
