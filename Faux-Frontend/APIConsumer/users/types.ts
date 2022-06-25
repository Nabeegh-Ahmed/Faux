export interface RegisterPayload {
    username: string,
    email: string,
    password: string
}

export interface LogInPayload {
    email: string,
    password: string
}

export interface AuthenticatedUser {
    id: string,
    token: string,
    username: string,
    email: string,
    balance: string
}

export interface AuthErrorPayload {
    errorCode: string,
    message: string
}