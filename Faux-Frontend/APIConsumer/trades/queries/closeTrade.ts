import { gql } from "@apollo/client";

export const closeTrade = gql`
mutation closeTrade($tradeId:ID!, $userId:ID!, $balance:Float) {
  updateTrade(id: $tradeId, data:{
    status:CLOSED
  }) {
    data {
      attributes {
        status
      }
    }
    __typename
  }
  updateUsersPermissionsUser (id: $userId, data: {
    balance: $balance
  }) {
    __typename
  }
}`