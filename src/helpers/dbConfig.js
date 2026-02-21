
import mongoose from 'mongoose';

// Cache connection to avoid reconnecting on every API call
let isConnected = false;

export async function connect() {
    // Already connected — don't create new connection/listeners
    if (isConnected) return;

    // Increase max listeners to avoid warning (safe for server-side)
    mongoose.connection.setMaxListeners(20);

    try {
        await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/webai');

        isConnected = true;

        // Add listeners ONLY once
        mongoose.connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });

        mongoose.connection.on('error', (err) => {
            console.log('MongoDB connection error: ' + err);
            isConnected = false;
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
            isConnected = false;
        });

    } catch (error) {
        console.log('MongoDB connection failed:', error);
        isConnected = false;
    }
}
