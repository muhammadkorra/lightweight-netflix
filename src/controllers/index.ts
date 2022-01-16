import {
    registerUserInteractor,
    loginUserInteractor,
    registerMovieInteractor,
    deleteMovieInteractor,
    updateMovieInteractor
} from '../interactors'
import PostUserController from './PostUser'
import PostTokenController from './PostToken'
import PostMovieController from './PostMovie'
import DeleteMovieController from './DeleteMovie'
import PatchMovieController from './PatchMovie'

const postUserController = new PostUserController(registerUserInteractor)
const postTokenController = new PostTokenController(loginUserInteractor)
const postMovieController = new PostMovieController(registerMovieInteractor)
const deleteMovieController = new DeleteMovieController(deleteMovieInteractor)
const patchMovieController = new PatchMovieController(updateMovieInteractor)

export { postUserController, postTokenController, postMovieController, deleteMovieController, patchMovieController }
