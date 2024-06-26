import mongoose, { Schema, model } from 'mongoose';

const usrSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: String,
        age: Number,
        email: {
            type: String,
            unique: true
        },
        password: String,
        role: String,
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true,
    }

)


const userModel = model('User', usrSchema, 'users')
export default userModel