const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

var userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'User email is required!'],
    trim: true,
    minLength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{value} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

userSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email']);
}


userSchema.methods.generateAuthToken = function () {
  let user = this;
  let access = 'auth';
  let token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });

}

userSchema.statics.findByToken = function (token) {
  let User = this;
  let decoded;
  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject(e);
  }
  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
}

userSchema.pre('save', function (next){
  let user = this;
  if (user.isModified('password')) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          user.password = hash;
          next();
        })
      })
  } else {
    next();
  }
})

module.exports = mongoose.model('User', userSchema);
