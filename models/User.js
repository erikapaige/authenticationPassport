const mongoose = require('mongoose')
// used to hash the password
const bcrypt = require('bycrpt')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 6,
    max: 15,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin''],
    required: true
  },
  // use function called populate to fill in arrays
  todos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Todo'
  }]
})

// mongoose version of middlewear
// once done execute next function
UserSchema.pre('save', function (next) {
  // checking to see if password has been modified, if it has then no need to hash
  if (!this.isModified('password'))
    return next()
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    it(err)
    return next(err)
    this.password = passwordHash
    next
  })
})

//way to compare plain text version to has version in db
UserSchema.methods.comparePassword = function (password, cb) {
  //first password from client, second hashed password
  bcrypt.compare(password, this.password(err, isMatch)=> {
    if(err)
      return cb
    else{
      if(!isMatch)
        return cb(null, isMatch)
      return cb(null, this)
    }
  })
}

module.exports = mongoose.model('User', UserSchema)
