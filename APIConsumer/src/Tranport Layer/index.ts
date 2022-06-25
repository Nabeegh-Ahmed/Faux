import client from '../apollo/client';
import { errorHandler } from './errorHandler';
import { RequestPayload } from './types';

export const request = async (payload: RequestPayload): Promise<{data: any, errors: any}> => {
     if (payload.method === 'MUTATION') {
        const {data, errors} = await client.mutate({
            mutation: payload.gql,
            variables: {
                ...payload.variables
            },
            context: {
                headers: {
                    ...payload.headers
                }
            }
        })
        return {data, errors}
    } else if (payload.method === 'QUERY') {
        const {data, errors} = await client.query({
            query: payload.gql,
            variables: {
                ...payload.variables
            },
            context: {
                headers: {
                    ...payload.headers
                }
            }
        }) 
        return {data, errors}
    }
    return {data: null, errors: null}
}