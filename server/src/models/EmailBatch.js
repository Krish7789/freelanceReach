const mongoose = require("mongoose");

const EmailBatchSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    total: Number,
    status: String,
    createdAt: {type:Date, default: Date.now}
});

module.exports = mongoose.model("EmailBatch", EmailBatchSchema);