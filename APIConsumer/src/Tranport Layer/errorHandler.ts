import { ApolloError } from "apollo-boost";
import { GraphQLError } from "graphql";
import { RequestError } from "./types";

export const errorHandler = (error: any): RequestError => {
    const apolloError = error as GraphQLError
    return {
        message: apolloError.message,
        code: '400'
    }
}