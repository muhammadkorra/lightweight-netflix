import { registerUserInteractor, loginUserInteractor, registerMovieInteractor } from '../interactors'
import PostUserController from './PostUser'
import PostTokenController from './PostToken'
import PostMovieController from './PostMovie'

const postUserController = new PostUserController(registerUserInteractor)
const postTokenController = new PostTokenController(loginUserInteractor)
const postMovieController = new PostMovieController(registerMovieInteractor)

export { postUserController, postTokenController, postMovieController }
