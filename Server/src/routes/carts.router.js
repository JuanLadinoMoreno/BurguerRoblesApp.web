import { Router} from "express";
import { createCart, getCarts } from "../controllers/carts.controller.js";


const router = Router()

router.get('/', getCarts)

// router.get('/:id', async (req, res) => {
//     const id = +req.params.id
//     const product = await cartsManager.findProductById(id)
//     res.json(product)
// });

router.post('/', createCart)

// router.post('/:cid/product/:pid',async (req, res) => {
//     const prod = req.body

//     const cid = +req.params.cid
//     const pid = +req.params.pid
//     const cartCreado = await cartsManager.createProductInCart(prod, cid, pid)
//     res.status(201).json(prod)
// })


export default router