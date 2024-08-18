const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Media schema
const MediaSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    filePath: {
        type: String,
        required: true,
    },
    mimeType: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create and export the Media model
const Media = mongoose.model('Media', MediaSchema);
module.exports = Media;
