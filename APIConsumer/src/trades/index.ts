import { request } from "../Tranport Layer";
import { CreateTradePayload, CloseTradePayload, TradeData } from "./types";
import { createTrade } from "./queries/createTrade";
import { defaultTransportParams, TransportParams } from "../Tranport Layer/types";
import { errorHandler } from "../Tranport Layer/errorHandler";
import { closeTrade } from "./queries/closeTrade";
import { trade, trades } from "./queries/getTrades";
import { updateUserBalance } from "./queries/updateUserBalance";
import { getUserBalance } from "./queries/userData";

class Trades {
    private route = '/trade'
    private transportParams: TransportParams = defaultTransportParams
    async createTrade(tradeData: CreateTradePayload): Promise<TradeData> {
        try {
            if (this.transportParams.jwt === '') throw new Error('No JWT provided')
            const userBalance = (await request({ 
                gql: getUserBalance,
                headers: {
                    "Authorization": `Bearer ${this.transportParams.jwt}`,
                    ...this.transportParams.headers
                },
                variables: {
                    id: tradeData.userId
                },
                method: 'QUERY'
            })).data.usersPermissionsUser.data.attributes.balance
            
            if (userBalance < tradeData.unitPrice * tradeData.numberOfShares) throw new Error('Not enough balance')
            
            const {data} = await request({ 
                gql: createTrade, 
                headers: {
                    "Authorization": `Bearer ${this.transportParams.jwt}`,
                    ...this.transportParams.headers
                },
                variables: { ...tradeData, balance: userBalance - tradeData.unitPrice * tradeData.numberOfShares }, 
                method: 'MUTATION' 
            })
            return {
                id: data.createTrade.data.id,
                ticker: tradeData.ticker,
                numberOfShares: tradeData.numberOfShares,
                unitPrice: tradeData.unitPrice,
                orderType: tradeData.orderType,
                userId: tradeData.userId,
                status: 'OPEN',
                createdAt: (new Date()).toString()
            }
        } catch(error) {
            throw new Error(errorHandler(error).message)
        }
    }
    async closeTrade(tradeData: CloseTradePayload) {
        try {
            if (this.transportParams.jwt === '') throw new Error('No JWT provided')
            const [_currentTrade, _userBalance] = await Promise.all([
                request({
                    gql: trade,
                    headers: {},
                    variables: {
                        tradeId: tradeData.tradeId
                    },
                    method: 'QUERY'
                }),
                request({ 
                    gql: getUserBalance,
                    headers: {
                        "Authorization": `Bearer ${this.transportParams.jwt}`,
                        ...this.transportParams.headers
                    },
                    variables: {
                        id: tradeData.userId
                    },
                    method: 'QUERY'
                })
            ])
            const currentTrade = _currentTrade.data.trade.data.attributes
            if (currentTrade.status === 'CLOSED') throw new Error('Trade already closed')
            const userBalance = _userBalance.data.usersPermissionsUser.data.attributes.balance

            const { data } = await request({
                gql: closeTrade,
                headers: {
                    "Authorization": `Bearer ${this.transportParams.jwt}`,
                    ...this.transportParams.headers
                },
                variables: { 
                    ...tradeData, 
                    balance: currentTrade.orderType === 'BUY' ? userBalance + tradeData.currentPrice * currentTrade.numberOfShares : 
                    userBalance + currentTrade.unitPrice * currentTrade.numberOfShares + (currentTrade.unitPrice * currentTrade.numberOfShares - tradeData.currentPrice * currentTrade.numberOfShares)
                },
                method: 'MUTATION'
            })
            return {
                status: data.updateTrade.data.attributes.status
            }
        } catch (error) {
            throw new Error(errorHandler(error).message)
        }
    }
    async getTrades(userId: string) : Promise<TradeData[]> {
        try {
            
            const {data} = await request({
                gql: trades,
                headers: {
                    ...this.transportParams.headers
                },
                variables: { 
                    userId: {
                        id: {
                            contains: userId
                        }
                    }
                },
                method: 'QUERY'
            })
            return data.trades.data.map((trade: any) => {
                return {
                    id: trade.id,
                    ticker: trade.attributes.ticker,
                    numberOfShares: trade.attributes.numberOfShares,
                    unitPrice: trade.attributes.unitPrice,
                    orderType: trade.attributes.orderType,
                    userId: userId,
                    status: trade.attributes.status,
                    createdAt: trade.attributes.createdAt
                }
            })
        } catch (error) {
            throw new Error(errorHandler(error).message)
        }
    }
    setTransportParams(transportParams: TransportParams) {
        if (this.transportParams.jwt === '') this.transportParams.jwt = transportParams.jwt
        else this.transportParams = transportParams
    }
}

export default Trades