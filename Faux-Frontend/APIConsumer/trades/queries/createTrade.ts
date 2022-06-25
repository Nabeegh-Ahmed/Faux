import { gql } from "@apollo/client";

export const createTrade = gql`
mutation createTrade ($ticker: String, $numberOfShares: Int, $unitPrice:Float, $userId: ID!, $orderType:ENUM_TRADE_ORDERTYPE, $balance:Float) {
  createTrade(data:{
    ticker: $ticker,
    numberOfShares: $numberOfShares,
    unitPrice: $unitPrice,
    users_permissions_user: $userId,
    status: OPEN,
    orderType:$orderType
  }) {
    data {
      id
      attributes {
        unitPrice
      }
    }
  }
  updateUsersPermissionsUser (id: $userId, data: {
    balance: $balance
  }) {
    __typename
  }
}`