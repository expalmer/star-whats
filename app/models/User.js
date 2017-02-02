const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * User Schema
 */

const UserSchema = new Schema({
  id: { type: String, default: '' },
  username: { type : String, default : '', trim : true },
  name: { type : String, default : '', trim : true },
  description: { type : String, default : '', trim : true },
  online: { type: Boolean, default: false },
  currentUserChat: { type: String, default: '' },
  notifications: [
    {
      username: { type : String, trim : true, index: { unique: true } },
      notSeen: { type: Number, default: 0 },
    },
  ],
});

/**
 * Validations
 */

UserSchema.path('username').required(true, 'Username cannot be blank');
UserSchema.path('name').required(true, 'Name cannot be blank');

mongoose.model('User', UserSchema);