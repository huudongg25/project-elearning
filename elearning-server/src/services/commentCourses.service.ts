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

  async getAll(key:string,page:number,limit:number,courseId:number|undefined): Promise<any> {
    const offset = Math.ceil((page - 1) * limit)
    return await this._commentCourseRepository.getAll(key,offset,limit,courseId);
  }

  async getCountComment(key:string,courseId:number){
    return await this._commentCourseRepository.getCountComment(key,courseId)
  }
}
