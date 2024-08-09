// import ProductManager from "../dao/dbManager/ProductManager.js";
import mongoose from "mongoose";
import ProductManager from "../dao/mongo/products.dao.js";
import { ProductsService } from "../services/products.services.js";
// import ProductService from '../services/products.services.js'


const productService = new ProductsService()


const productManager = new ProductManager();

export const getProducts = async (req, res) => {
    try {
        
        let limit = +req.query.limit

        // este id se puede pasar a la funcion para que solo traiga productos creaos por ese usuario
        // const id = req.user.id

        const products = await productService.getProducts();
        if(!products) return res.json({status: 'error', message: 'Products null'})
        // console.log('get products', products);
        if (limit > 0) return res.json(products.slice(0, limit))

        res.status(200).json({status: 'success', payload: products})
    } catch (error) {
        return res.status(500).json({ status: error,  message: error.message });
    }
}

export const getProductById = async (req, res) => {
    try {
        const id = req.params.id
        const product = await productService.findProductById(id)
        res.status(200).json({status: 'success', payload: product})
    } catch (error) {
        return res.status(500).json({status: error, message: error.message });
    }

}

export const createProduct = async (req, res, next) => {

    try {
    const id = req.user.id //poner para usuario
    
    const product = {...req.body, user: id}  //poner para usuario
    // const product = {...req.body} 
    const prodCreado = await productService.createProduct(product);
    
    res.status(201).json({status: 'success', payload: prodCreado})
    } catch (error) {
        //  res.status(500).json({ messagessssss: error })
        next(error)
    }
    
}

export const editProduct = async (req, res, next) => {
    try {
        const pid = req.params.id
        
        // const pid = new mongoose.Types.ObjectId(productId)
        const product = req.body
        const prodUpd = await productService.updateOne(pid, product);
        
        res.status(201).json({status: 'success', payload: prodUpd})        
    } catch (error) {
        next(error)
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        const prodDel = await productService.deleteOne(req.params.id)
        if (!prodDel) {
            return res.status(400).json({ status: 'error', message: 'Product not found' })
        }
        //204 todo bien pero no retorna nada
        // res.status(204)
        res.status(200).json({status: 'success', message: 'Producto eliminado'})
        
    } catch (error) {
        next(error)
    }

    // try {
    //     await productManager.deleteProduct(+req.params.id);
    //     res.status(200)        
    // } catch (error) {        
    // }
}

export const getProductsByCat = async (req, res) => {
    // let limit = +req.query.limit
    try {
        const ids = req.params.ids
        const products = await productService.getProductsByCategory(ids);
        // console.log('get products', products);
        // if (limit > 0) return res.json(products.slice(0, limit))
    
        res.status(200).json({status: 'success', payload: products})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: error, message: error.message });
    }


}