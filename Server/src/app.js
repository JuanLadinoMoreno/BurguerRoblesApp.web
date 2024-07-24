
import express from 'express'
import http from 'http'
import { Server } from 'socket.io';
import cors from 'cors'
import mongoose from 'mongoose'
import session from 'express-session';

import cookieParser from 'cookie-parser';

import productsRouter from './routes/products.router.js'
import realtimeProducts from './routes/realtimeProducts.router.js'
import categoriesRouter from './routes/categories.router.js'
import cartsRouter from './routes/carts.router.js'
import sessionRouter from './routes/session.router.js'
// import errorHandlere  from './middlewares/errors/index.js';
import {errorHandler} from './middlewares/errors/index.js';



// import mongoStorage from './session/mongoStorage.js';        //revisar
// import userModel from './models/user.model.js';


import { connectMDb } from '../src/config/database.js';


import 'dotenv/config'
import { log } from 'console';



// import ProductManager from './ProductManager.js';

//  const productsRouter = require('./routes/products.router.js')

const PORT = process.env.PORT;

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use(cors({
    // origin: 'http://127.0.0.1:5173',
    origin: 'http://localhost:5173',
    credentials: true
}))

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });

app.use(cookieParser())
// app.use(mongoStorage)// guarda session en mongoDB        revisar



app.use('/api/products', productsRouter)
// app.use('/api/realTimeProducts', realtimeProducts)
app.use('/api/categories', categoriesRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/session', sessionRouter)


app.use(errorHandler)



const manin = async => {
    
    // se conecta a la bd de mongoose
    connectMDb()

    const httpServer = app.listen(PORT, () => {
        console.log('Servidor preparado!!');
    });
    app.set('ws', httpServer)

    
    // wsServer.on('connection', (socket) => {
    //     console.log('nuevo cliente conectado');
    
        // socket.on('usr:deleteProduct', (id) => {
        //     console.log('bbbbbbbbbbbbbbbbbb', id);
        // })
    
        // opcion 1  , => la opcion2 esta en raltimeProducts.router
        // socket.on('productDataForm', (data) => {
        //     console.log('lado servidor',data);
        //     socket.emit('newProduct', data)
        // })
    
    // })
}

manin()








