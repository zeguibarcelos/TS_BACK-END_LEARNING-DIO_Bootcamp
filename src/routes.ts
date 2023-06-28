import { Router, Request, Response } from 'express'
import { LoginController } from './controllers/LoginController'
import { UserController } from './controllers/UserController'
import { verifyAuth } from './middleware/verifyAuth'

export const router = Router()

const userController = new UserController()
const loginController = new LoginController()


router.post('/user', userController.createUser)

router.get('/user/:userId',verifyAuth, userController.getUser)

router.get('/:email',userController.getUserEmail)

router.delete('/user',verifyAuth, userController.deleteUser)

router.post('/login', loginController.login)

router.put('/user/:userId', userController.updateUser)