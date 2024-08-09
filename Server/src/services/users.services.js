import usersDAO from "../dao/mongo/users.dao.js";
import { usersDto } from "../dto/users.dto.js";
import bcryptjs from "bcryptjs";
import CustomError from "./errors/CustomError.js";
import { generateFindUserDataError, generateInvalidUserDataError } from "./errors/info.js";
import ErrorCodes from "./errors/errorCodes.js";
import { createAccessToken } from "../libs/jwts.js";

const UsersDAO = new usersDAO();

export default class usersService {


    async createUser(firstName, lastName, age, email, password) {
        // try {
        console.log(password);
        

        if (!firstName ||
            !lastName ||
            !age ||
            age <= 0 ||
            !email ||
            !password
        ) {
            CustomError.createError({
                name: 'User data error',
                cause: generateInvalidUserDataError({ firstName, lastName, age, email, password }),
                message: 'Data error trying to create a new user',
                code: ErrorCodes.INVALID_TYPES_ERROR
            })
        }

        const userExist = await UsersDAO.getUserByEmail(email);
        if (userExist) {
            // throw new Error('El usuario ya existe');

            CustomError.createError({
                name: 'Error register email user',
                cause: '',
                message: 'The user is already registered',
                code: ErrorCodes.EXISTING_DATA
            })

        }

        const pswHash = await bcryptjs.hash(password, 11)

        const usr = await UsersDAO.createUser(firstName, lastName, age, email, pswHash)
        console.log('dsdfsdfsdfsdfsdfsdfsd', usr);
        const userDTO = new usersDto(usr)
        console.log('5+65+65+5+565+65+65', userDTO);
        return userDTO

        // } catch (error) {
        //     console.log('Error al crear usuariodasdasdasdadad', error);
        //     return null
        // }
    }

    async onLogin(email, password) {
        // try {    
            
        if (!email || !password) {
            
            console .log('2222222222222222222222222222', email);
            CustomError.createError({
                name: 'User data error',
                cause: '',
                message: 'Error email / password, trying to login user',
                code: ErrorCodes.INVALID_CREDENTIALS
            })
        }
        
        
        // const userFound = await userModel.findOne({ email });
        const userFound = await UsersDAO.getUserByEmail(email);
        
        if (!userFound)
        {
            return CustomError.createError({
                name: 'User data error',
                cause: '',
                message: 'User not found',
                code: ErrorCodes.INVALID_CREDENTIALS
            })
        }
    
    const isMatch = await bcryptjs.compare(password, userFound.password);
            if (!isMatch) {
                
                return CustomError.createError({
                    name: 'User password error',
                    cause: '',
                    message: 'The password is not macth',
                    code: ErrorCodes.IVALIT_CREDENTALS
                })
                // return res.status(400).json({
                //     message: ["Invalit credencials"],
                // });
            }
            const userDTO = new usersDto(userFound)
            return userDTO
    
    }


    async findUserById(id) {
        if (!id) {
            return CustomError.createError({
                name: 'User id error',
                cause: '',
                message: 'Verify user',
                code: ErrorCodes.IVALIT_CREDENTALS
            })
            
        }
        
        const userFound = await UsersDAO.findUserById(id)
        
        if (!userFound) {
            return CustomError.createError({
                name: 'User data error',
                cause: '',
                message: 'User not found',
                code: ErrorCodes.INVALID_CREDENTIALS
            })
        }

        const userDTO = new usersDto(userFound)
        return userDTO

    }


}
