import { UserService } from "../src/services/UserService"
import { UserController } from "../src/controllers/UserController"
import { Request } from "express"
import { makeMockResponse } from "./__mocks__/mockResponse.mock"
import { makeMockRequest } from "./__mocks__/mockrequest.mock"

const mockUserService = {
    createUser: jest.fn(),
    getUser: jest.fn()
}

jest.mock('../services/UserService', () => {
    return {
        UserService: jest.fn().mockImplementation(() => {
            return mockUserService
        })
    }
})
describe('UserController', () => {

    
    const userController = new UserController()

   


    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'José',
                email: 'zezin@gmail.com',
                password: 'password'
            }
        } as Request;
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({message: 'Usuário criado'})
    })

    it('Deve retornar erro caso o usuário não informe o name', () => {
        const mockRequest = {
            body: {
                name: '',
                email: 'zezin@gmail.com',
                password: 'password'
            }
        } as Request;
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({message: 'Bad request! Name, email e password obrigatórios!'})
    })

    it('Deve retornar erro caso o usuário não informe o email', () => {
        const mockRequest = {
            body: {
                name: 'zezin',
                email: '',
                password: 'password'
            }
        } as Request;
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({message: 'Bad request! Name, email e password obrigatórios!'})
    })

    it('Deve retornar erro caso o usuário não informe o password', () => {
        const mockRequest = {
            body: {
                name: 'zezin',
                email: 'zezin@gmail.com',
                password: ''
            }
        } as Request;
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({message: 'Bad request! Name, email e password obrigatórios!'})
    })

    it('Verificar a função deletar usuário', () =>{
        const mockRequest = {
            body: {
                name: 'zezin',
                email: 'zezin@gmail.com',
                password: 'password'
            }
        } as Request;
        const mockResponse = makeMockResponse()
        userController.deleteUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200)        
        expect(mockResponse.state.json).toMatchObject({message: 'Usuário deletado'})
    })

    it('Deve retornar o usuário com o userId informado', () => {
        const mockRequest = makeMockRequest({
            params: {
                userId: '123456'
            }}
        )
        const mockResponse = makeMockResponse()
        userController.getUser(mockRequest, mockResponse)
        expect(mockUserService.getUser).toHaveBeenCalledWith('123456')
        expect(mockResponse.state.status).toBe(200)
    })

})