import express, { NextFunction } from "express";
import { UserRepository } from "../repositories/users.repository";
const userRepository = new UserRepository()
const checkEmailRegister = async (req:any | express.Request,res:express.Response, next:NextFunction ) => {
    try {
        const email = req.body.email
        const result = await userRepository.getUserEmail(email)
        if (result) {
            res.status(404).json({msg: 'Email has been exist!'})
        }else {
            next()
        }
    } catch (error) {        
        res.status(500).json({msg: 'Error: Check email failed'})
    }
}

export default checkEmailRegister;