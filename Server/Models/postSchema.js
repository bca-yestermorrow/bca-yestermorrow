const mongoose = require("mongoose")
const connectPostSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    image: {
        type: Image
    },
    category: {
        type: [String]
    },
    when: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model("ConnectPost", connectPostSchema)