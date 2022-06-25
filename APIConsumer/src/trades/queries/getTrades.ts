import { gql } from "apollo-boost";

export const trades = gql`
query ($userId:UsersPermissionsUserFiltersInput){
    trades(filters: {
      users_permissions_user: $userId
    }){
      data {
        id
        attributes {
          ticker
          numberOfShares
          unitPrice
          status
          orderType
          createdAt
        }
      }
    }
  }`

export const trade = gql`
query ($tradeId:ID!){
    trade(id:$tradeId){
      data {
        id
        attributes {
          ticker
          numberOfShares
          unitPrice
          status
          orderType
          createdAt
        }
      }
    }
  }`