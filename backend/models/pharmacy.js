const mongoose = require('mongoose');
const pharmacySchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})
const Pharms =  mongoose.model('Pharms',pharmacySchema);
module.exports = {Users};