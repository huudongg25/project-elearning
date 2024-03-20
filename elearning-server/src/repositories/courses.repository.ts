import { Op } from "sequelize";
import { Course } from "../entities/courses.entity";
import { Lesson } from "../entities/lessons.entity";
import { Category } from "../entities/categories.entity";
import { RatingCourse } from "../entities/ratingCourse.entity";
import { CommentCourse } from "../entities/commentCourse.entity";

export class CourseRepository {
  async createCourse(formCourse: any): Promise<void> {
    await Course.create(formCourse);
  }
  async deleteCourse(id: number): Promise<void> {
    await Course.destroy({ where: { id } });
  }

  async updateCourse(id: number, formUpdate: any): Promise<any> {
    await Course.update(formUpdate, { where: { id } });
  }

  async getAllCourses(
    keySort: string,
    offset: number,
    limit: number,
    search: string,
    sort: string
  ): Promise<any> {
    if (search === "undefined" && sort === "undefined") {
      return await Course.findAll({
        offset: offset,
        limit: limit,
      });
    }
    if (search !== "undefined" && sort === "undefined") {
      return await Course.findAll({
        offset: offset,
        limit: limit,
        where: {
          courseName: {
            [Op.like]: `%${search}%`,
          },
        },
      });
    }
    if (search === "undefined" && sort !== "undefined") {
      return await Course.findAll({
        offset: offset,
        limit: limit,
        order: [[keySort, sort]],
      });
    }
    if (search !== "undefined" && sort !== "undefined") {
      return await Course.findAll({
        offset: offset,
        limit: limit,
        where: {
          courseName: {
            [Op.like]: `%${search}%`,
          },
        },
        order: [[keySort, sort]],
      });
    }
  }

  async getDetailCourse(id: number): Promise<any> {
    return await Course.findAll({
      include: [
        { model: Lesson },
        { model: Category },
        { model: RatingCourse },
        { model: CommentCourse },
      ],
      where: {
        id: id,
      },
    });
  }
}
