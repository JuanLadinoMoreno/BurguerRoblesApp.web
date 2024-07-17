import mongoose from 'mongoose';
// import cartModel from './models/carts.model.js'
// import productsModel from './models/products.model.js'
import cartModel from './models/carts.model.js';
import productsModel from './models/products.model.js';


export default class CartsManager {


    async getCarts() {
        try {
            const carts = await cartsModel.find().populate('products.pid')//.populate('user');
            // const carts = await cartModel.find().populate('products.pid')//.populate('user');
            // console.log('datos', productos)
            // return datos
            return carts.map(p => p.toObject({ virtuals: true }))

        } catch (error) {
            console.log(error);
        }
    }

    async getUserCarts(usrId) {
        try {
            const carts = await cartModel.find({user: usrId}).populate('products.pid')//.populate('user');
            // const carts = await cartModel.find().populate('products.pid')//.populate('user');
            // console.log('datos', productos)
            // return datos
            return carts.map(p => p.toObject({ virtuals: true }))

        } catch (error) {
            console.log(error);
        }
    }

    async getCartById(id) {
        try {
            const cart = await cartModel.find({ _id: id })//.populate('products.pid');
            // console.log('datos', productos)
            // return datos
            return cart//.map(p => p.toObject({ virtuals: true }))

        } catch (error) {
            console.log(error);
        }
    }

    async createCart(cart) {
        // console.log('cartCreate', cart );
        try {
            // this.validaDatos(cart);
            if (!cart) {
                console.log('ID del carrito no proporcionado');
                return null;
            }

            const car = await cartModel.create(cart)
            return car
        } catch (e) {
            console.log('Error al crear crearrito', e);
        }
    }

    async deleteCart(cid) {
        // console.log('cartCreate', cart );
        try {
            // const cartId = new mongoose.Types.ObjectId(cid) // Convierte pid a ObjectId
            const cartId = new mongoose.Types.ObjectId(cid)
            // Verificar que el ID del carrito no esté vacío
            if (!cid) {
                console.log('ID del carrito no proporcionado');
                return null;
            }

            // Verificar que el carrito exista antes de intentar eliminarlo
            const carFind = await cartModel.findById(cartId);
            if (!carFind) {
                console.log(`El carrito con ID ${cid} no existe`);
                return null;
            }

            // Eliminar el carrito
            const deletedCart = await cartModel.findByIdAndDelete(cartId);

            // Verificar que la eliminación fue exitosa
            if (!deletedCart) {
                console.log(`Error al eliminar el carrito con ID ${cid}`);
                return null;
            }

            console.log(`Carrito con ID ${cid} eliminado exitosamente`);
            return deletedCart;

        } catch (e) {
            console.log('Error al eliminar el carrito', e);
            return null;
        }
    }

    async addProductToCart(cid, pid) {
        try {
            // Validar que el carrito y el producto existan
            const carFind = await cartModel.findById(cid);
            const productFind = await productsModel.findById(pid);
            if (!carFind || !productFind) return null;

            const productId = new mongoose.Types.ObjectId(pid); // Convierte pid a ObjectId

            // Buscar si el producto ya está en el carrito
            const existingProduct = carFind.products.find(p => p.pid.equals(productId));

            let cart;
            if (existingProduct) {
                // suma cantidad
                cart = await cartModel.findOneAndUpdate(
                    { _id: cid, 'products.pid': productId },
                    { $inc: { 'products.$.quantity': 100 } }, // Incrementar la cantidad en 1
                    { new: true }
                ).populate('products.pid'); // Asegúrate de que 'pid' se popule correctamente
            } else {
                // crea carrito
                cart = await cartModel.findOneAndUpdate(
                    { _id: cid },
                    { $push: { products: { pid: productId, quantity: 1 } } }, // Agregar nuevo producto con cantidad 1
                    { new: true, upsert: true }
                ).populate('products.pid');
            }

            console.log(cart);

            const cartF = await cartModel.findById(cid).populate('products.pid');
            console.log(cartF);

            return cart;
        } catch (e) {
            console.log('Error al crear carrito', e);
        }
    }


    async updQuantToProduct(cid, pid) {
        try {
            const carFind = await cartModel.findById(cid);
            const productFind = await productsModel.findById(pid);

            if (!carFind || !productFind) return null;

            const productId = new mongoose.Types.ObjectId(pid); // Convierte pid a ObjectId

            // Buscar si el producto ya está en el carrito
            const existingProduct = carFind.products.find(p => p.pid.equals(productId));

            let cart;
            if (existingProduct) {
                // Si el producto ya está en el carrito, actualizar la cantidad
                cart = await cartModel.findOneAndUpdate(
                    { _id: cid, 'products.pid': productId },
                    { $inc: { 'products.$.quantity': 100 } }, // Incrementar la cantidad  ¿Duda en donde va a pasar la cantidad?
                    { new: true }
                ).populate('products.pid');
            } else {
                return null
            }



            const cartF = await cartModel.findById(cid)//.populate('products');
            console.log(cartF);

            console.log(cart);
            return cart
        } catch (e) {
            console.log('Error al actualizar cantidad', e);
        }
    }

    async deleteProductCart(cid, pid) {
        // console.log('cartCreate', cart );
        try {

            if (!cid || !pid) {
                console.log('ID del producto/carrito no proporcionado');
                return null;
            }

            const carFind = await cartModel.findById(cid);
            const productFind = await productsModel.findById(pid);

            if (!carFind || !productFind) {
                console.log('Verifique producto/carrito sean correctos')
                return null
            }

            const productId = new mongoose.Types.ObjectId(pid); // Convierte pid a ObjectId
            const cartId = new mongoose.Types.ObjectId(cid)
            // Buscar si el producto ya está en el carrito
            const productIndex = carFind.products.findIndex(p => p.pid.equals(productId));

            if (productIndex === -1) {
                console.log(`El producto con ID ${productId} no se encuentra en el carrito`);
                return null //code 404 ????
            }


            // Eliminar el producto del carrito
            carFind.products.splice(productIndex, 1);
            const updatedCart = await carFind.save();

            return updatedCart

           
        } catch (e) {
            console.log('Error al eliminar el carrito', e);
            return null;
        }
    }


}