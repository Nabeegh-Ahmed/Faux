import { gql } from "@apollo/client";

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