import mongoose from 'mongoose';
var colors = require('colors');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB || 'mongodb://localhost/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        
        console.log(colors.green.inverse(`🍻🍻 CONECTADO A MONGO DB 🍻🍻  ${mongoose.connection?.name?.toUpperCase()}`));
    } catch (err) {
        console.log(colors.red.inverse('ERROR MONGO DB ', err));
    }
}

export default dbConnection;