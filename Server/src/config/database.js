import mongoose from 'mongoose'

export const connectMDb = async () => {

    const {NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE} = process.env

    const MONGODB_URI = `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Database is conected')
        
    } catch (err) {
        console.log(err)
    }
}

// Función para desconectar de la base de datos
export const disconnectMDb = () => {
    mongoose.disconnect()
    .then(() => console.log('Database is disconnected'))
    .catch((err) => console.error('Database disconnection error:', err));
};