import 'jest'
import Trades from '.'
import Users from '../users'

describe('Trades tests', () => {
    const users = new Users()
    const trades = new Trades()
    it('should login and create a trade', async() => {
        const { id, token } = await users.login({
            email: 'test@gmail.com',
            password: '123456'
        })
        expect(id).toBeDefined()
        expect(token).toBeDefined()
        trades.setTransportParams({jwt: token})
        const trade = await trades.createTrade({
            ticker: 'AAPL',
            numberOfShares: 10,
            unitPrice: 100,
            orderType: 'BUY',
            userId: id
        })
        expect(trade).toBeDefined()
        expect(trade.id).toBeDefined()
        expect(trade.ticker).toBe('AAPL')
        expect(trade.numberOfShares).toBe(10)
        expect(trade.unitPrice).toBe(100)
        expect(trade.orderType).toBe('BUY')
        expect(trade.userId).toBe(id)
        expect(trade.status).toBe('OPEN')
    })
    it('should login and close a trade', async() => {
        const { id, token } = await users.login({
            email: 'test@gmail.com',
            password: '123456'
        })
        expect(id).toBeDefined()
        expect(token).toBeDefined()
        trades.setTransportParams({jwt: token})
        const trade = await trades.closeTrade({
            tradeId: '7',
            userId: id,
            currentPrice: 22.3
        })
        expect(trade).toBeDefined()
        expect(trade.status).toBe('CLOSED')
    })
})