export interface CreateTradePayload {
    ticker: string,
    numberOfShares: number,
    unitPrice: number,
    orderType: 'BUY' | 'SELL'
    userId: string
}

export interface CloseTradePayload {
    tradeId: string,
    userId: string,
    currentPrice: number,
}

export interface TradeData {
    id: string,
    ticker: string,
    numberOfShares: number,
    unitPrice: number,
    orderType: 'BUY' | 'SELL'
    userId: string
    status: 'OPEN' | 'CLOSED',
    createdAt: string
}