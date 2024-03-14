import {Express} from 'express';
import { authController } from '../controllers/auth.controller';
import { userController } from '../controllers/users.controller';
export const routers = (app:Express) => {
    app.use('/auth',authController);
    app.use('/users',userController)
}
