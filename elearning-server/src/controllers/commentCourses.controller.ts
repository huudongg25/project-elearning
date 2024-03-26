import express from "express";
import { CommentCourseService } from "../services/commentCourses.service";
import { IComment } from "../types";
import { MessageCodeResponse } from "../common/messageResponse.common";
import { StatusCode } from "../common/variableResponse.common";
import { Authorization } from "../middlewares/auth.middleware";

export const commentCourseController = express.Router();
const commentCourseService = new CommentCourseService();
const msg = new MessageCodeResponse();
commentCourseController
  // Create comment
  .post("/create", 
  // Authorization,
  async (req: express.Request, res: express.Response) => {
    try {
      const form: IComment = req.body;
      await commentCourseService.create(form);
      res
        .status(StatusCode.CREATED)
        .json({ msg: msg.CREATED("COMMENT COURSE") });
    } catch (error) {
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ msg: msg.INTERNAL_SERVER_ERROR("COMMENT COURSE") });
    }
  })
  // isActive
  .patch("/active/:id", Authorization,async (req: express.Request, res: express.Response) => {
    try {
      const commentId = Number(req.params.id);
      await commentCourseService.active(commentId);
      res.status(StatusCode.OK).json({ msg: msg.UPDATE("COMMENT COURSE") });
    } catch (error) {
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ msg: msg.INTERNAL_SERVER_ERROR("UPDATE COMMENT COURSE") });
    }
  })
  // Delete comment
  .delete(
    "/delete/:id",Authorization,
    async (req: express.Request, res: express.Response) => {
      try {
        const commentId = Number(req.params.id);
        await commentCourseService.delete(commentId);
        res.status(StatusCode.OK).json({ msg: msg.DELETE("COMMENT COURSE") });
      } catch (error) {
        res
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .json({ msg: msg.INTERNAL_SERVER_ERROR("DELETE COMMENT COURSE") });
      }
    }
  )
  // Get all comments
  .get("/get-all", async (req: express.Request, res: express.Response) => {
    try {
      const key = String(req.query.key)
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || 3
      const courseId = Number(req.query.courseId) || undefined
      const result = await commentCourseService.getAll(key,page,limit,courseId);
      res
        .status(StatusCode.OK)
        .json({ msg: msg.GET("ALL COMMENTS COURSE"), data: result });
    } catch (error) {
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ msg: msg.INTERNAL_SERVER_ERROR("GET ALL COMMENTS COURSE") });
    }
  })
  // Get count of comments
  .get('/count', async (req:express.Request,res:express.Response) => {
    try {
      const key = String(req.query.key)
      const courseId = Number(req.query.courseId)
      const result = await commentCourseService.getCountComment(key,courseId);
      res.status(StatusCode.OK).json({msg:msg.GET("COUNT COMMENT"), count: result})
    } catch (error) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ msg: msg.INTERNAL_SERVER_ERROR("GET COUNT COMMENT")})
    }
  })
