import { UserService } from "../src/services/UserService"
import * as jwt from 'jsonwebtoken' // * importa tudo

jest.mock('../repositories/UserRepository')
jest.mock('../database', () => {
    initialize: jest.fn()
})
jest.mock('jsonwebtoken')

const mockUserRepository = require('../repositories/UserRepository')

describe('UserService', () => {

    const userService = new UserService(mockUserRepository)
    const mockUser = {
        id_user: '123456',
        name: 'josegui',
        email: 'zegui@gmail.com',
        password: '123456'
    }

    it('Deve adicionar um novo usuário', async () => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve({
            id_user: '123456',
            name: 'ze',
            password: '123456'
        }))
        const response = await userService.createUser('ze', 'ze@test.com', '123456');
        expect(mockUserRepository.createUser).toHaveBeenCalled()
        expect(response).toMatchObject({
            id_user: '123456',
            name: 'ze',
            password: '123456'
        })
    })

    it('Devo retornar um token de usuário', async () => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(mockUser))
        jest.spyOn(jwt, 'sign').mockImplementation(() => 'token')
        const token = await userService.getToken('zegui@gmail.com', '123456')
        expect(token).toBe('token')
    })

    it('Deve retornar um erro caso não encontre o usuário', async () => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(null))
        await expect(userService.getToken('dasdasd', 'asdasd')).rejects.toThrowError(new Error ('Email/password invalid'))
    })

})