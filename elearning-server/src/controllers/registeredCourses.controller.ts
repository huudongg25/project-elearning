import express from "express";
import { RegisterCourseService } from "../services/registeredCourses.service";
import { StatusCode } from "../common/variableResponse.common";
import { MessageCodeResponse } from "../common/messageResponse.common";
import { Authorization } from "../middlewares/auth.middleware";

export const registerCourseController = express.Router();
const registerCourseService = new RegisterCourseService();
const msg = new MessageCodeResponse();
registerCourseController
  // Create
  .post("/create", Authorization,async (req: express.Request, res: express.Response) => {
    try {
      const form = req.body;
      await registerCourseService.create(form);
      res
        .status(StatusCode.CREATED)
        .json({ msg: msg.CREATED("REGISTER COURSE") });
    } catch (error) {
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ msg: msg.INTERNAL_SERVER_ERROR("REGISTER COURSE") });
    }
  })
  // Get all
  .get("/get-all", async (req: express.Request, res: express.Response) => {
    try {
      const search = String(req.query.search) || "";
      const sort = String(req.query.sort) || "";
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;
      const keySort = String(req.query.key);
      const result = await registerCourseService.getAll(
        keySort,
        search,
        sort,
        page,
        limit
      );
      res
        .status(StatusCode.OK)
        .json({ msg: msg.GET("REGISTERS COURSE"), data: result });
    } catch (error) {
      console.log(error);
      
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ msg: msg.INTERNAL_SERVER_ERROR("GET ALL REGISTER COURSE") });
    }
  })
  // Thong ke doanh thu theo thang
  .get("/revenue", async (req: express.Request, res: express.Response) => {
    try {
      const month = String(req.query.month) || "";
      const year = String(req.query.year) || "";
      const quarter = String(req.query.quarter) || "";
      const result = await registerCourseService.revenue(month, year, quarter);
      res
        .status(StatusCode.OK)
        .json({ msg: msg.GET("REVENUE"), revenue: result });
    } catch (error) {
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ msg: msg.INTERNAL_SERVER_ERROR("REVENUE") });
    }
  })
  // Get by user
  .get('/get/:id', async (req: express.Request, res:express.Response) => {
    try {
      const id = Number(req.params.id);
      const result = await registerCourseService.getByUser(id);
      res
      .status(StatusCode.OK)
      .json({ msg: msg.GET("REGISTER COURSE BY USER"), data: result });
    } catch (error) {
      res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ msg: msg.INTERNAL_SERVER_ERROR("GET REGISTER COURSE BY USER") });
    }
  })
