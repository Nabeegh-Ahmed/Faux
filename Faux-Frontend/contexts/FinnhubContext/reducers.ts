import { IFinnhubState } from "./types";
import { Actions } from "./types";

export const initialFinnhubState: IFinnhubState = {
    activeTickers: [],
    error: '',
    loading: false,
}

export const dataReducer = (state: IFinnhubState, action: Actions): IFinnhubState => {
    switch (action.type) {
        case 'SOCKET_INIT_REQUEST':
            return {
                ...state,
                loading: true,
            }
        case 'SOCKET_INIT_SUCCESS':
            return {
                ...state,
                loading: false,
                activeTickers: action.payload.activeTickers
            }
        case 'SOCKET_INIT_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case 'SOCKET_ADD_TICKER_REQUEST':
            return {
                ...state,
                loading: true,
            }
        case 'SOCKET_ADD_TICKER_SUCCESS':
            return {
                ...state,
                loading: false,
                activeTickers: [...state.activeTickers, action.payload],
            }
        case 'SOCKET_ADD_TICKER_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case 'SOCKET_REMOVE_TICKER_REQUEST':
            return {
                ...state,
                loading: true,
            }
        case 'SOCKET_REMOVE_TICKER_SUCCESS':
            return {
                ...state,
                loading: false,
                activeTickers: state.activeTickers.filter(ticker => ticker.ticker !== action.payload),
            }
        case 'SOCKET_REMOVE_TICKER_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case 'SOCKET_UPDATE_TICKERS_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'SOCKET_UPDATE_TICKERS':
            
            return {
                ...state,
                activeTickers: action.payload.activeTickers,
            }

        default: {
            return state
        }
    }
}