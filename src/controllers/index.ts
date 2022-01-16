import {
    registerUserInteractor,
    loginUserInteractor,
    registerMovieInteractor,
    deleteMovieInteractor,
    updateMovieInteractor,
    userWatchlistInteractor,
    createReviewInteractor,
    getMoviesInteractor
} from '../interactors'

import PostUserController from './PostUser'
import PostTokenController from './PostToken'
import PostMovieController from './PostMovie'
import DeleteMovieController from './DeleteMovie'
import PatchMovieController from './PatchMovie'
import PostWatchlistController from './PostWatchlist'
import PostReviewController from './PostReview'
import GetMoviesController from './GetMovies'
import GetMovieController from './GetMovie'

const postUserController = new PostUserController(registerUserInteractor)
const postTokenController = new PostTokenController(loginUserInteractor)
const postMovieController = new PostMovieController(registerMovieInteractor)
const deleteMovieController = new DeleteMovieController(deleteMovieInteractor)
const patchMovieController = new PatchMovieController(updateMovieInteractor)
const postWatchlistController = new PostWatchlistController(userWatchlistInteractor)
const postReviewController = new PostReviewController(createReviewInteractor)
const getMoviesController = new GetMoviesController(getMoviesInteractor)
const getMovieController = new GetMovieController(getMoviesInteractor)

export {
    postUserController,
    postTokenController,
    postMovieController,
    deleteMovieController,
    patchMovieController,
    postWatchlistController,
    postReviewController,
    getMoviesController,
    getMovieController
}
