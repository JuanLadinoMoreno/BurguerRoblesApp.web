
import ProductsDAO    from "../dao/mongo/products.dao.js";
import { BurgerDTO }    from "../dto/products.dto.js";
import ErrorCodes from "./errors/errorCodes.js";
import CustomError from "./errors/CustomError.js";
import mongoose from "mongoose";
import EmailService from "./email.services.js";

const productsDAO = new ProductsDAO();
const emailService = new EmailService()

export class ProductsService {

    validaDatos(produc) {
        // console.log('produc', produc);
        
        if (
            (produc.ingrePrep === "" || !produc.ingrePrep) ||
            (produc.nombre === "" || !produc.nombre) ||
            (produc.pan === "" || !produc.pan) ||
            (isNaN(produc.precio) || produc.precio < 0) ||
            (produc.preparacion === "" || !produc.preparacion) ||
            (!produc.tipo || produc.tipo === "") ||
            ((produc.status != true && produc.status != false)) ||
            (isNaN(produc.stock) || produc.stock < 0)
        ) {
            console.log("Verifique que los campos esten coorectos o llenos");
            return CustomError.createError({
                name: 'Product data error',
                cause: '',
                message: 'Verify that the fields are correct',
                code: ErrorCodes.INVALID_CREDENTIALS
            })
        }
    }

    async getProducts ()  {        
       
            const products =  await productsDAO.getProducts();
            return products
            // return new BurgerDTO(products)
    }

    
    async findProductById (id) {
            const product = await productsDAO.findProductById(id)
            if(!product){

                return CustomError.createError({
                    name: 'Product data error',
                    cause: '',
                    message: 'The product is not exists',
                    code: ErrorCodes.INVALID_CREDENTIALS
                })
            }
            return new BurgerDTO(product)
    }

    async createProduct(prod) {
            // const id = req.user.id //poner para usuario
            // const product = {...prod, user: id}  //poner para usuario
            // const product = {...req.body} 
            const veryUser = await productsDAO.findProductByName(prod.nombre)
            if(veryUser){
                return CustomError.createError({
                    name: 'User error',
                    cause: '',
                    message: 'The user exists',
                    code: ErrorCodes.INVALID_CREDENTIALS
                })      
 
            }
            this.validaDatos(prod);
            const prodCreado = await productsDAO.createProduct(prod)
            const prodCreadoDTO = new BurgerDTO(prodCreado)
            return prodCreadoDTO
            
    }

    async createProduct(prod) {
        // const id = req.user.id //poner para usuario
        // const product = {...prod, user: id}  //poner para usuario
        // const product = {...req.body} 
        this.validaDatos(prod);
        const prodCreado = await productsDAO.createProduct(prod)
        const prodCreadoDTO = new BurgerDTO(prodCreado)
        return prodCreadoDTO
    }
    
    async updateOne(pid, product) {
        // const pid = new mongoose.Types.ObjectId(id)
        
        this.validaDatos(product);
        await this.findProductById(pid) 
        // const findProd = await this.findProductById(pid)  
        // console.log('findProd   ', findProd);
              
        // if(!findProd)
        //     return CustomError.createError({
        //         name: 'Product data error',
        //         cause: '',
        //         message: 'The product is not exists',
        //         code: ErrorCodes.INVALID_CREDENTIALS
        //     })
        
        const prodUpd = await productsDAO.findByIdAndUpdate(pid, product)
        
        if(!prodUpd)
            return CustomError.createError({
                name: 'Product update error',
                cause: '',
                message: 'The product can not be updated',
                code: ErrorCodes.INVALID_CREDENTIALS
            })
        const prodUpdDTO = new BurgerDTO(prodUpd)
        return prodUpdDTO
    }

    async deleteOne(pid){
        const findProd = await this.findProductById(pid)  
        if(!findProd)
            return CustomError.createError({
                name: 'Product data error',
                cause: '',
                message: 'The product is not exists',
                code: ErrorCodes.INVALID_CREDENTIALS
            })

            if(findProd.user.role === 'premium') {
                await emailService.notifyProductPremiumDelete(findProd)
            }

        return productsDAO.deleteProduct(pid)
    }

    async getProductsByCategory(id){
        return productsDAO.getProductsByCategory(id)
    }
}