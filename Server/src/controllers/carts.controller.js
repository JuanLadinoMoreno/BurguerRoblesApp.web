import CartsManager from "../dao/dbManager/CartsManager.js";

const cartsManager = new CartsManager()

export const createCart = async (req, res) => {
    try {
        const cart = req.body
        const cartCreado = await cartsManager.createCart(cart)
        res.status(201).json(cartCreado)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

export const getCarts = async (req, res) => {
    let limit = +req.query.limit
    const carts = await cartsManager.getCarts()
    if (limit > 0) return res.json(carts.slice(0, limit))

    res.json(carts)
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

        if (!asa)  return res.status(500).json({ message: `Carrito con ID ${cartId} no fue posibles ser eliminado, verifique que exista` })            
        
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

        console.log(cart,product);
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

        console.log(cart,product);
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

        console.log(cart,product);
        const prodCreado = await cartsManager.deleteProductCart(cart, product)
        if (!prodCreado) return res.status(404).json({ message: 'error al eliminar el producto o el carrito no existe' })

        res.status(200).json(prodCreado)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}