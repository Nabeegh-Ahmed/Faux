
if (!process.env.baseURL) {
    process.exit(-1)
}
import 'cross-fetch/polyfill'
import ApolloClient, { InMemoryCache } from "apollo-boost";
const client = new ApolloClient({
    uri: `${process.env.baseURL}/graphql`,
    cache: new InMemoryCache()
})
export default client
