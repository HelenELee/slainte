//populate the database with activities from activities.json
const db = require('../config/connection');
const  { Activity } = require('../models');
const  activitySeeds = require('./activities.json');

db.once('open', async () => {
    try {
      await Activity.deleteMany({});
      
      await Activity.create(activitySeeds);
  
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  
    console.log('all done!');
    process.exit(0);
})