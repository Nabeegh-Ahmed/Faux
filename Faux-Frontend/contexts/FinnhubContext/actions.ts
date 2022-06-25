import { Dispatch } from "react"
import { IFinnhubState, IStockDetails } from "./types"
import axios from 'axios'

export const getActiveTickers = (): IStockDetails[] => {
    if (typeof window !== 'undefined') 
        return JSON.parse(localStorage?.getItem('activeTickers') || '[]')
    return []
}
const updateData = async() => {
    const activeTickers = getActiveTickers()
    const options = activeTickers.map((ticker: IStockDetails) => {
        return {
            method: 'GET',
            url: 'https://twelve-data1.p.rapidapi.com/time_series',
            params: {symbol: ticker.ticker, interval: '5min', outputsize: '1', format: 'json'},
            headers: {
                'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com',
                'X-RapidAPI-Key': process.env.FINNHUB_API_KEY
            }
        }
    })

    const data = await axios.all(options.map((option: any) => axios.request(option)))
    data.map((tickerData: any) => {
        const tickerIndex = activeTickers.findIndex((ticker: IStockDetails) => ticker.ticker === tickerData.data.meta.symbol)
        activeTickers[tickerIndex].lastPrice = tickerData.data.values[0].close
        activeTickers[tickerIndex].high = tickerData.data.values[0].high
    })
    localStorage.setItem('activeTickers', JSON.stringify(activeTickers))
}

export const initDataState = async (state: IFinnhubState, dispatch: Dispatch<any>) => {
    if (state.loading) return
    dispatch({type: "SOCKET_INIT_REQUEST"})
    try {
        // await updateData()
        const activeTickers = getActiveTickers()
        // console.log(activeTickers)
        setInterval(() => dataHandler(state, dispatch), 5000)
        dispatch({type: "SOCKET_INIT_SUCCESS", payload: {activeTickers}})
    } catch (err) {
        dispatch({type: "SOCKET_INIT_FAILURE", payload: err})
    }
}

export const addTicker = (state: IFinnhubState, dispatch: Dispatch<any>, ticker: IStockDetails) => {
    if (state.activeTickers.find(t => t.ticker === ticker.ticker)) {
        return
    }
    
    dispatch({type: "SOCKET_ADD_TICKER_REQUEST"})
    
    const activeTickers = [...state.activeTickers, {
        // lastPrice: random number between 200 and 1000
        lastPrice: Math.floor(Math.random() * (1000 - 200 + 1)) + 200,
        ticker: ticker.ticker,
        high: Math.floor(Math.random() * (1000 - 200 + 1)) + 200
    }]
    localStorage.setItem('activeTickers', JSON.stringify(activeTickers))

    dispatch({
        type: "SOCKET_ADD_TICKER_SUCCESS",
        payload: ticker
    })
}

export const removeTicker = (state: IFinnhubState, dispatch: Dispatch<any>, ticker: IStockDetails) => {
    dispatch({type: "SOCKET_REMOVE_TICKER_REQUEST"})

    const activeTickers = state.activeTickers.filter(t => t.ticker !== ticker.ticker)
    localStorage.setItem('activeTickers', JSON.stringify(activeTickers))

    dispatch({
        type: "SOCKET_REMOVE_TICKER_SUCCESS",
        payload: ticker
    })
}

export const dataHandler = async(state: IFinnhubState, dispatch: Dispatch<any>) => {
    if (state.loading) return
    console.log(state.activeTickers)
    
    if (state.activeTickers.length === 0) {
        // const activeTickers: IStockDetails[] = getActiveTickers().map(ticker => {
        //     return {
        //         ticker: ticker.ticker,
        //         lastPrice: Math.round(ticker.lastPrice + Math.random() *10),
        //         high: ticker.lastPrice
        //     }
        // })
        dispatch({
            type: 'SOCKET_UPDATE_TICKERS',
            payload: {activeTickers: getActiveTickers()}
        })
    } else {
        // const activeTickers: IStockDetails[] = state.activeTickers.map(ticker => {
        //     return {
        //         ticker: ticker.ticker,
        //         lastPrice: Math.round(ticker.lastPrice + Math.random() *10),
        //         high: ticker.lastPrice
        //     }
        // })
        
        
        dispatch({
            type: 'SOCKET_UPDATE_TICKERS',
            payload: {activeTickers: getActiveTickers()}
        })
    }

}