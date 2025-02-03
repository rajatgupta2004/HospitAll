const mongoose = require('mongoose');
const hospitalSchema = new mongoose.Schema({
    name:String,
    description:String,
    address:String
})
const Hospitals =  mongoose.model('Hospitals',hospitalSchema);
module.exports = {Hospitals};
