import RegisterUserInteractor from './user/RegisterUser'
import LoginUserInteractor from './user/LoginUser'
import RegisterMovieInteractor from './movie/RegisterMovie'
import DeleteMovieInteractor from './movie/DeleteMovie'
import UpdateMovieInteractor from './movie/UpdateMovie'
import UserWatchlistInteractor from './user/UserWatchlist'
import CreateReviewInteractor from './movie/CreateReview'
import GetMoviesInteractor from './movie/GetMovies'
import { userDbRepository, movieDbRepository } from '../repositories'
import JwtService from '../util/JwtService'

const jwtService = new JwtService()
const registerUserInteractor = new RegisterUserInteractor(userDbRepository)
const loginUserInteractor = new LoginUserInteractor(userDbRepository, jwtService)
const registerMovieInteractor = new RegisterMovieInteractor(movieDbRepository, jwtService)
const deleteMovieInteractor = new DeleteMovieInteractor(movieDbRepository, jwtService)
const updateMovieInteractor = new UpdateMovieInteractor(movieDbRepository, jwtService)
const userWatchlistInteractor = new UserWatchlistInteractor(userDbRepository, movieDbRepository, jwtService)
const createReviewInteractor = new CreateReviewInteractor(movieDbRepository, userDbRepository, jwtService)
const getMoviesInteractor = new GetMoviesInteractor(movieDbRepository)

export {
    registerUserInteractor,
    loginUserInteractor,
    registerMovieInteractor,
    deleteMovieInteractor,
    updateMovieInteractor,
    userWatchlistInteractor,
    createReviewInteractor,
    getMoviesInteractor
}
