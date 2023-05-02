const { Schema, model } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the Activity arrays
const activitySchema = new Schema(
  {
      activityId: {
          type: Schema.Types.ObjectId,
          default: () => new Types.ObjectId(),
      },
      category: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
  }
);

//const Activity = model('Activity', activitySchema);
module.exports = activitySchema;
