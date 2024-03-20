import express from "express";
import { LessonService } from "../services/lessons.service";
import { ILesson } from "../types";
import { MessageCodeResponse } from "../common/messageResponse.common";
import { StatusCode } from "../common/variableResponse.common";
import { Authorization } from "../middlewares/auth.middleware";
import { checkRole } from "../middlewares/checkRole.middleware";

export const lessonController = express.Router();
const lessonService = new LessonService();
const msg = new MessageCodeResponse();
lessonController
  // Create lesson
  .post(
    "/create-lesson",Authorization,checkRole,
    async (req: express.Request, res: express.Response) => {
      try {
        const formLesson: ILesson = req.body;
        await lessonService.createLesson(formLesson);
        res.status(StatusCode.CREATED).json({
          msg: msg.CREATED("LESSON"),
        });
      } catch (error) {
        res
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .json({ msg: msg.INTERNAL_SERVER_ERROR("LESSON") });
      }
    }
  )
  // Delete lesson
  .delete(
    "/delete-lesson/:id",Authorization,checkRole,
    async (req: express.Request, res: express.Response) => {
      try {
        const lessonId = Number(req.params.id);
        await lessonService.deleteLesson(lessonId);
        res.status(StatusCode.OK).json({ msg: msg.DELETE("LESSON") });
      } catch (error) {
        res
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .json({ msg: msg.INTERNAL_SERVER_ERROR("DELETE LESSON") });
      }
    }
  )
  // Update lesson
  .patch(
    "/update-lesson/:id",Authorization,
    async (req: express.Request, res: express.Response) => {
      try {
        const lessonId = Number(req.params.id);
        const formLesson: ILesson = req.body;
        await lessonService.updateLesson(lessonId, formLesson);
        res.status(StatusCode.OK).json({ msg: msg.UPDATE("LESSON") });
      } catch (error) {
        res
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .json({ msg: msg.INTERNAL_SERVER_ERROR("UPDATE LESSON") });
      }
    }
  );
