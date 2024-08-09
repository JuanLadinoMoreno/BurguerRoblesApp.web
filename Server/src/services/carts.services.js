import productsDAO from "../dao/mongo/products.dao.js"
import CartsDAO from "../dao/mongo/carts.dao.js"
import UsersDAO from "../dao/mongo/users.dao.js"
import CustomError from "./errors/CustomError.js"
import ErrorCodes from "./errors/errorCodes.js"

import UsersService from "../services/users.services.js";

const usersDAO = new UsersDAO()
const cartsDAO = new CartsDAO()

const usersService = new UsersService()

export class CartsService {

    async createCart(idUser, cart) {

        // try {
        if (!idUser) {
            return CustomError.createError({
                name: 'User data error',
                cause: '',
                message: 'The user is not exists',
                code: ErrorCodes.INVALID_CREDENTIALS
            })
        }


        const findUser = await usersDAO.findUserById(idUser)
        if (!findUser) {
            return CustomError.createError({
                name: 'User data error',
                cause: '',
                message: 'The user is not found',
                code: ErrorCodes.INVALID_CREDENTIALS
            })
        }

        const cartUsr = { ...cart, user: idUser }

        const cartCreado = await cartsDAO.createCart(cartUsr)
        return cartCreado

        // res.status(201).json({status: 'succes'cartCreado})
        // } catch (error) {
        //     return res.status(500).json({ message: error.message })
        // }

    }


    async getAllCarts() {
        // try {s

        // let limit = +req.query.limit
        const carts = await cartsDAO.getCarts()
        return carts
        // if (limit > 0) return res.json(carts.slice(0, limit))
        // res.json(carts)

        // } catch (error) {
        //     return res.status(500).json({ message: error.message })
        // }

    }

    async getUserCarts(uid) {
        // try {
        // const userFound = await usersDAO.findUserById(uid)
        // if (!userFound)
        //     //  return res.status(400).json({ message: 'User not found!' })
        //     return CustomError.createError({
        //         name: 'User data error',
        //         cause: '',
        //         message: 'The user is not found',
        //         code: ErrorCodes.INVALID_CREDENTIALS
        //     })

        await usersService.findUserById(uid)


        // let limit = +req.query.limit
        const carts = await cartsDAO.getUserCarts(uid)
        return carts
        // if (limit > 0) return res.json(carts.slice(0, limit))
        // res.json(carts)

        // } catch (error) {
        //     console.log(error);
        //     return 
        // }

    }

    async getCartById(cid) {
        // try {

            // const id = req.params.cid
            const cart = await cartsDAO.getCartById(cid)
            if (!cart) {
                return CustomError.createError({
                    name: 'Cart data error',
                    cause: '',
                    message: 'The cart is not found',
                    code: ErrorCodes.INVALID_CREDENTIALS
                })
            }
            return cart
        // } catch (e) {
        //     return res.status(500).json({ message: error.message });
        // }
    }

    async deleteCartById (cartId){
        // try {
            const resp = await cartsDAO.deleteCart(cartId)
            return resp
    
            // if (!asa) return res.status(500).json({ message: `Carrito con ID ${cartId} no fue posibles ser eliminado, verifique que exista` })
    
            // res.status(200).json(casrtDeleted)
            // res.status(200).json({ message: `Carrito con ID ${cartId} eliminado exitosamente` })
        // } catch (error) {
        //     return res.status(500).json({ message: error.message })
        // }
    
    }
}