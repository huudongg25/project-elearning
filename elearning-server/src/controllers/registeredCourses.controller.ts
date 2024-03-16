import express from 'express';
import { RegisterCourseService } from '../services/registeredCourses.service';

export const registerCourseController = express.Router();
const registerCourseService = new RegisterCourseService();

registerCourseController
// Create
.post('/create', async (req:express.Request, res:express.Response) => {
    try {
        const form = req.body
        await registerCourseService.create(form);
        res.status(201).json({msg:"Created register course"})
    } catch (error) {
        res.status(500).json({msg:'Error creating course: SERVER'})
    }
})
// Get all
.get('/get-all', async (req:express.Request, res:express.Response) => {
    try {
        const search = String(req.query.search) || "";
        const sort = String(req.query.sort) || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const keySort = String(req.query.key);
        const result = await registerCourseService.getAll(keySort,search,sort,page,limit);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({msg:'Error getting registeredCourse: SERVER'})
    }
})