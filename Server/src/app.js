
import express from 'express'
import http from 'http'
import { Server } from 'socket.io';
import cors from 'cors'

import productsRouter from './routes/products.router.js'
import realtimeProducts from './routes/realtimeProducts.router.js'

import cartsRouter from './routes/carts.router.js'
import ProductManager from './ProductManager.js';

//  const productsRouter = require('./routes/products.router.js')

const PORT = 8080;

const app = express();

app.use(express.urlencoded({ extended: 'true' }))
app.use(express.json())

app.use(cors({
    origin: '*'
}))

//server fazt
// const server = http.createServer(app)
// const io = new SocketServer(server, {
//     cors: {
//         origin: '*'
//     }
// })

// io.on('connection', socket => {
//     console.log(' client conected');
// })

app.use('/api/products', productsRouter)
app.use('/api/realTimeProducts', realtimeProducts)
// app.use('/api/carts', cartsRouter)

const httpServer = app.listen(PORT, () => {
    console.log('Servidor preparado!!');
});

//servidor socket.io
const wsServer = new Server(httpServer,{
    cors: {origin: '*' }
}
    
)

app.set('ws', wsServer)

wsServer.on('connection', (socket) => {
    console.log('nuevo cliente conectado');

    socket.on('productDataForm', (data) => {
        console.log('lado servidor',data);
    })

})





