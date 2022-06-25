import UsersPerformance from "."
import Users from "../users"

export interface gatherbalance{
    balance: string
    date: string
    userpermissions: Users
}

export interface UsersPerformancePayLoad{
    Id: string
    balance: number
    date: string
}
export interface RequestPayLoad{
    Id: string
    balance: number
    date: string
}