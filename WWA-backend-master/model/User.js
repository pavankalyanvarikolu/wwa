// /model/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  tokens: [{
    token: { type: String, required: true},
  }],
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.generateAuthToken = async function() {
  try {
      let token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
      this.tokens = this.tokens.concat({ token : token });
      await this.save();
      return token;

  } catch (err) {
      throw err;
  }
}; 


const User = mongoose.model('User', userSchema);

module.exports = User;