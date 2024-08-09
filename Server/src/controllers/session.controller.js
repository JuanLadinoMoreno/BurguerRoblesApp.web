import { TOKEN_SECRET } from "../config/config.js";
import { createAccessToken } from "../libs/jwts.js";
// import userModel from "../dao/mongo/models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'
import UsersManager from "../dao/mongo/users.dao.js";

import CustomError from "../services/errors/CustomError.js";
import ErrorCodes from "../services/errors/errorCodes.js";
import { generateInvalidUserDataError } from "../services/errors/info.js";

import UsersService from "../services/users.services.js";


const usersManager = new UsersManager()
const usersService = new UsersService()

export const register = async (req, res, next) => {

    try {

        const { firstName, lastName, email, age, password } = req.body

        const usr = await usersService.createUser(firstName, lastName, age, email, password)
        
        // const userFound = await userModel.findOne({ email });
        
        if (usr) {
            console.log('usr.id', usr.id.firstName);

            return res.status(201).json({
                id: usr.id,
                firstName: usr.firstName,
                email: usr.email
            })
        }

    }
    catch (error) {
        // console.log(error)
        // if (error.message === 'El usuario ya existe') {
        //     return res.status(400).json({ message: error.message });
        // }
        // return res.status(500).json({ errorpostresgister: error })

        next(error); 
    }
}

// export const registerwww = async (req, res) => {

//     try {
//         const { firstName, lastName, email, age, password } = req.body



//         const userFound = await usersManager.createUser();
//         // const userFound = await userModel.findOne({ email });

//         if (userFound)
//             return res.status(400).json({
//                 message: ["The email is already in use"],
//             });

//         const usr = await usersManager.createUser(firstName, lastName, age, email, password)
//         if (!usr) {
//             return res.status(500)({ message: 'Something went wrong!' })
//         }


//         // const pswHash = await bcryptjs.hash(password, 11)


//         // const usr = await userModel.create({
//         //     firstName,
//         //     lastName,
//         //     age: +age,
//         //     email,
//         //     password: pswHash
//         // })

//         console.log('usrusrusrusr', usr);

//         // crea token
//         // const token = await createAccessToken({
//         //     id: usr._id,
//         // });
//         // //asigna token a cookie
//         // res.cookie("token", token
//         //     // {
//         //     //     httpOnly: process.env.NODE_ENV == "development",
//         //     //     secure: true,
//         //     //     sameSite: "none",
//         //     // }
//         // );


//         // console.log('usr', usr);


//         return res.status(201).json({
//             id: usr._id,
//             firstName: usr.firstName,
//             email: usr.email
//         })

//         // res.redirect('http://127.0.0.1:5173/')
//     }
//     catch (err) {
//         console.log(err)
//         return res.status(500).json({ errorpostresgister: err })
//     }
// }

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        
        // const userFound = await userModel.findOne({ email });
        const userFound = await usersService.onLogin(email, password)

        //crea token
        const token = await createAccessToken({ id: userFound.id })
        //guarda token en cookie
        res.cookie("token", token, {
            // httpOnly: process.env.NODE_ENV !== "development",
            httpOnly: false,
            secure: true,
            sameSite: "none",
        })

        res.json({
            status: 'success',
            payload: {
                id: userFound.id,
                fisrtsName: userFound.firstName,
                email: userFound.email,
            }
        });

    } catch (error) {
        // return res.status(500).json({ message: error.message, otro: 'jejeje' });
        next(error)
    }
}

export const logout = (req, res) => {
    try {

        res.cookie('token', "", {
            expires: new Date(0)
        }
        )
        return res.sendStatus(200);
        
    } catch (error) {
        console.log(error);        
    }
}

export const dash = async (req, res, next) => {
    try {
        //piden datos del perfil del usuario
        // const userFound = await userModel.findById(req.user.id)
        const userFound = await usersService.findUserById(req.user.id);
    
        if (!userFound) return res.status(400).json({ message: 'User not found!' })
    
        console.log(userFound)
    
        res.json({
            id: userFound._id,
            fisrtsName: userFound.firstName,
            email: userFound.email,
        });
        
    } catch (error) {
        next(error)
    }
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.send(false).json({ message: "No autorizado" });

    // const userFound = await userModel.findOne({ email });

    jwt.verify(token, 'TOKEN_SECRET', async (error, user) => {
        if (error) return res.sendStatus(401).json({ message: "No autorizado" });

        // const userFound = await userModel.findById(user.id);
        const userFound = await usersService.findUserById(user.id);
        if (!userFound) return res.sendStatus(401).json({ message: "No autorizado" });

        return res.json({
            id: userFound._id,
            fisrtsName: userFound.firstName,
            email: userFound.email,
        });
    });

}