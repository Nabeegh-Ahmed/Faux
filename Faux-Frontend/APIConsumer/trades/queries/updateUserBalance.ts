import { gql } from "@apollo/client";

export const updateUserBalance = gql`
mutation updateUserBalance ($id:ID!, $balance: Float) {
  updateUsersPermissionsUser(id: $id, data: {
    balance: $balance
  }) {
    __typename
  }
}`