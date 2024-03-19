import express from "express";
import { LessonService } from "../services/lessons.service";
import { ILesson } from "../types";
import { MessageCodeResponse } from "../common/messageResponse.common";
import { StatusCode } from "../common/variableResponse.common";

export const lessonController = express.Router();
const lessonService = new LessonService();
const msg = new MessageCodeResponse();
lessonController
  // Create lesson
  .post(
    "/create-lesson",
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
    "/delete-lesson/:id",
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
    "/update-lesson/:id",
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
