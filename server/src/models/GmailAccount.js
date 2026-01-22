const mongoose = require("mongoose");

const gmailAccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    accessToken: String,
    refreshToken: String,
    connectedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("GmailAccount", gmailAccountSchema);
