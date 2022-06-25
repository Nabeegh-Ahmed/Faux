import InputBar from '../inputBar'
import React, { Dispatch } from 'react'
import {AiOutlineStock, AiOutlineDollar} from 'react-icons/ai'
import { UserContext } from '../../contexts/UserContext'
import { FinnhubContext } from '../../contexts/FinnhubContext'
import FauxAPI from '../../APIConsumer'
import { getUpdatedBalance, updateBalance } from '../../contexts/UserContext/actions'
import { TradeData } from '../../APIConsumer/trades/types'

interface MakeOrderCardProps {
    setTrades: Dispatch<any>
}
const MakeOrderCard: React.FC<MakeOrderCardProps> = ({ setTrades }) => {
    const [orderType, setOrderType] = React.useState("buy")
    const [orderTicker, setOrderTicker] = React.useState("")
    const [positionSize, setPositionSize] = React.useState<number>()
    const [orderCorrect, setOrderCorrect] = React.useState(false)
    
    const { state, dispatch } = React.useContext(UserContext)
    const stockDataContext = React.useContext(FinnhubContext)
    
    React.useEffect(() => {
        if (!state.user || !positionSize || positionSize === 0) return
        const found = stockDataContext.state.activeTickers.find(t => t.ticker === orderTicker)
        if (found) {
            if (found.lastPrice*positionSize < Number(state.user.balance)) {
                setOrderCorrect(true)
            } else setOrderCorrect(false)
        } else setOrderCorrect(false)

    }, [orderType, orderTicker, stockDataContext.state.activeTickers, positionSize, state.user])

    const handleExecuteTrade = () => {
        if (!state.user || !positionSize) return
        const stock = stockDataContext.state.activeTickers.find(t => t.ticker === orderTicker)?.lastPrice
        if (!stock) return
        const api = new FauxAPI()
        
        api.trades({
            jwt: state.user.jwt
        })
        .createTrade({
            userId: String(state.user.id),
            ticker: orderTicker,
            numberOfShares: positionSize,
            orderType: orderType === "buy" ? "BUY" : "SELL",
            unitPrice: stock
        })
        .then((trade: TradeData) => {
            setTrades((prev: TradeData[]) => [...prev, trade])
            
            if (state.user)
            updateBalance(dispatch, String(Number(state.user.balance) - (trade.unitPrice*trade.numberOfShares)))

            setOrderCorrect(false)
            setOrderTicker("")
            setPositionSize(undefined)
            
        })
    }

    return (
        <div className='h-full w-full bg-secondary-background text-white flex flex-col justify-between'>
            <div>
                <div className="flex space-x-4 text-2xl p-4 w-full bg-white bg-opacity-5 items-center shadow-white shadow-xl">
                    <AiOutlineStock size={32} className="p-2 rounded-full bg-white bg-opacity-20" />
                    <div>Execute Trade</div>
                </div>

                <div className='mx-4'>
                    <div className="my-4 px-1">
                        <div className="flex  justify-between py-2 text-opacity-80">
                            <div className="text-gray-400">Buyer</div>
                            <div className="p-2 px-4 bg-white bg-opacity-20 rounded-lg">{state.user?.username}</div>
                        </div>
                        <div className="flex justify-between py-2 text-opacity-80">
                            <div className="text-gray-400">Balance</div>
                            <div>${state.user?.balance}</div>
                        </div>
                    </div>

                    <hr className="my-4 opacity-50 rounded-xl"/>

                    <div 
                        style={{border: "1px solid gray"}}
                        className="bg-gray-900 flex items-center p-1 rounded-lg border-gray-900 uppercase " 
                    >
                        <div 
                            className={`${orderType === "sell" ? "bg-primary-button text-primary-background font-bold" : ""} p-2 rounded-lg w-1/2 text-center`}
                            onClick={() => setOrderType("sell")}
                        >
                            Sell
                        </div>
                        <div
                            className={`${orderType === "buy" ? "bg-primary-button text-primary-background font-bold" : ""} p-2 rounded-lg w-1/2 text-center`}
                            onClick={() => setOrderType("buy")}
                        >
                            BUY
                        </div>
                    </div>

                    <div className='text-sm text-gray-200 mt-6 mb-2'>Position Size</div>
                    <InputBar placeholder='Position Size' type='number' value={positionSize ? positionSize : ""} onChange={(e) => setPositionSize(Number((e.target as HTMLInputElement).value))} icon={<AiOutlineDollar size={24} className="ml-2"/>}/>

                    <div className='text-sm text-gray-200 mt-6 mb-2'>Ticker</div>
                    <InputBar placeholder='AAPL' value={orderTicker} onChange={(e) => setOrderTicker((e.target as HTMLInputElement).value)} icon={<AiOutlineDollar size={24} className="ml-2"/>}/>
                    
                </div>
            </div>

            <div className='items-end mx-4 mb-16'>
                {
                    positionSize && orderTicker && orderCorrect && stockDataContext.state.activeTickers.find(t => t.ticker === orderTicker) &&
                    <>
                    <div className='font-bold'>Buy Summary</div>
                    <div className='my-4'>
                        <div className='flex justify-between'>
                            <div className='text-gray-300'>Liquidation Price</div>
                            <div>${(positionSize*stockDataContext.state.activeTickers.find(t => t.ticker === orderTicker)?.lastPrice).toFixed(2)}</div>
                        </div>

                        <div className='flex justify-between'>
                            <div className='text-gray-300'>Open Fee</div>
                            <div className='text-red-500'>$10</div>
                        </div>

                        <hr className="my-4 opacity-50 rounded-xl"/>

                        <div className='flex justify-between'>
                            <div className='text-gray-300'>Total</div>
                            <div>${(positionSize*stockDataContext.state.activeTickers.find(t => t.ticker === orderTicker)?.lastPrice+10).toFixed(2)}</div>
                        </div>

                        <div 
                            className={`${orderCorrect ? "bg-primary-button" : "bg-white bg-opacity-20" }  w-full rounded-lg uppercase text-center p-3 text-lg text-primary-background font-bold my-4`}
                            onClick={handleExecuteTrade}
                        >
                            Place {orderType} Order
                        </div>
                    </div>   
                    </>
                }

            </div>

        </div>


    )
}

export default MakeOrderCard
