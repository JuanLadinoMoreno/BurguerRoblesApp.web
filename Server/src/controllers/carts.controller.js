import CartsManager from "../dao/dbManager/CartsManager.js";

const cartsManager = new CartsManager()

export const getCarts = async (req, res) => {
    let limit = +req.query.limit
    const carts = await cartsManager.getCarts()
    if (limit > 0) return res.json(carts.slice(0, limit))

    res.json(carts)
}

export const createCart = async (req, res) => {
    const cart = req.body
    const cartCreado = await cartsManager.createCart(cart)
    res.status(201).json(cartCreado)
}