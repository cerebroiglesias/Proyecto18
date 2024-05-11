const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const uri = process.env.MONGODB;

/**
 * Connects to the MongoDB database using the client and returns the connected database.
 *
 * @return {Promise<Db>} The connected MongoDB database.
 */
const connectDB = async function() {
    try {
        await mongoose.connect(uri, {
            dbName: process.env.CLUSTER
        });
        mongoose.connection.on('error', err => {
            logError(err);
        });
        console.log("You successfully connected to MongoDB!");
    } catch(e) {
        // Ensures that the client will close when you finish/error
        console.log(error)
    }
}

module.exports = { 
    mongoose,
    connectDB
}