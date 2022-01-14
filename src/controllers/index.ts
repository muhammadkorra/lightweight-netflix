import { registerUserInteractor, loginUserInteractor } from '../interactors'
import PostUserController from './PostUser'
import PostTokenController from './PostToken'

const postUserController = new PostUserController(registerUserInteractor)
const postTokenController = new PostTokenController(loginUserInteractor)

export { postUserController, postTokenController }
