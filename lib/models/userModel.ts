import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const User = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    role: { type: String, enum: ['manager', 'gamer', 'administrador'], default: 'gamer', required: true }
});