const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema from Day.js
const daySchema = require('./Day');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    // set days to be an array of data that adheres to the daySchema
    days: [daySchema],
    
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
//virtuals that can be used in queries
// when we query a user, we'll also get another field called `totalScore'
userSchema.virtual('totalScore').get(function () {
  //console.log("TOTALSCORE");
  let initialScore = 0;
  let sum = this.days.reduce(function (accumulator, curValue) {
      return accumulator + curValue.score
    }, initialScore);
    return sum;
});

userSchema.virtual('totalSleep').get(function () {
 
  let initialScore = 0;
  let sum = this.days.reduce(function (accumulator, curValue) {
      return accumulator + curValue.sleep
    }, initialScore);
    return sum;
});

userSchema.virtual('totalFoodCount').get(function () {
  
  let initialScore = 0;
  let sum = this.days.reduce(function (accumulator, curValue) {
      return accumulator + curValue.foodCount
    }, initialScore);
    return sum;
});

userSchema.virtual('totalMindCount').get(function () {
  
  let initialScore = 0;
  let sum = this.days.reduce(function (accumulator, curValue) {
      return accumulator + curValue.mindCount
    }, initialScore);
    return sum;
});

userSchema.virtual('totalExerciseCount').get(function () {
  let initialScore = 0;
  let sum = this.days.reduce(function (accumulator, curValue) {
      return accumulator + curValue.exerciseCount
    }, initialScore);
    return sum;
});

userSchema.virtual('totalConnCount').get(function () { 
  let initialScore = 0;
  let sum = this.days.reduce(function (accumulator, curValue) {
      return accumulator + curValue.connCount
    }, initialScore);
    return sum;
});

userSchema.virtual('totalDayCount').get(function () {
  let sum = (this.days ? this.days.length: 0);
  return sum;
});

// userSchema.post('save', function(next) {
//   const err = new Error('something went wrong');
  
//   console.log("POST SAVE BEFORE", this.days)
//   const daysSorted = this.days.sort(function(a,b){
//      return new Date(a.date) - new Date(b.date);
//   });
//   this.days = daysSorted;
  
//   console.log("AFTER", this.days)
//   next(err);
// })

const User = model('User', userSchema);

module.exports = User;
