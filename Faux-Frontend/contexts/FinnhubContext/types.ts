export interface IStockDetails {
    lastPrice: number,
    ticker: string,
    high: number
}

export interface IFinnhubState {
    activeTickers: IStockDetails[]
    error: string
    loading: boolean
}

export type ActionType =
    'SOCKET_INIT_REQUEST' | 'SOCKET_INIT_SUCCESS' | 'SOCKET_INIT_FAILURE' |
    'SOCKET_ADD_TICKER_REQUEST' | 'SOCKET_ADD_TICKER_SUCCESS' | 'SOCKET_ADD_TICKER_FAILURE' |
    'SOCKET_REMOVE_TICKER_REQUEST' | 'SOCKET_REMOVE_TICKER_SUCCESS' | 'SOCKET_REMOVE_TICKER_FAILURE' |
    'SOCKET_UPDATE_TICKERS' | 'SOCKET_UPDATE_TICKERS_REQUEST'


export type Actions = {
    type: ActionType,
    payload: any
}