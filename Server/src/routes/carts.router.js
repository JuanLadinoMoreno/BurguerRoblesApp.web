import { Router} from "express";
import { addProdCart, createCart, deleteCartById, deleteProductCart, getCartById, getCarts, updProductQuant } from "../controllers/carts.controller.js";


const router = Router()

router.post('/', createCart)

router.get('/', getCarts)

router.get('/:cid', getCartById)

router.delete('/:cid', deleteCartById)


//Agrega producto al carrito
router.post('/:cid/product/:pid', addProdCart)

//Actualiza cantidad de producto
router.put('/:cid/product/:pid', updProductQuant)

//elimina producto del carrito
router.delete('/:cid/product/:pid', deleteProductCart)



export default router