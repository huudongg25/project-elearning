import { Course } from "../entities/courses.entity";
import { RatingCourse } from "../entities/ratingCourse.entity";
import { User } from "../entities/users.entity";

export class RateRepository {
  async create(form: any): Promise<void> {
    await RatingCourse.create(form);
  }

  async active(id: number): Promise<void> {
    await RatingCourse.update({ isActive: 1 }, { where: { id } });
  }

  async delete(id: number): Promise<void> {
    await RatingCourse.destroy({ where: { id } });
  }

  async getAll(key:string): Promise<any> {
    if (key === "admin") {
      return await RatingCourse.findAll({
        include: [{ model: User }, { model: Course }],
      });
    }else if(key === "user"){
      return await RatingCourse.findAll({
        include: [{ model: User }, { model: Course }],
        where: {
          isActive: 1
        }
      })
    }
  }
}
