import Users from '../users'
import { TransportParams, defaultTransportParams } from '../Tranport Layer/types'
import Trades from '../trades'
import Ideas from '../ideas'
import UsersPerformance from '../usersPerformance'

class FauxAPI {
    private m_users: Users
    private m_trades: Trades
    private m_ideas: Ideas
    private m_users_performance: UsersPerformance
    constructor(baseURL: string = process.env.baseURL ? process.env.baseURL : 'http://localhost:1337/graphql') {
        process.env.baseURL = baseURL
        this.m_users = new Users()   
        this.m_trades = new Trades()
        this.m_ideas = new Ideas()
        this.m_users_performance = new UsersPerformance()
    }
    trades(transportParams: TransportParams = defaultTransportParams) {
        this.m_trades.setTransportParams(transportParams)
        return this.m_trades
    }
    ideas(transportParams: TransportParams = defaultTransportParams) {
        this.m_trades.setTransportParams(transportParams)
        return this.m_ideas
    }
    users() {
        return this.m_users
    }
    usersPerformance() {
        return this.m_users_performance
    }
}

export default FauxAPI