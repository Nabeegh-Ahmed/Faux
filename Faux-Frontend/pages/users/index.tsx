import Alert from "../../components/alert"
import React from "react"
import FauxAPI from "../../APIConsumer"
import { TradeData } from "../../APIConsumer/trades/types"
import { UserContext } from "../../contexts/UserContext"
import MainLayout from "../../layouts/mainLayout"
import Link from "next/link"

const Users = () => {
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

    return (
        <MainLayout>
        <div className="col-span-12 lg:col-span-8 lg:h-screen bg-primary-background p-4 text-white w-full">
                <Link href={"/ideas/create"} passHref>
                    <div className="p-4 bg-primary-button text-primary-background text-center uppercase rounded-lg font-bold">
                        Create Idea
                    </div>
                </Link>
                <div className="flex justify-between">
                    <div className="text-4xl font-bold mb-4">Past Trades</div>
                </div>

                {
                    trades.length === 0 && <Alert message="No past trades found" type="success" />
                }
                
                
                <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg my-4">
                        
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
                                    if (trade.status === "CLOSED")
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
                                                
                                            >
                                                Closed
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
        </MainLayout>
    )
}

export default Users