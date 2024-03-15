import express from "express";
import { CourseService } from "../services/courses.service";
import { uploadImage } from "../configs/multerCloudinary.config";
export const courseController = express.Router();
const courseService = new CourseService();

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
        res.status(201).json({ msg: "Course created" });
      } catch (error) {
        res.status(500).json({ msg: "Error creating course: SERVER" });
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
        res.status(200).json({ msg: "Course deleted" });
      } catch (error) {
        res.status(500).json({ msg: "Error deleting Course: SERVER" });
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
        const formUpdate = req.body
        await courseService.updateCourse(id,formUpdate,fileImage);
        res.status(200).json({ msg: "Course updated" });
      } catch (error) {
        res.status(500).json({ msg: "Error updating Course: SERVER" });
      }
    }
  )
//   Get Courses (search, sort, page)
.get('/getall-courses', async (req:express.Request, res:express.Response) => {
    try {
        const search = String(req.query.search) || "";
        const sort = String(req.query.sort) || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const keySort = String(req.query.key) 
        const result = await courseService.getAllCourses(keySort,search,sort,page,limit)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({msg: "Error getting all courses: SERVER"})
    }
})
// Detail course
.get('/detail-course/:id', async (req:express.Request, res: express.Response) => {
    try {
        const courseId = Number(req.params.id);
        const result = await courseService.getDetailCourse(courseId);
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({msg:"Error getting detail course: SERVER"})
    }
})
