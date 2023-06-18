const { Schema } = require('mongoose');
const { enAULocale } = require('date-fns/locale/en-AU');
const { format } = require('date-fns');

const Activity = require('./Activity');
// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the Activity arrays
const daySchema = new Schema(
  {
      date: {
        type: Date,
        default: Date.now,
        //convert date to specified format
        get: ((date) => format(date, "yyyy-MM-dd", { locale: enAULocale })),
        
      },
      foodActivities: [String],
      mindActivities: [String],
      exerciseActivities: [String],
      connActivities: [String],
      rating: {
        type: String,
      },
      sleep: {
        type: String,
        // default: 0
      },
      notes: {
        type: String,
      },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Create virtual property `categoryCounts` that gets the number of activities in each category
daySchema
  .virtual('foodCount')
  // Getter
  .get(function () {
    return this.foodActivities.length;
  });

daySchema
  .virtual('mindCount')
  // Getter
  .get(function () {
    return this.mindActivities.length;
  });

daySchema
  .virtual('exerciseCount')
  // Getter
  .get(function () {
    return this.exerciseActivities.length;
  });

daySchema
  .virtual('connCount')
  // Getter
  .get(function () {
    return this.connActivities.length;
  });
  
daySchema
  .virtual('score')
  // Getter
  .get(function () {
    return this.connActivities.length  + this.mindActivities.length + this.exerciseActivities.length + this.foodActivities.length;
  });


  
module.exports = daySchema;
