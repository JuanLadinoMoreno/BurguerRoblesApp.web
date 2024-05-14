import { Router } from "express";
import userModel from "../dao/models/user.model.js";
// import {userIsLoggedIn} from "../middlewares/auth.middleware.js";


// import CartsManager from "../dao/dbManager/CartsManager.js";

const router = Router()

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        // console.log(req.body);

        if (!email || !password) {
            return res.status(400).send('Invalid credentials!')
            // return res.status(400).json({ error: 'Invalid credentials!' })
        }

        // 1. verificar que el usuario exista en la BD
        const user = await userModel.findOne({ email, password })
        if (!user) {
            return res.status(400).send('Invalid email or password!')
            // return res.status(401).json({ error: 'User not found!' })
        }

        // 2. crear nueva sesión si el usuario existe
        req.session.user = { id: user._id.toString(), email: user.email }

        // console.log('userrrrrr', user);
        console.log('req.session.user', req.session);
        res.send(user)
        // res.redirect('/')

    } catch (error) {
        console.log(error)
        res.status(500).send('Error login user!')
    }

})

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, age, password } = req.body

    try {
        const usr = await userModel.create({
            firstName,
            lastName,
            age: +age,
            email,
            password
        })


        console.log('usr', usr);


        res.json(usr)

        // res.redirect('http://127.0.0.1:5173/')
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: err })
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy(_ => {
        res.redirect('/')
    })
})

router.get('/profile', async (req, res) => {
    const user = req.session
    console.log('user', user);
    res.json(user)
})




router.get('/sesiones', (req, res) => {

    if (req.session.counter) {
        req.session.counter++
        return res.send(`Esta es su visita nro. ${req.session.counter}`)
    }

    req.session.counter = 1
    res.send('Bienvenido! Esta es su primer visita!')
})


export default router



// {
//     "firstName": "test1",
//     "lastName": "test1ape",
//     "age": 30,
//     "email": "test@gmail.com",
//     "password": "test123"
// }