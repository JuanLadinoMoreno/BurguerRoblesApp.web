// import { Mongoose } from "mongoose"
// const { default: mongoose } = require("mongoose")
import {Schema, model} from 'mongoose';





const prodSchema = new Schema({
    aderesos: {
        type: [String],
        required: true,
        // unique: true
    },
    
    nombre: {
        type: String,
        required: true,
        // unique: true
    },
    
    preparacion: {
        type: String,
        required: true,
        // unique: true
    },

    ingrePrep: {
        type: String,
        required: true,
        // unique: true
    },


    ingrePrep: {
        type: String,
        required: true,
        // unique: true
    },
    
    pan: {
        type: String,
        required: true,
        // unique: true
    },

    precio: {
        type: Number,
        required: true,
        // unique: true
    },

    tipo: {
        type: String,
        required: true,
        // unique: true
    },

    vegetales: {
        type: [String],
        required: true,
        // unique: true
    },

    status: {
        type: Boolean,
        required: true,
        // unique: true
    },

    stock: {
        type: Boolean,
        required: true,
        // unique: true
    }
    
    
})
// export default  mongoose.model('Poduct', prodSchema, 'products')
const proMod =  model('Poduct', prodSchema, 'products')
export default  proMod
//  module.exports = model('Poduct', prodSchema, 'products')
// export default model('Poduct', prodSchema, 'products')