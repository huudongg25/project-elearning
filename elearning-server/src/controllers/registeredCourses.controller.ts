import express from 'express';
import { RegisterCourseService } from '../services/registeredCourses.service';

export const registerCourseController = express.Router();
const registerCourseService = new RegisterCourseService();

registerCourseController
// Create
.post('/create/:id', async (req:express.Request, res:express.Response) => {
    try {
        const userId = Number(req.params.id);
        const form = req.body
        await registerCourseService.create(userId, form);
        res.status(201).json({msg:"Created register course"})
    } catch (error) {
        console.log(error);
        
        res.status(500).json({msg:'Error creating course: SERVER'})
    }
})