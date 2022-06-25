import { gql } from "apollo-boost";

export const getUserBalance = gql`
query userData (
   $id: ID!
) {
  usersPermissionsUser(id: $id) {
    data {
      attributes {
        balance
      }
    }
  }
}`