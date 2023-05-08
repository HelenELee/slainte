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
         // if (context.user) {
            return Activity.find();
         // }
          throw new AuthenticationError('You need to be logged in!');
        },
        getChartData: async (parent, args, context) => {
           if (context.user) {
            //return User.findOne({ _id: context.user._id });
            return User.findOne({ _id: context.user._id }, {days : true});
           }
           throw new AuthenticationError('You need to be logged in!');
         },
         getDay: async (parent, { dayID }, context) => {
          if (context.user) {
                     
           const userData = await User.findOne({ _id: context.user._id }, 'days');
           //console.log("RESOLVERS", dayID);
           //console.log("USERDATA", userData.days);
           //const theDay = userData.days.find((day) => {day.id === dayID});
           var theDay = userData.days.filter(item => item.id === dayID);
          //console.log("THEDAY", theDay);
           return theDay[0];
           //return userData.days[0]
           
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
           
        },
        createDay: async (parent, { input }, context) => {
            
          if (context.user) {
               
            //  const newDay = await Day.create({input});
           //ole.log(input);
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
        //console.log("RESOLVERS - updateDay");
        if (context.user) {
          // console.log("FOOD", input.foodActivities);
          // console.log("MIND", input.mindActivities);
          // console.log("EXERCISE", input.exerciseActivities);
          // console.log("COMMS", input.commsActivities);
         // console.log("ID", dayID);
          const updatedUser = User.findOneAndUpdate({_id: context.user._id, days: {$elemMatch: {_id: dayID}}},
            {$set: {'days.$.foodActivities': input.foodActivities,
                    'days.$.mindActivities': input.mindActivities,
                    'days.$.exerciseActivities': input.exerciseActivities,
                    'days.$.commsActivities': input.commsActivities,
                    'days.$.sleep': input.sleep,
                    'days.$.notes': input.notes,
                    'days.$.rating': input.rating,}}, // list fields you like to change
            {'new': true, 'upsert': true, 'safe': true});
            //console.log("UPDATEDDAY", updatedUser);
          return updatedUser;
        }
        throw new AuthenticationError('You need to be logged in!');
      },
      deleteDay: async (parent, { dayID }, context) => {
        if (context.user) {
          //  const book = await Book.findOneAndDelete({bookId: bookId});
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
