import { CommentCourse } from "../entities/commentCourse.entity";
import { Course } from "../entities/courses.entity";
import { User } from "../entities/users.entity";

export class CommentCourseRepository {
  async create(form: any): Promise<any> {
    await CommentCourse.create(form);
  }

  async active(id: number): Promise<void> {
    await CommentCourse.update({ isActive: 1 }, { where: { id } });
  }

  async delete(id: number): Promise<void> {
    await CommentCourse.destroy({ where: { id } });
  }

  async getAll(): Promise<any> {
    return await CommentCourse.findAll({
      include: [{ model: User }, { model: Course }],
    });
  }
}
