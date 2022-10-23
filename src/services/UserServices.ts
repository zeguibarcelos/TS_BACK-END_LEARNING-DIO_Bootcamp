import { request } from "express"

export interface User{
    name: string
    email: string
}

const db = [
    {
        name: "teste",
        email: "teste@dio.com"
    }
]

export class UserService {
    db: User[]

    constructor(
        dataBase = db
    ){
        this.db = dataBase
    }

    createUser = (name: string, email: string) => {
        const user = {
            name, 
            email
        }
        this.db.push(user)
        console.log('DB atualizado', this.db)
    }
    getAllUsers = () =>{
        return this.db
    }

    deleteUser = (name: string, email:string) =>{
        const user = {
            name, 
            email
        }
        
        const newArray = db.filter((valorAtual) => {
            return valorAtual.name !== user.name
        })
        this.db= newArray
    }
}