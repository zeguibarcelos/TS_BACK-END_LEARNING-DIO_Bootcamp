import { sign } from "jsonwebtoken";
import { Column } from "typeorm";
import { AppDataSource } from "../database";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository"


export class UserService {
    private userRepository: UserRepository;

    constructor(
        userRepository = new UserRepository(AppDataSource.manager)
    ){
        this.userRepository = userRepository;
    }

    createUser = async (userId:string, name: string, email: string, password: string): Promise<User> => {
        const user = new User(userId, name, email, password)
        return this.userRepository.createUser(user)
    }

    getUser = async (userId: string): Promise<User | null> =>{
        return this.userRepository.getUser(userId)
    }

    getUserEmail = async (email: string): Promise<User | null> =>{
        return this.userRepository.getUserEmail(email)
    }

    getAuthenticatedUser = (email: string, password: string): Promise < User | null> => {
        return this.userRepository.getUserByEmailAndPassword(email, password)
    }

    getToken = async (email: string, password: string): Promise<string[]> => {
        const user = await  this.getAuthenticatedUser(email, password)

        if(!user){
            throw new Error('Email/password invalid')
        }

        const tokenData = {
            name: user?.name,
            email: user?.email
        }

        const tokenKey = '123456789'

        const tokenOptions = {
            subject: user?.id_user
        }

        const token = sign(tokenData, tokenKey, tokenOptions)

        var data = new Array(token,)
        data.push(user.id_user)
        return data

    }


        deleteUser = async (userId: string): Promise<User> => {
            const user = new User(userId, '', '', '')
            return this.userRepository.deleteUser(user)
        }
 
 
        updateUser = async (user: User) => {
            
            return this.userRepository.updateUser(user)
        }

}