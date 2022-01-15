import RegisterUserInteractor from './RegisterUser'
import LoginUserInteractor from './LoginUser'
import RegisterMovieInteractor from './RegisterMovie'
import { userDbRepository, movieDbRepository } from '../repositories'
import JwtService from '../util/JwtService'

const jwtService = new JwtService()
const registerUserInteractor = new RegisterUserInteractor(userDbRepository)
const loginUserInteractor = new LoginUserInteractor(userDbRepository, jwtService)
const registerMovieInteractor = new RegisterMovieInteractor(movieDbRepository, jwtService)

export { registerUserInteractor, loginUserInteractor, registerMovieInteractor }
