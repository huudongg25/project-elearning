import express from "express";
import { RateService } from "../services/rates.service";
import { IRate } from "../types";
import { StatusCode } from "../common/variableResponse.common";
import { MessageCodeResponse } from "../common/messageResponse.common";

export const rateController = express.Router();
const rateService = new RateService();
const msg = new MessageCodeResponse();
rateController
  // Create Rate
  .post("/create", async (req: express.Request, res: express.Response) => {
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
  .patch("/active/:id", async (req: express.Request, res: express.Response) => {
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
    "/delete/:id",
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
      const result = await rateService.getAll();
      res.status(StatusCode.OK).json({ msg: msg.GET("RATES COURSE"), data: result });
    } catch (error) {
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ msg: msg.INTERNAL_SERVER_ERROR("GET RATES COURSE") });
    }
  });
