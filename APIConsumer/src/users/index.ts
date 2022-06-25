import { request } from "../Tranport Layer";
import { AuthenticatedUser, LogInPayload, RegisterPayload } from "./types";
import login from "./queries/login";
import { errorHandler } from "../Tranport Layer/errorHandler";
import { usersPermissionsUser } from "./queries/usersPermissionsUser";
import { register } from "./queries/register";

class Users {
    private route = '/user'
    async login(userData: LogInPayload): Promise<AuthenticatedUser> {
        try {
            const {data} = await request({ gql: login, headers: {}, variables: { ...userData }, method: 'MUTATION' })
            const userDetails = await request({ 
                gql: usersPermissionsUser, 
                headers: {
                    "Authorization": `Bearer ${data.login.jwt}`
                },
                method: 'QUERY',
                variables: {
                    id: data.login.user.id
                }
            })
            return {
                token: data.login.jwt,
                id: data.login.user.id,
                username: data.login.user.username,
                email: data.login.user.email,
                balance: userDetails.data.usersPermissionsUser.balance
            }
        } catch (error: any) {
            throw new Error(errorHandler(error).message)
        }
    }
    async register(userData: RegisterPayload): Promise<AuthenticatedUser> {
        try {
            const {data} = await request({gql: register, headers: {}, variables: { ...userData }, method: 'MUTATION'})
            return {
                id: data.register.user.id,
                token: data.register.jwt,
                username: data.register.user.username,
                email: data.register.user.email,
                balance: '0'
            }
        } catch (error) {
            throw new Error(errorHandler(error).message)
        }
    }
}

export default Users