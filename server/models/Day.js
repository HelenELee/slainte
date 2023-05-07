const { Schema } = require('mongoose');
const { enAULocale } = require('date-fns/locale/en-AU');
const { format } = require('date-fns');

const Activity = require('./Activity');
// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the Activity arrays
const daySchema = new Schema(
  {
    /*
      dayId: {
          type: Schema.Types.ObjectId,
          default: () => new Types.ObjectId(),
      },
      */
      date: {
        type: Date,
        default: Date.now,
        //convert date to specified format
        //get: ((date) => format(date, "PPPp", { locale: enAULocale }))
        get: ((date) => format(date, "yyyy-MM-dd", { locale: enAULocale })),
        //set: ((date) => format(date, "yyyy-MM-dd", { locale: enAULocale }))
        //dd/LL/yyyy
      },
      foodActivities: [String],
      mindActivities: [String],
      exerciseActivities: [String],
      commsActivities: [String],
      rating: {
        type: String,
      },
      sleep: {
        type: Number,
        default: 0
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
  .virtual('commsCount')
  // Getter
  .get(function () {
    return this.commsActivities.length;
  });
  
daySchema
  .virtual('score')
  // Getter
  .get(function () {
    return this.commsActivities.length  + this.mindActivities.length + this.exerciseActivities.length + this.foodActivities.length;
  });

daySchema.post('save', function(next) {
  const err = new Error('something went wrong');
  console.log("PRESAVE");
  /*
  const daysSorted = this.days.sort(function(a,b){
     return new Date(b.date) - new Date(a.date);
  });
  this.days = daysSorted;
  */
  this.notes = "note 1";
  next(err);
})
  
module.exports = daySchema;
