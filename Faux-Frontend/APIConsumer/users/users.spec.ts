import 'jest'
import Users from './'

describe('Users tests', () => {
    const users = new Users()
    it('should login and get data', async() => {
        const { id, token } = await users.login({
            email: 'test@gmail.com',
            password: '123456'
        })
        expect(id).toBeDefined()
        expect(token).toBeDefined()
    })
    it('should register a new user', async() => {
        const { id, token } = await users.register({
            email: `test${Math.random()}@test.com`,
            password: `1231232131241ssda@N`,
            username: `test${Math.random()}`
        })
        expect(id).toBeDefined()
        expect(token).toBeDefined()
    })
    it('should check for wrong password or identifier', () => {
        expect(users.login({
            email: 'asdsada',
            password: 'asdasdasd'
        })).rejects.toThrow('Invalid identifier or password')
    })
    it('should check for same email registration', () => {
        expect(users.login({
            email: 'test@gmail.com',
            password: '123456'
        })).rejects.toThrow('Email is already taken')
    })
})