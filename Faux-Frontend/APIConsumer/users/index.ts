import { request } from "../Tranport Layer";
import { AuthenticatedUser, LogInPayload, RegisterPayload } from "./types";
import login from "./queries/login";
import { errorHandler } from "../Tranport Layer/errorHandler";
import { usersPermissionsUser } from "./queries/usersPermissionsUser";
import { register } from "./queries/register";
import { defaultTransportParams, TransportParams } from "../Tranport Layer/types";
import { updateBalance } from "./queries/updateBalance";

class Users {
    private route = '/user'
    private transportParams: TransportParams = defaultTransportParams
    setTransportParams(transportParams: TransportParams) {
        if (this.transportParams.jwt === '') this.transportParams.jwt = transportParams.jwt
        else this.transportParams = transportParams
    }
    async getBalance(userId: string): Promise<string> {
        try {
            const {data} = await request({
                gql: usersPermissionsUser,
                headers: {
                    "Authorization": `Bearer ${this.transportParams.jwt}`
                },
                method: 'QUERY',
                variables: {
                    id: userId
                }
            })
            return data.usersPermissionsUser.data.attributes.balance

        } catch (error) {
            
            throw new Error(errorHandler(error).message)
        }
    }
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
                balance: userDetails.data.usersPermissionsUser.data.attributes.balance
            }
        } catch (error: any) {
            throw new Error(errorHandler(error).message)
        }
    }
    async register(userData: RegisterPayload): Promise<AuthenticatedUser> {
        try {
            const {data} = await request({gql: register, headers: {}, variables: { ...userData }, method: 'MUTATION'})
            await request({
                gql: updateBalance,
                headers: {
                    "Authorization": `Bearer ${this.transportParams.jwt}`
                },
                variables: {
                    userId: data.register.user.id,
                    balance: parseFloat("100000")
                },
                method: 'MUTATION'
            })
            return {
                id: data.register.user.id,
                token: data.register.jwt,
                username: data.register.user.username,
                email: data.register.user.email,
                balance: '100000'
            }
        } catch (error) {
            throw new Error(errorHandler(error).message)
        }
    }
}

export default Users