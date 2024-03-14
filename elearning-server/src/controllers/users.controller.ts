import express from "express";
import { UserService } from "../services/users.service";
import { uploadAvatar } from "../configs/multerCloudinary.config";
export const userController = express.Router();

const userService = new UserService();

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
        res.status(201).json({ msg: "Created OTP" });
      } catch (error: any) {
        if (error.status === 404) {
          res.status(error.status).json(error);
        } else {
          res.status(500).json({ msg: "Error creating OTP: SERVER" });
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
      res.status(200).json(result);
    } catch (error: any) {
      if (error.status === 400) {
        res.status(error.status).json(error);
      } else {
        res.status(500).json({ msg: "Error confirming OTP: SERVER" });
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
        res.status(200).json({ msg: "Changed Password" });
      } catch (error) {
        res.status(500).json({ msg: "Error changing password" });
      }
    }
  )
  // Update profile User
  .patch(
    "/update-profile/:id",
    uploadAvatar.single("avatar"),
    async (req: express.Request, res: express.Response) => {
      try {
        const id = Number(req.params.id);
        const fileAvatar = req.file as Express.Multer.File;
        const formUpdate = req.body;
        await userService.updateProfile(id, formUpdate, fileAvatar);
        res.status(200).json({ msg: "Updated Profile" });
      } catch (error) {
        res.status(500).json({ msg: "Error updating profile: SERVER" });
      }
    }
  )
  // Block & Block comment User
  .patch("/block/:id", async (req: express.Request, res: express.Response) => {
    try {
      const id = Number(req.params.id);
      const key = req.query.key;
      await userService.block(id, key);
      res.status(200).json({ msg: "Blocked Success" });
    } catch (error) {
      res.status(500).json({ msg: "Error blocking User: SERVER" });
    }
  })
  // Unblock & Unblock comment User
  .patch(
    "/unblock/:id",
    async (req: express.Request, res: express.Response) => {
      try {
        const id = Number(req.params.id);
        const key = req.query.key;
        await userService.unblock(id, key);
        res.status(200).json({ msg: "Unblock Success" });
      } catch (error) {
        res.status(500).json({ msg: "Error Unblocking User: SERVER" });
      }
    }
  );
