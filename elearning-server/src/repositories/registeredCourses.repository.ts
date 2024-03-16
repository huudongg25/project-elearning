import { Op } from "sequelize";
import { RegisteredCourse } from "../entities/registeredCourse.entity";

export class RegisterCourseRepository {
  async create(form: any): Promise<void> {
    await RegisteredCourse.create(form);
  }

  async getAll(
    keySort: string,
    search: string,
    sort: string,
    offset: number,
    limit: number
  ): Promise<any> {
    if (search === "undefined" && sort === "undefined") {
      return await RegisteredCourse.findAll({
        offset: offset,
        limit: limit,
      });
    }
    if (search !== "undefined" && sort === "undefined") {
      return await RegisteredCourse.findAll({
        offset: offset,
        limit: limit,
        where: {
          createdAt: {
            [Op.like]: `%${search}%`,
          },
        },
      });
    }
    if (search === "undefined" && sort !== "undefined") {
      return await RegisteredCourse.findAll({
        order: [[keySort, sort]],
      });
    }
    if (search !== "undefined" && sort !== "undefined") {
      return await RegisteredCourse.findAll({
        where: {
          courseName: {
            [Op.like]: `%${search}%`,
          },
        },
        order: [[keySort, sort]],
      });
    }
  }
}
