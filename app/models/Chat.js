const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Chat Schema
 */

const ChatSchema = new Schema({
  from: { type : String, default : '', trim : true },
  to: { type : String, default : '', trim : true },
  message: { type : String, default : '', trim : true },
  sent: { type: Date, default: Date.now },
  seen: { type: Boolean },
});


mongoose.model('Chat', ChatSchema);