export interface IUserDetails {
    id: number
    email: string
    username: string,
    balance: string,
    jwt: string
}

export interface IUserState {
    isAuth: boolean
    user: IUserDetails | null
    error: string
    loading: boolean
}

export type ActionType =
    'LOGIN_REQUEST' | 'LOGIN_SUCCESS' | 'LOGIN_FAIL' |
    'LOGOUT' | 'REGISTER_REQUEST' | 'REGISTER_SUCCESS' | 'REGISTER_FAIL' | 'UPDATE_BALANCE'

export type Actions = {
    type: ActionType,
    payload: any
}