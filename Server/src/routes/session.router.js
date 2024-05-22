import { Router } from "express";
import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { createAccessToken } from "../libs/jwts.js";
import { authMdw } from "../middlewares/auth.middleware.js";
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from "../config.js";


// import {userIsLoggedIn} from "../middlewares/auth.middleware.js";


// import CartsManager from "../dao/dbManager/CartsManager.js";

const router = Router()


router.post('/register', async (req, res) => {

    try {
        const { firstName, lastName, email, age, password } = req.body

        const userFound = await userModel.findOne({ email });

        if (userFound)
            return res.status(400).json({
                message: ["The email is already in use"],
            });

        const pswHash = await bcryptjs.hash(password, 11)


        const usr = await userModel.create({
            firstName,
            lastName,
            age: +age,
            email,
            password: pswHash
        })

        console.log('usrusrusrusr', usr);

        // crea token
        // const token = await createAccessToken({
        //     id: usr._id,
        // });
        // //asigna token a cookie
        // res.cookie("token", token
        //     // {
        //     //     httpOnly: process.env.NODE_ENV == "development",
        //     //     secure: true,
        //     //     sameSite: "none",
        //     // }
        // );


        // console.log('usr', usr);


        res.json({
            id: usr._id,
            firstName: usr.firstName,
            email: usr.email
        })

        // res.redirect('http://127.0.0.1:5173/')
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ errorpostresgister: err })
    }
})

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

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send('Invalid field!')
            // return res.status(400).json({ error: 'Invalid credentials!' })
        }

        const userFound = await userModel.findOne({ email });

        if (!userFound)
            return res.status(400).json({
                message: ["The email does not exist"],
            });

        const isMatch = await bcryptjs.compare(password, userFound.password);
        if (!isMatch) {
            return res.status(400).json({
                message: ["Invalit credencials"],
            });
        }

        //crea token
        const token = await createAccessToken({ id: userFound._id })
        //guarda token en cookie
        res.cookie("token", token, {
            // httpOnly: process.env.NODE_ENV !== "development",
            httpOnly: false,
            secure: true,
            sameSite: "none",
        })

        //   const token = await createAccessToken({
        //     id: userFound._id,
        //     username: userFound.username,
        //   });

        res.json({
            id: userFound._id,
            fisrtsName: userFound.firstName,
            email: userFound.email,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post('/logout', (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    }
    )
    return res.sendStatus(200);
})

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
router.get('/profile', authMdw, async (req, res) => {
    //piden datos del perfil del usuario
    const userFound = await userModel.findById(req.user.id)

    if (!userFound) return res.status(400).json({ error: 'User not found!' })

    console.log(userFound)

    res.json({
        id: userFound._id,
        fisrtsName: userFound.firstName,
        email: userFound.email,
    });
})

router.get('/verify', async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.send(false).json({ message: "No autorizado" });

    // const userFound = await userModel.findOne({ email });

    jwt.verify(token, 'TOKEN_SECRET', async (error, user) => {
        if (error) return res.sendStatus(401).json({ message: "No autorizado" });

        const userFound = await userModel.findById(user.id);
        if (!userFound) return res.sendStatus(401).json({ message: "No autorizado" });

        return res.json({
            id: userFound._id,
            fisrtsName: userFound.firstName,
            email: userFound.email,
        });
    });

});




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