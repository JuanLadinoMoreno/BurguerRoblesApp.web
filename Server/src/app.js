
import express from 'express'
import http from 'http'
import { Server } from 'socket.io';
import cors from 'cors'
import mongoose from 'mongoose'
import session from 'express-session';

import cookieParser from 'cookie-parser';

import productsRouter from './routes/products.router.js'
import categoriesRouter from './routes/categories.router.js'
import cartsRouter from './routes/carts.router.js'
import sessionRouter from './routes/session.router.js'
// import errorHandlere  from './middlewares/errors/index.js';
import {errorHandler} from './middlewares/errors/index.js';

import { connectMDb } from '../src/config/database.js';


import 'dotenv/config'



const PORT = process.env.PORT;

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use(cors({
    // origin: 'http://127.0.0.1:5173',
    origin: 'http://localhost:5173',
    credentials: true
}))


app.use(cookieParser())



app.use('/api/products', productsRouter)
app.use('/api/categories', categoriesRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/users', sessionRouter)


app.use(errorHandler)



const manin = async => {
    
    // se conecta a la bd de mongoose
    connectMDb()

    const httpServer = app.listen(PORT, () => {
        console.log('Servidor preparado!!');
    });

}

manin()








