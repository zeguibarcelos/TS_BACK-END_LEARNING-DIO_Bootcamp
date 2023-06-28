import { EntityManager, UpdateResult } from "typeorm";
import { User} from "../entities/User";



export class UserRepository{
    private manager: EntityManager

    constructor(
        manager: EntityManager
        ){
        this.manager = manager;
    }
    createUser = async (user: any): Promise<User> => {
        return this.manager.save(user)
    }

    getUser = async (userId: string): Promise<User | null> =>{
        return this.manager.findOne(User, {
            where: {
                id_user: userId
            }
        })
    }

    getUserEmail = async (email: string): Promise<User | null> =>{
        return this.manager.findOne(User, {
            where: {
                email: email
            }
        })
    }

    getUserByEmailAndPassword = async (email: string, password: string): Promise < User| null> => {
        return this.manager.findOne(User, {
            where:{
                email,
                password
            }
        })
    }

    deleteUser = async (user: any): Promise<User> => {
        return this.manager.remove(user)
    }

    updateUser = async (user) => {

        if(user.name !== "empty"){
            this.manager.update(User, user.userId, { name: user.name })
        }
        if (user.email !== "empty"){
            this.manager.update(User, user.userId, { email: user.email })
        }
        if (user.password !== "empty"){
            this.manager.update(User, user.userId, { password: user.password })
        }

        
    }

}