import { Router} from "express";
import { addProdCart, createCart, deleteCartById, deleteProductCart, getCartById, getAllCarts, updProductQuant, getUserCarts, finPurchase } from "../controllers/carts.controller.js";
import { authMdw } from "../middlewares/auth.middleware.js";
import { verifyAdminRoleMdw } from "../middlewares/verifyRole.middleware.js";


const router = Router()

router.post('/', authMdw, verifyAdminRoleMdw, createCart)

router.get('/', authMdw, verifyAdminRoleMdw, getAllCarts)

router.get('/user/:uid', authMdw, verifyAdminRoleMdw, getUserCarts)//

router.get('/:cid', authMdw, verifyAdminRoleMdw, getCartById)

router.delete('/:cid', authMdw, verifyAdminRoleMdw, deleteCartById)


//Agrega producto al carrito
router.post('/:cid/product/:pid', authMdw, verifyAdminRoleMdw, addProdCart)

//Actualiza cantidad de producto
router.put('/:cid/product/:pid', authMdw, verifyAdminRoleMdw, updProductQuant)

//elimina producto del carrito
router.delete('/:cid/product/:pid', authMdw, verifyAdminRoleMdw, deleteProductCart)


router.get('/:cid/purchase', authMdw, finPurchase)

export default router