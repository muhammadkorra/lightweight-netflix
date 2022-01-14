import RegisterUserInteractor from './RegisterUser'
import LoginUserInteractor from './LoginUser'
import { userDbRepository } from '../repositories'
import JwtService from '../util/JwtService'

const jwtService = new JwtService()
const registerUserInteractor = new RegisterUserInteractor(userDbRepository)
const loginUserInteractor = new LoginUserInteractor(userDbRepository, jwtService)

export { registerUserInteractor, loginUserInteractor }
