import { Dispatch } from "react"
import FauxAPI from "../../APIConsumer"
import { LogInPayload, RegisterPayload } from "../../APIConsumer/users/types"
import { IUserState } from "./types"

export const checkUserLoggedIn = (dispatch: Dispatch<any>) => {
    dispatch({type: "LOGIN_REQUEST"})
    // Get user object from local storage
    const user = localStorage.getItem("user")
    if (user) {
        // If user object exists, dispatch success action
        dispatch({type: "LOGIN_SUCCESS", payload: JSON.parse(user)})
    } else {
        // If user object does not exist, dispatch failure action
        dispatch({type: "LOGIN_FAIL"})
    }
}

export const login = async (dispatch: Dispatch<any>, loginPayload: LogInPayload) => {
    try {
        dispatch({type: "LOGIN_REQUEST"})
        const api = new FauxAPI()
        const user = await api.users().login(loginPayload)
        localStorage.setItem("user", JSON.stringify(user))
        dispatch({
            type: "LOGIN_SUCCESS",
            payload: user
        })
    } catch (error: any) {
        dispatch({
            type: "LOGIN_FAIL",
            payload: { error: error.message }
        })
        throw Error("Failed")
    }
}

export const register = async (dispatch: Dispatch<any>, registerPayload: RegisterPayload) => {
    try {
        dispatch({type: "REGISTER_REQUEST"})
        const api = new FauxAPI()
        const user = await api.users().register(registerPayload)
        localStorage.setItem("user", JSON.stringify(user))
        dispatch({
            type: "REGISTER_SUCCESS",
            payload: user
        })
    } catch (error: any) {
        dispatch({
            type: "REGISTER_FAIL",
            payload: {error: error.message}
        })
        throw Error("Failed")
    }
}

export const logout = (dispatch: Dispatch<any>) => {
    dispatch({type: "LOGOUT"})
    localStorage.removeItem("user")
}

export const updateBalance = (dispatch: Dispatch<any>, balance: string) => {
    dispatch({
        type: "UPDATE_BALANCE",
        payload: {balance: Number(balance)}
    })
}

export const getUpdatedBalance = async (dispatch: Dispatch<any>) => {
    // get usre from local storage
    const _user = localStorage.getItem("user")
    if (!_user) return
    const user = JSON.parse(_user)
    if (!user) return
    const api = new FauxAPI()
    
    const balance = await api.users({
        jwt: user.jwt || user.token
    }).getBalance(String(user.id))
    
    dispatch({
        type: "UPDATE_BALANCE",
        payload: {balance: balance}
    })
    localStorage.setItem("user", JSON.stringify({
        ...user,
        balance
    }))
}
