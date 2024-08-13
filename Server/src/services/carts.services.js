import ProductsDAO from "../dao/mongo/products.dao.js"
import CartsDAO from "../dao/mongo/carts.dao.js"
import UsersDAO from "../dao/mongo/users.dao.js"
import CustomError from "./errors/CustomError.js"
import ErrorCodes from "./errors/errorCodes.js"

import UsersService from "../services/users.services.js";

const usersDAO = new UsersDAO()
const cartsDAO = new CartsDAO()
const productsDAO = new ProductsDAO()

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

    async deleteCartById(cid) {
        // try {

        // const cartId = new mongoose.Types.ObjectId(cid)
        // Verificar que el ID del carrito no esté vacío
        if (!cid) {
            return CustomError.createError({
                name: 'Cart data error',
                cause: '',
                message: 'The cart is not found',
                code: ErrorCodes.INVALID_CREDENTIALS
            })
        }

        // Verificar que el carrito exista en BD antes de intentar eliminarlo
        const carFind = await cartsDAO.getCartById(cartId);
        if (!carFind) {
            return CustomError.createError({
                name: 'Cart data error',
                cause: '',
                message: `El carrito con ID ${cid} no existe`,
                code: ErrorCodes.INVALID_CREDENTIALS
            })
            // console.log(`El carrito con ID ${cid} no existe`);
            // return null;
        }
        // Elimina cart
        const cartDel = await cartsDAO.deleteCart(cid)
        // Verificar que la eliminación fue exitosa
        if (!cartDel) {
            return CustomError.createError({
                name: 'Cart data error',
                cause: '',
                message: `Error al eliminar el carrito con ID ${cid}`,
                code: ErrorCodes.INVALID_CREDENTIALS
            })
        }

        // console.log(`Carrito con ID ${cid} eliminado exitosamente`);
        return cartDel;

        // if (!asa) return res.status(500).json({ message: `Carrito con ID ${cartId} no fue posibles ser eliminado, verifique que exista` })

        // res.status(200).json(casrtDeleted)
        // res.status(200).json({ message: `Carrito con ID ${cartId} eliminado exitosamente` })
        // } catch (error) {
        //     return res.status(500).json({ message: error.message })
        // }

    }

    async empyCart(cid) {
        if (!cid) {
            return CustomError.createError({
                name: 'Cart data error',
                cause: '',
                message: 'The cart is not found to empty',
                code: ErrorCodes.INVALID_CREDENTIALS
            })
        }

        const cartFind = await this.getCartById(cid)



        if (cartFind.products.length === 0 && cartFind.status === 'empty')
            return CustomError.createError({
                name: 'Cart data error',
                cause: '',
                message: 'the card is already empty',
                code: ErrorCodes.INVALID_CREDENTIALS
            })




        const empyCart = cartsDAO.empyCart(cid, cartFind)

        // if(!empyCart)
        //     return CustomError.createError({
        //         name: 'Cart data error',
        //         cause: '',
        //         message: 'The cart could not be emptied',
        //         code: ErrorCodes.INVALID_CREDENTIALS
        //     })
        return empyCart

    }

    async addProductToCart(cid, pid, quantity) {
        // try {
        //verifica que el producto y el carrito existan
        const carFind = await cartsDAO.getCartByIdStatusCreated(cid);
        const productFind = await productsDAO.findProductById(pid);


        if (!carFind || !productFind)
            return CustomError.createError({
                name: 'Cart data error',
                cause: '',
                message: 'The card or product is not found',
                code: ErrorCodes.INVALID_CREDENTIALS
            })


        // // Buscar si el producto ya está en el carrito
        const existingProduct = carFind.products.find(p => p.pid.equals(pid));
        if (existingProduct) {
            const cartUpd = cartsDAO.addCountToProductCart(cid, pid, quantity)
            if (!cartUpd)
                return CustomError.createError({
                    name: 'Cart data error',
                    cause: '',
                    message: 'Error al actualizar catidad',
                    code: ErrorCodes.INVALID_CREDENTIALS
                })
            return cartUpd
        } else {
            const cartUpd = cartsDAO.createProducInCart(cid, pid, quantity)
            if (!cartUpd)
                return CustomError.createError({
                    name: 'Cart data error',
                    cause: '',
                    message: 'Error to create product in cart',
                    code: ErrorCodes.INVALID_CREDENTIALS
                })
            return cartUpd

        }




        // } catch (error) {
        //     return res.status(500).json({ message: error.message })
        // }

    }

    async updProductQuant(cid, pid) {
        const prodCreado = await cartsDAO.addCountToProductCart(cid, pid)


    }
    async deleteProductCart(cid, pid) {

        // try {

        // if (!cid || !pid) {
        //     console.log('ID del producto/carrito no proporcionado');
        //     return null;
        // }

        // const carFind = await cartModel.findById(cid);
        // const productFind = await productsModel.findById(pid);

        const carFind = await this.getCartById(cid);


        const productFind = await productsDAO.findProductById(pid);

        if (!carFind || !productFind)
            return CustomError.createError({
                name: 'Cart data error',
                cause: '',
                message: 'The card or product is not found',
                code: ErrorCodes.INVALID_CREDENTIALS
            })

        // const productId = new mongoose.Types.ObjectId(pid); // Convierte pid a ObjectId
        // const cartId = new mongoose.Types.ObjectId(cid)

        // Buscar si el producto ya está en el carrito
        const productIndex = carFind.products.findIndex(p => p.pid.equals(pid));

        if (productIndex === -1) {
            return CustomError.createError({
                name: 'Cart data error',
                cause: '',
                message: 'The product is not exists in the cart',
                code: ErrorCodes.INVALID_CREDENTIALS
            })
            // console.log(`El producto con ID ${pid} no se encuentra en el carrito`);
            // return null //code 404 ????
        }


        // Eliminar el producto del carrito
        carFind.products.splice(productIndex, 1);
        const updatedCart = await cartsDAO.deleteProductCart(carFind);
        // if(!updatedCart)
        //     return CustomError.createError({
        //         name: 'Cart data error',
        //         cause: '',
        //         message: 'Error al elimonar el producto del carrito',
        //         code: ErrorCodes.INVALID_CREDENTIALS
        //     })

        return updatedCart


        // } catch (e) {
        //     console.log('Error al eliminar el carrito', e);
        // }
    }

    async finalizePurchase(cid, uid) {
        // try {
        const insufficientStockProducts = [];
        let cantiadTotal = 0;
        let productInStock = null
        let prodsSell = []
        // Verifica que el carrito exista y sea del usuario logeado
        // const cart = await cartModel.findOne({ _id: cid, user: uid, status: 'created' }).populate('products.pid');
        const cart = await cartsDAO.verifyCartOfUser(cid, uid)
        if (!cart)
            return CustomError.createError({
                name: 'Cart data error',
                cause: '',
                message: 'Cart not find or user have not permissions',
                code: ErrorCodes.INVALID_CREDENTIALS
            })

        for (const product of cart.products) {
            productInStock = await productsDAO.findProductByIdd(product.pid);

            if (productInStock.stock < product.quantity) {
                insufficientStockProducts.push({
                    pid: product.pid,
                    quantity: product.quantity,
                    stock: productInStock.stock
                });
            } else {
                // prodsSell.push( product.pid)
                prodsSell.push({ product: product.pid, quantity: product.quantity })
                productInStock.stock -= product.quantity;
                // await productInStock.save();
                await cartsDAO.productInStockSave(productInStock)
                cantiadTotal += product.quantity * productInStock.precio;
            }
        }

        // if (insufficientStockProducts.length > 0) {
        // //   return {       ///OJO Como mandar el error de
        // //     message: 'Algunos productos no tienen suficiente stock.',
        // //     cart,
        // //     insufficientxStockProducts
        // //   };
        // return null
        // } else {        

        // const updatedCart = await cartModel.findByIdAndUpdate(
        //     cid,
        //     { status: 'finalized' },
        //     { new: true }
        // );


        //Guarda el cart los productos sin stock
        cart.products = insufficientStockProducts.map(p => ({
            pid: p.pid,
            quantity: p.quantity
        }));

        // await cart.save();


        //   const usrId = new mongoose.Types.ObjectId(uid)
        // const usrEmail = await userModel.findById(uid)
        const usrEmail = await usersDAO.findUserById(uid)
        if (!usrEmail)
            return CustomError.createError({
                name: 'Cart data error',
                cause: '',
                message: 'The user is not exists in the cart',
                code: ErrorCodes.INVALID_CREDENTIALS
            })
        // Crear y guardar el ticket de compra
        // const tiket = new ticketModel({
        //     code: nanoid(6), // Generar un código único para la compra
        //     amount: cantiadTotal,
        //     purchaser: usrEmail.email, // Suponiendo que el usuario tiene un campo `email`
        //     user: cart.user._id,
        //     cart: cid
        // });

        // await tiket.save();

        //Crae tiket en BD
        const ticket = cartsDAO.saveTicket(cantiadTotal, usrEmail.email, cart.user._id, cid, prodsSell)
        if (!ticket)
            return CustomError.createError({
                name: 'Cart data error',
                cause: '',
                message: 'Error to create the tiket',
                code: ErrorCodes.INVALID_CREDENTIALS
            })

        //Actualiza el estado a Finalizado
        const updatedCart = cartsDAO.UpdCartToFinalized(cid)
        if (!updatedCart)
            return CustomError.createError({
                name: 'Cart data error',
                cause: '',
                message: 'Error al actualizar a status: finalized ',
                code: ErrorCodes.INVALID_CREDENTIALS
            })

        await cartsDAO.cartSave(cart) //Guarda en BD
        //   await productInStock.save();

        // return {
        //     message: 'Purchase finalized successfully.',
        //     cart: updatedCart,
        //     ticket,
        //     insufficientStockProducts
        // };
        return ticket
        // }

        // } catch (error) {
        //     console.error(error);
        //     // throw error;
        // }
    }
}