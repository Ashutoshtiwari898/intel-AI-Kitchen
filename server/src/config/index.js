import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Use native JavaScript promise library
mongoose.Promise = global.Promise;

// MongoDB URI for MongoDB Atlas
const uri = process.env.MONGODB_URI;

// Connect to MongoDB
const dbconnect = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

export { dbconnect };