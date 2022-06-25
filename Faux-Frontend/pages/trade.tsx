import MakeOrderCard from "../components/makeOrderCard"
import { NextPage } from "next"
import React from "react"
import InputBar from "../components/inputBar"
import { FinnhubContext } from "../contexts/FinnhubContext"
import MainLayout from "../layouts/mainLayout"
import {AiOutlineSearch} from "react-icons/ai"
import { IStockDetails } from "../contexts/FinnhubContext/types"
import { addTicker } from "../contexts/FinnhubContext/actions"
import FauxAPI from "../APIConsumer"
import { UserContext } from "../contexts/UserContext"
import { TradeData } from "../APIConsumer/trades/types"
import { updateBalance } from "../contexts/UserContext/actions"
import Alert from "../components/alert"

const Trade: NextPage = () => {
    const [search, setSearch] = React.useState('')
    const [trades, setTrades] = React.useState<TradeData[]>([])
    const {state, dispatch} = React.useContext(UserContext)
    React.useEffect(() => {
        if (state.isAuth && state.user) {
            const api = new FauxAPI()
            api.trades({
                jwt: state.user.jwt
            }).getTrades(String(state.user.id)).then(trades => setTrades(trades))
        }
    }, [state.isAuth])
    const dataState = React.useContext(FinnhubContext)
    const handleCloseTrade = (tradeId: string, ticker: string) => {
        if (state.user) {
            const api = new FauxAPI()
            const currentPrice = dataState.state.activeTickers.find(t => t.ticker === ticker)?.lastPrice
            if (!currentPrice) return
            api.trades({
                jwt: state.user?.jwt
            })
            .closeTrade({userId: String(state.user.id), tradeId: tradeId, currentPrice: currentPrice})
            .then((status: any) => {                
                const newTrades = trades.filter(t => t.id !== tradeId)
                setTrades(newTrades)
                updateBalance(dispatch, status.balance)
            })
        }
    }
    return (
        <MainLayout>
        <div className="grid grid-cols-12 relative">
            <div className="col-span-2 hidden lg:block h-screen border-white" style={{borderRight: "1px solid"}}>    
                <MakeOrderCard setTrades={setTrades} />
            </div>

            <div className="col-span-12 lg:col-span-8 lg:h-screen bg-primary-background p-4 text-white w-full">
                <div className="flex justify-between">
                    <div className="text-4xl font-bold mb-4">Active Trades</div>
                </div>

                {
                    trades.length === 0 && <Alert message="No active trades found" type="success" />
                }
                
                
                <div className="shadow overflow-scroll overflow-y-hidden lg:overflow-hidden border-b border-gray-200 rounded-lg my-4 w-full">
                        
                        <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-secondary-background">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-md font-medium text-primary-button uppercase tracking-wider">#id</th>
                                <th scope="col" className="px-6 py-3 text-left text-md font-medium text-primary-button uppercase tracking-wider">Ticker</th>
                                <th scope="col" className="px-6 py-3 text-left text-md font-medium text-primary-button uppercase tracking-wider">Size</th>
                                <th scope="col" className="px-6 py-3 text-left text-md font-medium text-primary-button uppercase tracking-wider">Bought at</th>
                                <th scope="col" className="px-6 py-3 text-left text-md font-medium text-primary-button uppercase tracking-wider">Date</th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {
                                trades.map(trade => {
                                    if (trade.status === "OPEN")
                                    return (
                                        <tr key={trade.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="ml-4">
                                                        {trade.id}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {trade.ticker}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="p-2 px-4 bg-white bg-opacity-20 rounded-lg" style={{width: "fit-content"}}>
                                                    {trade.numberOfShares}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="p-2 px-4 bg-white bg-opacity-20 rounded-lg" style={{width: "fit-content"}}>
                                                    {trade.unitPrice}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trade.createdAt.split('T')[0]}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                
                                                    
                                            <div 
                                                className="bg-primary-button p-2 px-4 uppercase rounded-xl text-primary-background font-bold" 
                                                style={{width: "fit-content"}}
                                                onClick={() => handleCloseTrade(trade.id, trade.ticker)}
                                            >
                                                Close
                                            </div>
                                                
                                                
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                        </table>
                    </div>


            </div>

            <div className="col-span-12 lg:col-span-2 bg-primary-background h-screen p-4 text-white">
                <form onSubmit={(e) => {
                    e.preventDefault()
                    addTicker(dataState.state, dataState.dispatch, {ticker: search, high: 0, lastPrice: 0})
                    setSearch("")
                }}>
                    <InputBar value={search} onChange={(e: any) => setSearch(e.target.value)} placeholder="Add new ticker" icon={<AiOutlineSearch size={32} className="ml-1" />} />
                </form>
                <div className="my-4 text-xl rounded-xl" style={{border: "1px solid gray"}}>
                    <div className="flex justify-between text-primary-button bg-secondary-background rounded-xl font-bold text-sm p-2">
                        <div>Ticker</div>
                        <div>Price</div>
                        <div>Volume</div>
                    </div>
                    
                    {
                        dataState.state.activeTickers.map((ticker: IStockDetails) => {
                            return  <div className="flex justify-between text-sm p-2" style={{borderTop: "1px solid gray"}} key={ticker.ticker}>
                                <div>{ticker.ticker}</div>
                                <div>{ticker.lastPrice}</div>
                                <div>{ticker.high}</div>
                            </div>
                        })
                    } 
                    
                </div>
            </div>
        </div>
        </MainLayout>
    )
}

export default Trade