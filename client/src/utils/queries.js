import { gql } from "@apollo/client"; // eslint-disable-line no-unused-vars

export const GET_ME = gql`
  GetMe {
    me {
        _id
        username
        email
        savedBooks
    }
  }
`;
