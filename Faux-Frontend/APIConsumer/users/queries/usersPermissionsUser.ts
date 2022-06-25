import { gql } from "@apollo/client";

export const usersPermissionsUser = gql`
query userData($id:ID!) {
  usersPermissionsUser(id: $id) {
    data {
      attributes {
        username
        email
        balance
      }
    }
  }
}`