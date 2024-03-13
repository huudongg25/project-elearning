import {Express} from 'express';
import { authController } from '../controllers/auth.controller';
export const routers = (app:Express) => {
    app.use('/auth',authController)
}
