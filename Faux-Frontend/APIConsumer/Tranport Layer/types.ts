import { DocumentNode } from "graphql"

export interface RequestPayload {
    variables: any
    headers: any
    gql: DocumentNode
    method: 'MUTATION' | 'QUERY'
}

export interface TransportParams {
    headers?: any
    jwt: string
}

export const defaultTransportParams = {
    headers: {},
    jwt: ''
}

export interface RequestError {
    message: string
    code: string
}