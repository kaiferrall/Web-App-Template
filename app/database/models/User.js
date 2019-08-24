const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now()
  },
  updated: {
    type: Date,
    default: Date.now()
  },
  emailData: {
    token: {
      type: String
    },
    passwordToken: {
      type: String
    },
    verified: {
      type: Boolean,
      default: false
    }
  }
});

module.exports = User = mongoose.model("users", UserSchema);
