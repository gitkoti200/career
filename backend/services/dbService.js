const mongoose = require('mongoose');

// Mock User Data in memory for Demo Mode
let mockUsers = {};

const connectDB = async () => {
    if (process.env.MONGO_URI) {
        try {
            await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log("MongoDB Connected (Real)");
        } catch (err) {
            console.error(err.message);
            console.log("Falling back to In-Memory Database (Demo Mode).");
        }
    } else {
        console.log("No MONGO_URI found. using In-Memory Database (Demo Mode).");
    }
};

module.exports = { connectDB };
