import express from "express";
import { LessonService } from "../services/lessons.service";
import { ILesson } from "../types";

export const lessonController = express.Router();
const lessonService = new LessonService();

lessonController
  // Create lesson
  .post(
    "/create-lesson",
    async (req: express.Request, res: express.Response) => {
      try {
        const formLesson: ILesson = req.body;
        await lessonService.createLesson(formLesson);
        res.status(201).json({
          msg: "Lesson created",
        });
      } catch (error) {
        res.status(500).json({ msg: "Error creating lesson: SERVER" });
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
        res.status(200).json({ msg: "Lesson deleted" });
      } catch (error) {
        res.status(500).json({ msg: "Error deleting lesson: SERVER" });
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
            res.status(200).json({ msg: "Lesson updated" });
        } catch (error) {
            res.status(500).json({ msg: "Error updating lesson: SERVER" });
        }
    }
  )
