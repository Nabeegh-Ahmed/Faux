import { IUserState } from "./types";
import { Actions } from "./types";

export const initialUserState: IUserState = {
    isAuth: false,
    user: null,
    error: '',
    loading: false,
}

export const userReducer = (state: IUserState, action: Actions): IUserState => {
    switch (action.type) {
        case "LOGIN_REQUEST": {
            return {
                ...state,
                error: "",
                loading: true
            }
        }

        case "LOGIN_SUCCESS": {
            const { id, email, username, balance, token, jwt } = action.payload
            return {
                ...state,
                isAuth: true,
                loading: false,
                error: '',
                user: {
                    id: id,
                    email: email,
                    username: username,
                    balance: balance,
                    jwt: token || jwt
                },
            }
        }

        case "LOGIN_FAIL": {
            const { error } = action.payload || ""
            console.log(error)
            return {
                ...state,
                isAuth: false,
                user: null,
                error: action.payload?.error,
                loading: false
            }
        }

        case "LOGOUT": {
            return {
                ...state,
                isAuth: false,
                user: null,
                loading: false,
                error: ''
            }
        }

        case "REGISTER_REQUEST": {
            return {
                ...state,
                loading: true
            }
        }

        case "REGISTER_SUCCESS": {
            const { id, email, username, balance, token } = action.payload
            return {
                ...state,
                isAuth: true,
                loading: false,
                error: '',
                user: {
                    id: id,
                    email: email,
                    username: username,
                    balance: balance,
                    jwt: token
                }
            }
        }

        case "REGISTER_FAIL": {
            return {
                ...state,
                isAuth: false,
                user: null,
                error: action.payload.error,
                loading: false
            }
        }

        case "UPDATE_BALANCE": {
            const { balance } = action.payload
            if (!balance || !state.user) return state
            
            return {
                ...state,
                user: {
                    ...state.user,
                    balance: String(balance.toFixed(2))
                }
            }
        }

        default: {
            return state
        }
    }
}