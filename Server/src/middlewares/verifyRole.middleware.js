import mongoose from "mongoose";
import userModel from "../dao/mongo/models/user.model.js"


export const verifyAdminRoleMdw = async (req, res, next) => {
    try {
        const usrId = new mongoose.Types.ObjectId(req.user)
        // const usrId = req.user
        console.log('usrId', usrId);

        const userfind = await userModel.findOne(
            { 
                _id: usrId,
                role: 'admin'
             }
            // {
            //     _id: 1,
            //     firstName: 0,
            //     lastName: 0,
            //     age: 0,
            //     email: 0,
            //     password: 0,
            //     createdAt: 0,
            //     updatedAt: 0,
            //     role: 0
            // }
        )
        console.log('userfind', userfind);
        if (!userfind) {
            return res.status(404).json({
                message: ["You do not have permissions!"],
            });
        }

        next()
        // return res.status(200).json(userfind)

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error,
        });
    }


}


export const verifyUserRoleMdw = async (req, res, next) => {
    try {
        const usrId = new mongoose.Types.ObjectId(req.user)
        // const usrId = req.user
        console.log('usrId', usrId);

        const userfind = await userModel.findOne(
            { 
                _id: usrId,
                role: 'user'
             }
            // {
            //     _id: 1,
            //     firstName: 0,
            //     lastName: 0,
            //     age: 0,
            //     email: 0,
            //     password: 0,
            //     createdAt: 0,
            //     updatedAt: 0,
            //     role: 0
            // }
        )
        // console.log('userfind', userfind);
        if (!userfind) {
            return res.status(404).json({
                message: ["You do not have permissions!"],
            });
        }

        next()
        // return res.status(200).json(userfind)

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error,
        });
    }


}