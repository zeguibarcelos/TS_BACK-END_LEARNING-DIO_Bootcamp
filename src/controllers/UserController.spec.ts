import { UserService } from "../services/UserServices"
import { UserController } from "./UserController"
import { Request } from "express"
import { makeMockResponse } from "../__mocks__/mockResponse.mock"

describe('UserController', () => {
    const mockUserService:Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn(),
        deleteUser: jest.fn()
    }
    
    const userController = new UserController(mockUserService as UserService)

   


    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'José',
                email: 'zezin@gmail.com'
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
                email: 'zezin@gmail.com'
            }
        } as Request;
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({message: 'Bad request! Name obrigatório!'})
    })

    it('Verificar se a função getAllUser está sendo chamada', () =>{
        const mockRequest = {
            body: {
                name: "teste",
                email: "teste@dio.com"
            }
        } as Request;
        const mockResponse = makeMockResponse()
        userController.getAllUsers(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200)  
        
    })

    it('Deve retornar erro caso o usuário não informe o email', () => {
        const mockRequest = {
            body: {
                name: 'zezin',
                email: ''
            }
        } as Request;
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({message: 'Bad request! Email obrigatório!'})
    })

    it('Verificar a função deletar usuário', () =>{
        const mockRequest = {
            body: {
                name: 'zezin',
                email: 'zezin@gmail.com'
            }
        } as Request;
        const mockResponse = makeMockResponse()
        userController.deleteUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200)        
        expect(mockResponse.state.json).toMatchObject({message: 'Usuário deletado'})
    })

})