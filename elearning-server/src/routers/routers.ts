import {Express} from 'express';
import { authController } from '../controllers/auth.controller';
import { userController } from '../controllers/users.controller';
import { courseController } from '../controllers/courses.controller';
import { lessonController } from '../controllers/lessons.controller';
export const routers = (app:Express) => {
    app.use('/auth',authController);
    app.use('/users',userController);
    app.use('/courses',courseController);
    app.use('/lessons',lessonController);
}
