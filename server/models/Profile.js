const { Schema } = require('mongoose');
const { enAULocale } = require('date-fns/locale/en-AU');
const { format } = require('date-fns');


// This is a subdocument schema, it won't become its own model but we'll use it as the schema for profile in User
const profileSchema = new Schema(
  {
      weeklyTarget: {
        type: Number,       
      },
      showProgressDial: {
        type: Boolean,
        default: true,
      }
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);
  
module.exports = profileSchema;
