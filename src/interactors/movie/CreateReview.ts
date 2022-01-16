import { movieFactory } from '../../entity'
import MovieRepository from '../../repositories/abstractions/movie.repository.abstract'
import UserRepository from '../../repositories/abstractions/user.repository.abstract'
import AuthService from '../../util/interfaces/auth.interface'

class CreateReviewInteractor {
    constructor(
        private movieRepository: MovieRepository,
        private userRepository: UserRepository,
        private authService: AuthService
    ) {}

    public async getValidUser(accessToken?: string): Promise<string> {
        if (!accessToken || accessToken.length === 0) {
            throw new Error('Please provide an access token')
        }
        if (!(await this.authService.validateToken(accessToken))) {
            throw new Error('Access token invalid or expired')
        }
        return await this.authService.parseToken(accessToken)
    }

    public async isMovieInWatchlist(email: string, movieId: string): Promise<void> {
        const user = await this.userRepository.findByEmail(email)
        if (!user) {
            throw new Error('User was not found')
        }
        const found = user.watchedList && user.watchedList.filter((movieItem) => movieItem.id === movieId)[0]

        if (!found) {
            throw new Error('You cannot rate a movie that is not in your watchlist')
        }
    }

    public async addMovieReview(
        movieId: string,
        review: { author: string; rating?: number; review?: string }
    ): Promise<boolean> {
        const found = await this.movieRepository.findById(movieId)
        if (!found) {
            throw new Error('Movie was not found')
        }

        if (!review.rating || !Number.isInteger(review.rating)) {
            throw new Error('The rating you provided is not an integer')
        }

        if (found.reviews && found.reviews.filter((reviewItem) => reviewItem.author === review.author).length !== 0) {
            throw new Error('User cannot rate movie twice')
        }

        const movie = movieFactory.makeMovie(found)
        movie.updatedRating(review.rating)

        return await this.movieRepository.updatedRating(
            movie.getId(),
            {
                rating: movie.getRating(),
                timesRated: movie.getTimesRated()
            },
            {
                author: review.author,
                rating: review.rating,
                review: review.review || 'No review was provided by the user'
            }
        )
    }
}

export default CreateReviewInteractor
