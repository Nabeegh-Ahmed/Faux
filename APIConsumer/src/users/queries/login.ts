import { gql } from "apollo-boost"
const login = gql`
mutation loginUser ($email:String!, $password:String!) {
  login(input:{
    identifier: $email
    password: $password
  }) {
    jwt
    user {
      id
      username
      email
    }
  }
}
`
export default login