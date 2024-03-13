import express from 'express';
import { UserService } from '../services/users.service';
export const userController = express.Router()

const userService = new UserService();