import { gql } from "@apollo/client";
export const updateBalance = gql`
mutation ($userId: ID!, $balance: Float){
 updateUsersPermissionsUser (id: $userId, data: {
    balance: $balance
  }) {
    __typename
  } 
}
`