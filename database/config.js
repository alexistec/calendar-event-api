const mongoose = require('mongoose');


const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN);

        console.log('DB connect success')
    } catch (error) {
        console.log(error)
        throw new Error('Error init en DB')
    }
}


module.exports = {
    dbConnection
}