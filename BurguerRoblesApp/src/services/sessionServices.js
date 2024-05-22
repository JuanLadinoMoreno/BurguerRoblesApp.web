import axios from "./axios";

export const onRegister = async (user) => axios.post(`/session/register`, user);

export const onLogin = async (user) => axios.post(`/session/login`, user);

// export const onVerifyToken = async () => axios.get(`/verify`);

export async function onVerifyToken(){
    try {
        return await axios.get('/session/verify');
        
    } catch (error) {
        console.log('url verify not found');
    }
}


// export async function onLogin(user){
//     try{
//         console.log('ffffffffffffff', user);
//         await axios({
//             // url: 'http://localhost:8080/api/session/login',
//             url: '/login',
//             method: 'POST',
//             data: user,
//             // withCredentials: true
        
//         })
//         // console.log('true');
//         return true
//     }catch(e){
//         // console.log('false');
//         console.log('Erroro al conextarse al servidor', e);
//         return false
//     }
// }



// export async function onRegister(user){
//     try{
//         // console.log('ffffffffffffff', user);
//         await axios({
//             // url: 'http://localhost:8080/api/session/register',
//             url: '/register',
//             method: 'POST',
//             data: user,
//             // withCredentials: true
//         })
//         console.log('true axios register');
//         console.log('user axios register', user);
//         // return ({
//         //     email: user.email
//         // })
        
//     }catch(e){
//         // console.log('false');
//         console.log('Erroro al conextarse al servidor', e);
        
//     }
// }



export async function getContador(){
    // return await axios.get('https://run.mocky.io/v3/407c83b9-74d8-4d7a-a2d5-9383309833fc');
    // return await axios.get('https://apimocha.com/burguerrobles/products');
    // return await axios.get('https://run.mocky.io/v3/d4883467-9de7-4fb4-97d6-9c985bcbaa5e');
    console.log('getContador');
    try {
        return await axios.get('http://localhost:8080/api/session/sesiones');
        
    } catch (error) {
        console.log('url not found');
    }
}
