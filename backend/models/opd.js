const mongoose = require('mongoose');
const { Users } = require('./user');
const { Hospitals } = require('./hospital');

const opdQueueSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  queueNumber: { type: Number },
  status: { type: String, enum: ['Waiting', 'Consulted'], default: 'Waiting'},
  department:String,
  hospital:{ type: mongoose.Schema.Types.ObjectId, ref: 'Hospitals', required: true },
  
});

const OPDQueue = mongoose.model('OPDQueue', opdQueueSchema);
module.exports = OPDQueue;
