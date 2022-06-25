import { request } from "../Tranport Layer";
//import {getbalances} from "./queries/gather";
import { errorHandler } from "../Tranport Layer/errorHandler";
import { defaultTransportParams, TransportParams } from "../Tranport Layer/types";
import Users from "../users";
import { usersPermissionsUser } from "../users/queries/usersPermissionsUser";
import { addPerformance,getUsers } from "../usersPerformance/queries/gather";
import { UsersPerformancePayLoad,RequestPayLoad } from "./types";
import FauxAPI from '../controller'


class UsersPerformance {
    private route='/usersPerformance'
    //private transportParams: TransportParams = defaultTransportParams
    async getUsers(): Promise<Users[]> {
        try {
            const res = await request({
                gql: getUsers,
                headers: {"Authorization": `Bearer ${process.env.API_TOKEN}`},
                method: 'QUERY',
                variables: {}
            })
           const users= res.data.usersPermissionsUsers.data.map((user: any) => {
                return {
                    id: user.id,
                    balance: user.attributes.balance
                }
            })
    
            return users
        } catch (error) {
            throw new Error(errorHandler(error).message)
        }
    }

    async addPerformance(userdata:RequestPayLoad): Promise<UsersPerformancePayLoad> {
        try {
            const {data} = await request({
                gql: addPerformance,
                headers: {"Authorization": `Bearer ${process.env.API_TOKEN}`},
                method: 'MUTATION',
                variables: {
                    ...userdata
                }
            })
            return {
                Id:data.createUserPerformance.data.Id,
                balance: userdata.balance,
                date: userdata.date
            }
        } catch (error) {
            throw new Error(errorHandler(error).message)
        }
    }

    async addPerformances() {
        try {
            var date_ob = new Date();
            var day = ("0" + date_ob.getDate()).slice(-2);
            var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            var year = date_ob.getFullYear();
            var date_ = year + "-" + month+"-"+day;
            
            const users = await this.getUsers()
            await Promise.all(users.map((user:any ) => {
                return this.addPerformance({
                    Id:user.id,
                    balance:user.balance,
                    date:date_
                })
            }
            ))
        } catch (error) {
            throw new Error(errorHandler(error).message)
        }
    }
}

export default UsersPerformance