import { User, UserService } from "./UserServices"

describe('UserService', () => {
    const mockDb: User[] = []
    const userService = new UserService(mockDb);

    it('Deve adicionar um novo usuário', () => {
        
        const mockConsole = jest.spyOn(global.console, 'log')
        userService.createUser('ze', 'ze@test.com');
        expect(mockConsole).toHaveBeenCalledWith('DB atualizado', mockDb)
    })
})