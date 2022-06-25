
if (!process.env.STRAPI_URL) {
    console.log("No STRAPI_URL found in .env file. Please add it.");
    process.exit(-1)
}
import 'cross-fetch/polyfill'
import {ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: `${process.env.STRAPI_URL}/graphql`,
    cache: new InMemoryCache(),
    connectToDevTools: true,
})
export default client
