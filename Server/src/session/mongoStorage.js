// import MongoStore from "connect-mongo";
// import session from "express-session";
// import defaultOptions from "./defaultOptions.js";

// // const {NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE} = process.env

// const storage = MongoStore.create({
//     dbName: 'BurguerRobles',
//     mongoUrl: 'mongodb://localhost:27017',
//     ttl: 60
// })

// // const sessionConfig = {
// //     storage: storage,
// //     // cookie: {
// //     //     // sameSite: 'none',
// //     //     secure: true,
// //     //     httpOnly: false
        
// //     // },
// //     ...defaultOptions
// // }

// // export default session(sessionConfig)

// export default session({
//     store: storage,
//         cookie: {
//             // secure: process.env.NODE_ENV === 'production', // Configurar a true en producción
//             secure: false,
//             sameSite: 'none',
//         // httpOnly: false
        
//     },
//     ...defaultOptions
// })
