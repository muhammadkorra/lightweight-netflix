import RegisterUserInteractor from './RegisterUser'
import { userDbRepository } from '../repositories'

const registerUserInteractor = new RegisterUserInteractor(userDbRepository)

export { registerUserInteractor }
