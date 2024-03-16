import express from 'express';
import { AdminService } from '../services/admins.service';
import { uploadAvatar } from '../configs/multerCloudinary.config';

export const adminController = express.Router();
const adminService = new AdminService();
adminController
// Create Admin
.post('create', uploadAvatar.single('avatar'),async (req:express.Request, res:express.Response) => {
    try {
        const fileAvatar = req.file as Express.Multer.File
        const form = {
            ...req.body,
             avatar: fileAvatar.path
        }
        await adminService.create(form);
        res.status(201).json({msg:"Created admin"})
    } catch (error) {
        res.status(500).json({msg:"Error creating admin: SERVER"})
    }
})
// Delete admin
.delete('/delete/:id', async (req:express.Request, res:express.Response) => {
    try {
        const adminId = Number(req.params.id);
        await adminService.delete(adminId);
        res.status(201).json({msg:"Deleted admin"})
    } catch (error) {
        res.status(500).json({msg:"Error deleting admin: SERVER"})
    }
})
// Update admin
.patch('/update/:id', uploadAvatar.single('avatar'),async (req:express.Request, res:express.Response) => {
    try {
        const adminId = Number(req.params.id);
        const fileAvatar = req.file as Express.Multer.File
        const avatar = fileAvatar.path
        await adminService.update(adminId, avatar);
        res.status(201).json({msg:"Updated admin"})
    } catch (error) {
        res.status(500).json({msg:"Error updating admin: SERVER"})
    }
})