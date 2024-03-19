import express from "express";
import { CommentCourseService } from "../services/commentCourses.service";
import { IComment } from "../types";
import { MessageCodeResponse } from "../common/messageResponse.common";
import { StatusCode } from "../common/variableResponse.common";

export const commentCourseController = express.Router();
const commentCourseService = new CommentCourseService();
const msg = new MessageCodeResponse();
commentCourseController
  // Create comment
  .post("/create", async (req: express.Request, res: express.Response) => {
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
  .patch("/active/:id", async (req: express.Request, res: express.Response) => {
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
    "/delete/:id",
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
      const result = await commentCourseService.getAll();
      res
        .status(StatusCode.OK)
        .json({ msg: msg.GET("GET ALL COMMENTS COURSE"), data: result });
    } catch (error) {
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ msg: msg.INTERNAL_SERVER_ERROR("GET ALL COMMENTS COURSE") });
    }
  });
