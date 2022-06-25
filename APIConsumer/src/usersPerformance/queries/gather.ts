import { gatherbalance } from "../types";
import { gql } from "apollo-boost";




export const getUsers = gql`
query getUsers {
    usersPermissionsUsers {
      data {
        id
        attributes {
          balance
        }
      }
    }
  
}`

export const addPerformance=gql`
mutation addPerformance(
  $Id: ID
  $balance: Float
  $date:Date
) {
  createUserPerformance(data: {
    users_permissions_user: $Id,
    balance:$balance
    date:$date
  }) {
    data {
      id
      attributes{
        balance
        date
      }
      
    }
  }
}`
