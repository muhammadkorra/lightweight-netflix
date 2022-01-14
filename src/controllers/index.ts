import { registerUserInteractor } from '../interactors'
import PostUserController from './PostUser'

const postUserController = new PostUserController(registerUserInteractor)

export { postUserController }
