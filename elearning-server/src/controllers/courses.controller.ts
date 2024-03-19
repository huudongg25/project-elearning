import express from "express";
import { CourseService } from "../services/courses.service";
import { uploadImage } from "../configs/multerCloudinary.config";
import { StatusCode } from "../common/variableResponse.common";
import { MessageCodeResponse } from "../common/messageResponse.common";
export const courseController = express.Router();
const courseService = new CourseService();
const msg = new MessageCodeResponse();
courseController
  // Create Course
  .post(
    "/create-course",
    uploadImage.single("image"),
    async (req: express.Request, res: express.Response) => {
      try {
        const formCourse = {
          ...req.body,
          categoryId: Number(req.body.categoryId),
          level: Number(req.body.level),
          price: Number(req.body.price),
        };
        const fileImage = req.file as Express.Multer.File;
        await courseService.createCourse(formCourse, fileImage);
        res.status(StatusCode.CREATED).json({ msg: msg.CREATED("COURSE") });
      } catch (error) {
        console.log(error);
        
        res
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .json({ msg: msg.INTERNAL_SERVER_ERROR("COURSE") });
      }
    }
  )
  // Delete Course
  .delete(
    "/delete-course/:id",
    async (req: express.Request, res: express.Response) => {
      try {
        const id = Number(req.params.id);
        await courseService.deleteCourse(id);
        res.status(StatusCode.OK).json({ msg: msg.DELETE("COURSE") });
      } catch (error) {
        res
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .json({ msg: msg.INTERNAL_SERVER_ERROR("COURSE DELETE") });
      }
    }
  )
  // Update Course
  .patch(
    "/update-course/:id",
    uploadImage.single("image"),
    async (req: express.Request, res: express.Response) => {
      try {
        const id = Number(req.params.id);
        const fileImage = req.file as Express.Multer.File;
        const formUpdate = req.body;
        await courseService.updateCourse(id, formUpdate, fileImage);
        res.status(StatusCode.OK).json({ msg: msg.UPDATE("COURSE") });
      } catch (error) {
        res
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .json({ msg: msg.INTERNAL_SERVER_ERROR("COURSE UPDATE") });
      }
    }
  )
  //   Get Courses (search, sort, page)
  .get(
    "/getall-courses",
    async (req: express.Request, res: express.Response) => {
      try {
        const search = String(req.query.search) || "";
        const sort = String(req.query.sort) || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const keySort = String(req.query.key);
        const result = await courseService.getAllCourses(
          keySort,
          search,
          sort,
          page,
          limit
        );
        res.status(StatusCode.OK).json({ msg: msg.GET("COURSES"), data: result });
      } catch (error) {
        res
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .json({ msg: msg.INTERNAL_SERVER_ERROR("GET ALL COURSES") });
      }
    }
  )
  // Detail course
  .get(
    "/detail-course/:id",
    async (req: express.Request, res: express.Response) => {
      try {
        const courseId = Number(req.params.id);
        const result = await courseService.getDetailCourse(courseId);
        res
          .status(StatusCode.OK)
          .json({ msg: msg.GET("COURSE DETAIL"), data: result });
      } catch (error) {
        res
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .json({ msg: msg.INTERNAL_SERVER_ERROR("GET DETAIL COURSE") });
      }
    }
  );
