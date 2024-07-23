export const generateInvalidUserDataError = ({ email, password }) => {
    return `Invalid user data cara de merga:
        * email : should be a non-empty String, received ${email} (${typeof email})
        * password  : should be a non-empty String, received ${password} (${typeof password})
    
    `
}
// export default generateInvalidUserDataError