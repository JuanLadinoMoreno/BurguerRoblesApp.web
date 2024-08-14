import { Router } from "express";
// import userModel from "../models/user.model.js";
// import bcryptjs from "bcryptjs";
// import { createAccessToken } from "../libs/jwts.js";
import { authMdw } from "../middlewares/auth.middleware.js";
// import jwt from 'jsonwebtoken'
// import { TOKEN_SECRET } from "../config/config.js";
import { dash, deleteUserInactive, getUsers, getUsersById, login, logout, notifyInactiveUsers, register, verifyToken } from "../controllers/session.controller.js";


// import {userIsLoggedIn} from "../middlewares/auth.middleware.js";


// import CartsManager from "../dao/dbManager/CartsManager.js";

const router = Router()


router.post('/register', register)

// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body
//         // console.log(req.body);

//         if (!email || !password) {
//             return res.status(400).send('Invalid credentials!')
//             // return res.status(400).json({ error: 'Invalid credentials!' })
//         }

//         // 1. verificar que el usuario exista en la BD
//         const userFound = await userModel.findOne({ email })
//         if (!userFound) {
//             return res.status(400).send('User Not Found!')
//             // return res.status(401).json({ error: 'User not found!' })
//         }

//         const isMatch = await bcryptjs.compare(password, userFound.password)

//         if(!isMatch) return res.send(400).json({error: "Invalit credencials"});

//         //crea token
//         const token = await createAccessToken({id: userFound._id})
//         //guarda token en cookie
//         res.cookie("token", token)

//         // // 2. crear nueva sesión si el usuario existe
//         // req.session.user = { id: user._id.toString(), email: user.email }

//         res.json({
//             id: userFound._id,
//             firstName: userFound.firstName,
//             email: userFound.email
//         })

//     } catch (error) {
//         console.log(error)
//         res.status(500).send('Error login user!')
//     }

// })

router.post('/login', login);
// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body
//         // console.log(req.body);

//         if (!email || !password) {
//             return res.status(400).send('Invalid credentials!')
//             // return res.status(400).json({ error: 'Invalid credentials!' })
//         }

//         // 1. verificar que el usuario exista en la BD
//         const user = await userModel.findOne({ email, password })
//         if (!user) {
//             return res.status(400).send('Invalid email or password!')
//             // return res.status(401).json({ error: 'User not found!' })
//         }

//         // 2. crear nueva sesión si el usuario existe
//         req.session.user = { id: user._id.toString(), email: user.email }

//         // console.log('userrrrrr', user);
//         console.log('req.session.user', req.session);
//         res.send(user)
//         // res.redirect('/')

//     } catch (error) {
//         console.log(error)
//         res.status(500).send('Error login user!')
//     }

// })

// router.get('/logout', (req, res) => {
//     req.session.destroy(_ => {
//         res.redirect('/')
//     })
// })

//el middelware retorna al usuario que fue decodificado en JWT

router.post('/logout', logout)

router.get('/profile', authMdw, dash)

router.get('/verify', verifyToken);

router.get('/', getUsers)

router.get('/:uid', getUsersById)

router.delete('/:uid', deleteUserInactive)

router.delete('/', notifyInactiveUsers)




// router.get('/sesiones', (req, res) => {

//     if (req.session.counter) {
//         req.session.counter++
//         return res.send(`Esta es su visita nro. ${req.session.counter}`)
//     }

//     req.session.counter = 1
//     res.send('Bienvenido! Esta es su primer visita!')
// })


export default router



// {
//     "firstName": "test1",
//     "lastName": "test1ape",
//     "age": 30,
//     "email": "test@gmail.com",
//     "password": "test123"
// }