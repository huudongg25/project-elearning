import express from "express";
import { RateService } from "../services/rates.service";
import { IRate } from "../types";

export const rateController = express.Router();
const rateService = new RateService();

rateController
  // Create Rate
  .post("/create", async (req: express.Request, res: express.Response) => {
    try {
      const form: IRate = req.body;
      await rateService.create(form);
      res.status(201).json({ msg: "Created rate" });
    } catch (error) {
      res.status(500).json({ msg: "Error creating rate: SERVER" });
    }
  })
  // isActive
  .patch("/active/:id", async (req: express.Request, res: express.Response) => {
    try {
      const rateId = Number(req.params.id);
      await rateService.active(rateId);
      res.status(200).json({ msg: "Active rate" });
    } catch (error) {
      res.status(500).json({ msg: "Error active rate: SERVER" });
    }
  })
  // Delete rate
  .delete(
    "/delete/:id",
    async (req: express.Request, res: express.Response) => {
      try {
        const rateId = Number(req.params.id);
        await rateService.delete(rateId);
        res.status(200).json({ msg: "Deleted rate" });
      } catch (error) {
        res.status(500).json({ msg: "Error deleting rate: SERVER" });
      }
    }
  )
  // Get all rates
  .get("/get-all", async (req: express.Request, res: express.Response) => {
    try {
      const result = await rateService.getAll();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ msg: "Error getting rates: SERVER" });
    }
  });
