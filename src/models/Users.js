const mongoose = require("mongoose");

module.exports = mongoose.model("Users", new mongoose.Schema({
    userid: { type: String }, 
    username: { type: String }, 
    tag: { type: String }, 
    avatar: { type: String }, 
    registeredAt: { type: Number, default: Date.now() }
}));