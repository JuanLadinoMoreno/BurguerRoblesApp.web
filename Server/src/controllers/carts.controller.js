import mongoose from "mongoose";
import CartsManager from "../dao/dbManager/CartsManager.js";
import userModel from "../dao/mongo/models/user.model.js";

const cartsManager = new CartsManager()

export const createCart = async (req, res) => {
    
    try {
        const usrId = new mongoose.Types.ObjectId(req.user.id)
        // const userfind = await userModel.findOne({ _id: usrId }) //SE TENDRAÍA QUE VALIDAR??

        const cart = {...req.body, user: usrId}  //poner id usuario en cart
        const cartCreado = await cartsManager.createCart(cart)
        res.status(201).json(cartCreado)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

export const getAllCarts = async (req, res) => {
    try {

        let limit = +req.query.limit
        const carts = await cartsManager.getCarts()
        if (limit > 0) return res.json(carts.slice(0, limit))
        res.json(carts)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}


export const getUserCarts = async (req, res) => {
    try {
        // console.log(req.user);
        // const usrId = new mongoose.Types.ObjectId(req.user.id)
        const usrId = req.params.uid

        const userFound = await userModel.findOne({_id: usrId})
        if (!userFound) return res.status(400).json({ message: 'User not found!' })

        let limit = +req.query.limit
        const carts = await cartsManager.getUserCarts(usrId)
        if (limit > 0) return res.json(carts.slice(0, limit))
        res.json(carts)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}


export const getCartById = async (req, res) => {
    try {
        const id = req.params.cid
        const cart = await cartsManager.getCartById(id)
        res.status(200).json(cart)
    } catch (e) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteCartById = async (req, res) => {
    try {
        const cartId = req.params.cid
        const asa = await cartsManager.deleteCart(cartId)

        if (!asa) return res.status(500).json({ message: `Carrito con ID ${cartId} no fue posibles ser eliminado, verifique que exista` })

        // res.status(200).json(casrtDeleted)
        res.status(200).json({ message: `Carrito con ID ${cartId} eliminado exitosamente` })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

//Agrega producto al carrito
export const addProdCart = async (req, res) => {
    try {
        const cart = req.params.cid
        const product = req.params.pid

        console.log(cart, product);
        const prodCreado = await cartsManager.addProductToCart(cart, product)
        if (!prodCreado) return res.status(500).json({ message: 'error,producto o carrito no encontrado' })

        res.status(201).json(prodCreado)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

export const updProductQuant = async (req, res) => {
    try {
        const cart = req.params.cid
        const product = req.params.pid

        console.log(cart, product);
        const prodCreado = await cartsManager.updQuantToProduct(cart, product)
        if (!prodCreado) return res.status(500).json({ message: 'error,producto o carrito no encontrado' })

        res.status(201).json(prodCreado)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

export const deleteProductCart = async (req, res) => {
    try {
        const cart = req.params.cid
        const product = req.params.pid

        console.log(cart, product);
        const prodCreado = await cartsManager.deleteProductCart(cart, product)
        if (!prodCreado) return res.status(404).json({ message: 'error al eliminar el producto o el carrito no existe' })

        res.status(200).json(prodCreado)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}