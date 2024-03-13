import express from "express";
import { AuthService } from "../services/auth.service";
import { IRegister } from "../types";
import checkEmailRegister from "../middlewares/checkEmailRegister.middleware";

export const authController = express.Router();
const authService = new AuthService();

authController
  .post(
    "/register",
    checkEmailRegister,
    async (req: express.Request, res: express.Response) => {
      try {
        const formRegister: IRegister = req.body;
        await authService.register(formRegister);
        res.status(201).json({
          message: "Register successfully",
        });
      } catch (error) {
        res.status(500).json({ msg: "Error Register: SERVER" });
      }
    }
  )

  .post("/login", async (req: express.Request, res: express.Response) => {
    try {
      const { email, password } = req.body;
      const user = await authService.login(email, password);
      res.status(200).json(user);
    } catch (error: any) {
      if (error.status === 404) {
        res.status(error.status).json(error);
      } else if (error.status === 400) {
        res.status(error.status).json(error);
      } else {
        res.status(500).json({ msg: "Error Login: SERVER" });
      }
    }
  });
