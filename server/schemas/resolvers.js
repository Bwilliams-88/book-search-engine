const { signToken, AuthenticationError } = require("../utils/auth");
const { User } = require("../models/");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.User) {
        const userInfo = await User.findOne({ _id: context.user._id });
        return userInfo;
      }
      throw AuthenticationError;
    },
  },
  Mutation: {
    addUser: async (parent, args, context) => {
      const userInfo = await User.create(args);
      const token = signToken(userInfo);
      return { userInfo, token };
    },
    login: async (parent, args, context) => {
      const user = await User.findOne({ email: args.email });
      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await User.isCorrectPassword(args.password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return { user, token };
    },
    saveBook: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: args.bookInfo } },
          { new: true, runValidators: true }
        );
        return user;
      }
      throw AuthenticationError;
    },
    removeBook: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: args.bookId } },
          { new: true, runValidators: true }
        );
        return user;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
