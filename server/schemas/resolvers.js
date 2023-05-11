const { AuthenticationError } = require('apollo-server-express');
const { Activity, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // By adding context to our query, we can retrieve the logged in user without specifically searching for them
        me: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
          },
        activities: async (parent, args, context) => {
          //get activities for each category
         // if (context.user) {
            return Activity.find();
         // }
          throw new AuthenticationError('You need to be logged in!');
        },
        getChartData: async (parent, args, context) => {
          //data used for charts
           if (context.user) {
            
            return User.findOne({ _id: context.user._id }, {days : true});
           }
           throw new AuthenticationError('You need to be logged in!');
         },
         getDay: async (parent, { dayID }, context) => {
          //get an individual day based on id
          if (context.user) {
                     
           const userData = await User.findOne({ _id: context.user._id }, 'days');
           
           var theDay = userData.days.filter(item => item.id === dayID);
          
           return theDay[0];
           
           
          }
          throw new AuthenticationError('You need to be logged in!');
        },
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('No user with this email found!');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect password!');
            }
      
            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, { username, email, password }) => {
         
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        createDay: async (parent, { input }, context) => {
            //add day to users days array
          if (context.user) {
               
              const updatedUser = await User.findOneAndUpdate(
                  {_id: context.user._id},
                  {
                      $addToSet: {days: input },
                  },
                  {
                      new: true,
                      runValidators: true,
                  }
              );
                     
           return await updatedUser.save();
          }
           // If user attempts to execute this mutation and isn't logged in, throw an error
          throw new AuthenticationError('You need to be logged in!');
      },
      updateDay: async (parent, { dayID, input }, context) => {
        //update days array based on passed in data
        if (context.user) {
          
          const updatedUser = User.findOneAndUpdate({_id: context.user._id, days: {$elemMatch: {_id: dayID}}},
            {$set: {'days.$.foodActivities': input.foodActivities,
                    'days.$.mindActivities': input.mindActivities,
                    'days.$.exerciseActivities': input.exerciseActivities,
                    'days.$.connActivities': input.connActivities,
                    'days.$.sleep': input.sleep,
                    'days.$.notes': input.notes,
                    'days.$.rating': input.rating,}}, // list fields you like to change
            {'new': true, 'upsert': true, 'safe': true});
            
          return updatedUser;
        }
        throw new AuthenticationError('You need to be logged in!');
      },
      deleteDay: async (parent, { dayID }, context) => {
        if (context.user) {
          
            return User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { days: {_id: dayID} } },
                { new: true }
            );
        }
        throw new AuthenticationError('You need to be logged in!');
    },
    }
}

module.exports = resolvers;
