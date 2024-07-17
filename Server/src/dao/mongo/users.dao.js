import userModel from "../mongo/models/user.model.js";
import bcryptjs from "bcryptjs";

export default class usersDAO{

    async createUser(firstName, lastName, age, email, password) {
        try {

            const userFound = await userModel.findOne({ email });

            if (userFound)
                return null;
    
            const pswHash = await bcryptjs.hash(password, 11)

            const usr = await userModel.create({
                firstName,
                lastName,
                age: +age,
                email,
                password: pswHash
            })

            return usr
            
        } catch (e) {
            console.log('Error al crear usuario', e);
            return null
        }
    }

    async Onlogin (email) {
        try {    
            const userFound = await userModel.findOne({ email });
            return userFound;    
            
        } catch (error) {
            console.log('Error on login', e);
            return null
        }
    }

    async findUserById (id) {
        try {   
            const userFound = await userModel.findById(id) 
            if (!userFound)  return null
            
            return userFound;    
            
        } catch (error) {
            console.log('Error on login', e);
            return null
        }
    }

        



}