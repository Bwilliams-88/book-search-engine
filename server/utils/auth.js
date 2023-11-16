const jwt = require("jsonwebtoken");
const { GraphQLError } = require("graphql");

const secret = "mysecretsshhhhh";
const expiration = "2h";

module.exports = {
  // updated middleware function to work with GraphQL API
  AuthenticationError: new GraphQLError("Could not authenticate user.", {
    extenstions: {
      code: "UNAUTHENTICATED",
    },
  }),

  authMiddleware: function ({ req }) {
    let token = req.query.token || req.headers.authorization || req.body.token;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
    }

    return req;
  },

  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
