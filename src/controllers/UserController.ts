import { request, Request, response, Response } from 'express'
import { UserService } from '../services/UserService'

export class UserController {
    userService: UserService 

    constructor(
        userService = new UserService()
    ){
        this.userService = userService
    }

    createUser = (request: Request, response: Response) => {

        const user = request.body

        if(!user.name || !user.email || !user.password){
            return response.status(400).json({message: 'Bad request! Name, email e password obrigatórios!'})
        } //!nulo ou !!indefinido

        this.userService.createUser(user.userId, user.name, user.email, user.password)
        return response.status(201).json({ message: 'Usuário criado' })
    }

    getUser = async (request: Request, response: Response) =>{
        const { userId} = request.params
        const user = await this.userService.getUser(userId)
        return response.status(200).json({
            userId: user?.id_user,
            name: user?.name,
            email: user?.email
        })
    }

    getUserEmail = async (request: Request, response: Response) =>{
        const { email} = request.params
        const user = await this.userService.getUserEmail(email)
        return response.status(200).json({
            email: user?.email
        })
    }

    deleteUser = async (request: Request, response: Response) => {
        const { userId} = request.body
        await this.userService.deleteUser(userId)
        return response.status(201).json({ message: 'Usuário deletado' })
    }

    updateUser = (request: Request, response: Response) => {
        const user = request.body
        
        this.userService.updateUser(user)
        return response.status(201).json({ message: 'Dados alterados com sucesso!' })
    }
    
}
