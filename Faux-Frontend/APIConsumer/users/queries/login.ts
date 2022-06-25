import { gql } from "@apollo/client"
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