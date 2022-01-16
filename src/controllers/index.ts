import {
    registerUserInteractor,
    loginUserInteractor,
    registerMovieInteractor,
    deleteMovieInteractor,
    updateMovieInteractor,
    userWatchlistInteractor,
    createReviewInteractor
} from '../interactors'

import PostUserController from './PostUser'
import PostTokenController from './PostToken'
import PostMovieController from './PostMovie'
import DeleteMovieController from './DeleteMovie'
import PatchMovieController from './PatchMovie'
import PostWatchlistController from './PostWatchlist'
import PostReviewController from './PostReview'

const postUserController = new PostUserController(registerUserInteractor)
const postTokenController = new PostTokenController(loginUserInteractor)
const postMovieController = new PostMovieController(registerMovieInteractor)
const deleteMovieController = new DeleteMovieController(deleteMovieInteractor)
const patchMovieController = new PatchMovieController(updateMovieInteractor)
const postWatchlistController = new PostWatchlistController(userWatchlistInteractor)
const postReviewController = new PostReviewController(createReviewInteractor)

export {
    postUserController,
    postTokenController,
    postMovieController,
    deleteMovieController,
    patchMovieController,
    postWatchlistController,
    postReviewController
}
