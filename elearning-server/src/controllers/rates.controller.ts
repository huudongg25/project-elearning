import express from "express";
import { RateService } from "../services/rates.service";
import { IRate } from "../types";
import { StatusCode } from "../common/variableResponse.common";
import { MessageCodeResponse } from "../common/messageResponse.common";
import { Authorization } from "../middlewares/auth.middleware";

export const rateController = express.Router();
const rateService = new RateService();
const msg = new MessageCodeResponse();
rateController
  // Create Rate
  .post("/create",
  // Authorization,
   async (req: express.Request, res: express.Response) => {
    try {
      const form: IRate = req.body;
      await rateService.create(form);
      res.status(StatusCode.CREATED).json({ msg: msg.CREATED("RATE COURSE") });
    } catch (error) {
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ msg: "Error creating rate: SERVER" });
    }
  })
  // isActive
  .patch("/active/:id",Authorization ,async (req: express.Request, res: express.Response) => {
    try {
      const rateId = Number(req.params.id);
      await rateService.active(rateId);
      res.status(StatusCode.OK).json({ msg: msg.UPDATE("RATE COURSE") });
    } catch (error) {
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ msg: msg.INTERNAL_SERVER_ERROR("UPDATE RATE COURSE") });
    }
  })
  // Delete rate
  .delete(
    "/delete/:id",Authorization,
    async (req: express.Request, res: express.Response) => {
      try {
        const rateId = Number(req.params.id);
        await rateService.delete(rateId);
        res.status(StatusCode.OK).json({ msg: msg.DELETE("RATE COURSE") });
      } catch (error) {
        res
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .json({ msg: msg.INTERNAL_SERVER_ERROR("DELETE RATE COURSE") });
      }
    }
  )
  // Get all rates
  .get("/get-all", async (req: express.Request, res: express.Response) => {
    try {
      const key = String(req.query.key)
      const result = await rateService.getAll(key);
      res.status(StatusCode.OK).json({ msg: msg.GET("RATES COURSE"), data: result });
    } catch (error) {
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ msg: msg.INTERNAL_SERVER_ERROR("GET RATES COURSE") });
    }
  })
  // Get one rate
  .get("/get-one", async (req: express.Request, res:express.Response) => {
    try {
      const form = req.query;
      const result = await rateService.getOneRate(form);
      res.status(StatusCode.OK).json({ msg: msg.GET("RATE COURSE"), data: result });
    } catch (error) {
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ msg: msg.INTERNAL_SERVER_ERROR("GET RATE COURSE") });
    }
  })
