import {
    registerUserInteractor,
    loginUserInteractor,
    registerMovieInteractor,
    deleteMovieInteractor
} from '../interactors'
import PostUserController from './PostUser'
import PostTokenController from './PostToken'
import PostMovieController from './PostMovie'
import DeleteMovieController from './DeleteMovie'

const postUserController = new PostUserController(registerUserInteractor)
const postTokenController = new PostTokenController(loginUserInteractor)
const postMovieController = new PostMovieController(registerMovieInteractor)
const deleteMovieController = new DeleteMovieController(deleteMovieInteractor)

export { postUserController, postTokenController, postMovieController, deleteMovieController }
