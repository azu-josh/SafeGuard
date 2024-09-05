const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const userVerificationSchema = new Schema({
    userId: String,
    uniqueString: String,
    createdAt: Date,
    expiresAt: Date,
});

const UserVerification = mongoose.model ('userVerification', userVerificationSchema);

module.exports = UserVerification;
