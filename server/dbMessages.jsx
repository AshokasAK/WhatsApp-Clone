const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    name:String,
    message:String,
    timesatmp:String,
    uid:String,
    roomId:String
},
{
    timestamps : true
})

const Message = mongoose.model("message",messageSchema)

module.exports = Message