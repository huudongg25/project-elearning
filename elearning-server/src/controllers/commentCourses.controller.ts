import express from "express";
import { CommentCourseService } from "../services/commentCourses.service";
import { IComment } from "../types";

export const commentCourseController = express.Router();
const commentCourseService = new CommentCourseService();

commentCourseController
  // Create comment
  .post("/create", async (req: express.Request, res: express.Response) => {
    try {
      const form: IComment = req.body;
      await commentCourseService.create(form);
      res.status(201).json({ msg: "Created comment" });
    } catch (error) {
      res.status(500).json({ msg: "Error creating comment: SERVER" });
    }
  })
  // isActive
  .patch("/active/:id", async (req: express.Request, res: express.Response) => {
    try {
      const commentId = Number(req.params.id);
      await commentCourseService.active(commentId);
      res.status(200).json({ msg: "Active comment" });
    } catch (error) {
      res.status(500).json({ msg: "Error active comment: SERVER" });
    }
  })
  // Delete comment
  .delete(
    "/delete/:id",
    async (req: express.Request, res: express.Response) => {
      try {
        const commentId = Number(req.params.id);
        await commentCourseService.delete(commentId);
        res.status(200).json({ msg: "Deleted comment" });
      } catch (error) {
        res.status(500).json({ msg: "Error deleting comment: SERVER" });
      }
    }
  )
  // Get all comments
  .get("/get-all", async (req: express.Request, res: express.Response) => {
    try {
      const result = await commentCourseService.getAll();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ msg: "Error getting comments: SERVER" });
    }
  });
