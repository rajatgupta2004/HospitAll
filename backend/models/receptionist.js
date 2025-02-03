const mongoose = require('mongoose');
const receptSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})
const Recepts =  mongoose.model('Recepts',receptSchema);
module.exports = {Users};