import mongoose from 'mongoose'

export const connectMDb = () => {

    const MONGODB_URI = 'mongodb://localhost:27017/BurguerRobles'

    mongoose.connect(MONGODB_URI, {
        dbName: 'BurguerRobles',
        
    })
        .then(db => console.log('Database is conected'))
        .catch(err => console.log(err))
}
