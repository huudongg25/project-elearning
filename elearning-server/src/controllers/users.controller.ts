import express from "express";
import { UserService } from "../services/users.service";
import { uploadAvatar } from "../configs/multerCloudinary.config";
import { StatusCode } from "../common/variableResponse.common";
import { MessageCodeResponse } from "../common/messageResponse.common";
import { Authorization } from "../middlewares/auth.middleware";
export const userController = express.Router();

const userService = new UserService();
const msg = new MessageCodeResponse();
userController
  // Create OTP
  .post(
    "/create-otp",
    async (req: express.Request | any, res: express.Response) => {
      try {
        const email = req.body.email;
        const result = await userService.createOTP(email);
        req.session.email = email;
        res.cookie("otp", result, {
          expires: new Date(Date.now() + 300000),
          httpOnly: true,
        });
        res.status(StatusCode.CREATED).json({ msg: msg.CREATED("OTP") });
      } catch (error: any) {
        if (error.status === 404) {
          res.status(error.status).json({ msg: error.msg });
        } else {
          res
            .status(StatusCode.INTERNAL_SERVER_ERROR)
            .json({ msg: msg.INTERNAL_SERVER_ERROR("OTP") });
        }
      }
    }
  )
  // Confirm OTP
  .post("/confirm-otp", async (req: express.Request, res: express.Response) => {
    try {
      const otpUi = req.body.otp;
      const otp = req.cookies.otp;
      const result = await userService.confirmOTP(otpUi, otp);
      res.status(StatusCode.OK).json(result);
    } catch (error: any) {
      if (error.status === 400) {
        res.status(error.status).json(error);
      } else {
        res
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .json({ msg: msg.INTERNAL_SERVER_ERROR("CONFIRMED OTP") });
      }
    }
  })
  // Change Password
  .post(
    "/change-password",
    async (req: express.Request | any, res: express.Response) => {
      try {
        const email = req.session.email;
        const password = req.body.password;
        await userService.changePassword(email, password);
        res
          .status(StatusCode.CREATED)
          .json({ msg: msg.CREATED("NEW PASSWORD") });
      } catch (error) {
        res
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .json({ msg: msg.INTERNAL_SERVER_ERROR("CHANGE PASSWORD") });
      }
    }
  )
  // Update profile User
  .patch(
    "/update-profile/:id",
    Authorization,
    uploadAvatar.single("avatar"),
    async (req: express.Request, res: express.Response) => {
      try {
        const id = Number(req.params.id);
        const fileAvatar = req.file as Express.Multer.File;
        const formUpdate = req.body;
        await userService.updateProfile(id, formUpdate, fileAvatar);
        res.status(StatusCode.OK).json({ msg: msg.UPDATE("USER") });
      } catch (error) {
        res
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .json({ msg: msg.INTERNAL_SERVER_ERROR("UPDATE USER") });
      }
    }
  )
  // Block & Block comment User
  .patch("/block/:id",Authorization, async (req: express.Request, res: express.Response) => {
    try {
      const id = Number(req.params.id);
      const key = req.query.key;
      await userService.block(id, key);
      res.status(StatusCode.OK).json({ msg: msg.UPDATE("BLOCK USER") });
    } catch (error) {
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ msg: msg.INTERNAL_SERVER_ERROR("BLOCK USER") });
    }
  })
  // Unblock & Unblock comment User
  .patch(
    "/unblock/:id",Authorization,
    async (req: express.Request, res: express.Response) => {
      try {
        const id = Number(req.params.id);
        const key = req.query.key;
        await userService.unblock(id, key);
        res.status(StatusCode.OK).json({ msg: msg.UPDATE("UNBLOCK USER") });
      } catch (error) {
        res
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .json({ msg: msg.INTERNAL_SERVER_ERROR("UNBLOCK USER") });
      }
    }
  );
